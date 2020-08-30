// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Badge, Icon, Input, TextArea, Select, File } from 'fogg-ui'
import { cx, slugFn, bytesToSize, getFileInfo, getImageData, getRandomCode } from 'fogg-utils'

// Configuration
import config from '@config'

// Constants
import { CONTENT_LINK } from '@constants/links'

// Shared components
import Link from '@ui/Link'

// Styles
import styles from './CustomFields.scss'

interface iProps {
  action: string
  active: string
  customFields: any
  getModel: any
  handleActive: any
  onChange: any
  required: any
  router: any
  values: any
  setValues: any
  enumerations: any[]
}

const CustomFields: FC<iProps> = ({
  active,
  action,
  customFields,
  getModel,
  handleActive,
  onChange,
  required,
  router,
  values,
  setValues,
  enumerations
}): ReactElement => {
  const [selectedFile, setSelectedFile] = useState({})

  const handleSelectedFile = async (e: any) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      const fileSize = bytesToSize(file.size, config.files.maxFileSize)
      const { fileName, extension } = getFileInfo(file.name)
      const identifier = slugFn(fileName)
      const code = getRandomCode(4)
      const isDocument = config.files.types.documents.includes(extension)
      const isImage = config.files.types.images.includes(extension)
      const isVideo = config.files.types.videos.includes(extension)
      let information = ''
      let url = config.files.path

      if (isDocument) {
        url += '/documents'
      }

      if (isImage) {
        const img: any = await getImageData(file)
        information = `${img.width}x${img.height}px`
        url += '/images'
      }

      if (isVideo) {
        url += '/videos'
      }

      setValues((preValues: any) => ({
        ...preValues,
        file,
        fileName: `${fileName}.${extension}`,
        fileUrl: `${url}/${identifier}_${code}.${extension}`,
        size: fileSize.size,
        information
      }))

      setSelectedFile(file)
    }
  }

  const renderFileInput = (field: any) => {
    return (
      <File
        name={field.identifier}
        selectedFile={selectedFile}
        label="Choose a file"
        onChange={handleSelectedFile}
        maxFileSize={config.files.maxFileSize}
        theme="success"
        allowedExtensions={config.files.allowedExtensions}
      />
    )
  }

  const renderDropdown = (field: any) => {
    const enumId = field.defaultValue
    const enumeration = enumerations.find((enu: any) => enu.id === enumId)
    const options: any = JSON.parse(enumeration.values)

    if (action === 'edit') {
      const currentValue = values[field.identifier].split(':')[1]
      const optionIndex = options.findIndex((option: any) => option.value === currentValue)

      if (optionIndex > -1) {
        options[optionIndex].selected = true
      }
    }

    return (
      <div className={styles[field.type.toLowerCase()]}>
        <Select
          name={enumeration.identifier}
          label={enumeration.enumerationName}
          onClick={({ option, value }: { option: string; value: string }): void => {
            if (option && value) {
              setValues((preValues: any) => ({
                ...preValues,
                [field.identifier]: `${option}:${value}`
              }))
            }
          }}
          options={options}
        />
      </div>
    )
  }

  return (
    <div className={styles.customFields}>
      <div className={styles.fields}>
        <div className={styles.goBack}>
          <Link href={CONTENT_LINK(router).as} title={`Go back to ${getModel.modelName}`}>
            <Icon type="fas fa-chevron-left" />
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Badge className={styles.badge}>{getModel.modelName}</Badge>
          <div className={styles.entryTitle}>{values.title || <>New {getModel.modelName}</>}</div>
        </div>

        {customFields.map((field: any) => (
          <div
            key={field.id}
            className={cx(
              styles.field,
              active === field.identifier ? styles.active : '',
              required[field.identifier] ? styles.red : ''
            )}
            onClick={(): void => handleActive(field.identifier)}
          >
            <div>
              <label>
                {field.fieldName}{' '}
                {field.isRequired && (
                  <span className={cx(styles.tag, required[field.identifier] ? styles.red : '')}>
                    Required
                  </span>
                )}
              </label>
            </div>

            {field.type === 'String' && (
              <div className={styles[field.type.toLowerCase()]}>
                <Input
                  type="text"
                  hasError={required[field.identifier]}
                  name={field.identifier}
                  onChange={onChange}
                  disabled={field.identifier === 'fileUrl'}
                  placeholder={field.fieldName}
                  value={values[field.identifier]}
                />
              </div>
            )}

            {field.type === 'Text' && (
              <div className={styles[field.type.toLowerCase()]}>
                <TextArea
                  name={field.identifier}
                  hasError={required[field.identifier]}
                  placeholder={field.fieldName}
                  onChange={onChange}
                  value={values[field.identifier]}
                />
              </div>
            )}

            {field.type === 'Dropdown' && renderDropdown(field)}

            {field.type === 'File' && renderFileInput(field)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(CustomFields)
