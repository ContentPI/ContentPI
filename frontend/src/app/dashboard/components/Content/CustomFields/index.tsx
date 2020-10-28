// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Badge, Icon, Input, TextArea, Select, File, EntryBlock } from 'fogg-ui'
import {
  cx,
  slugFn,
  bytesToSize,
  getFileInfo,
  getImageData,
  getRandomCode,
  getReferenceTitle
} from 'fogg-utils'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Configuration
import config from '@config'

// Constants
import { CONTENT_LINK } from '@constants/links'

// Shared components
import Link from '@ui/Link'
import ReferenceModal from '@modals/ReferenceModal'

// Styles
import { StyledCustomFields } from './CustomFields.styled'

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
  entries: any[]
  referenceEntries: any
  selectedEntries: any
  setCurrentEntry: any
  handleReferenceModal: any
  isReferenceModalOpen: any
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
  enumerations,
  entries,
  referenceEntries,
  selectedEntries,
  setCurrentEntry,
  handleReferenceModal,
  isReferenceModalOpen
}): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  const [selectedFile, setSelectedFile] = useState({})

  // Methods
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

  const renderReference = (field: any) => {
    const modelId = field.defaultValue
    const modelEntries = entries.find((entry: any) => entry.modelId === modelId)

    if (modelEntries && modelEntries.entries) {
      const { modelName } = modelEntries
      const currentEntries = selectedEntries[modelName]

      return (
        <div className="entries">
          {currentEntries &&
            currentEntries.map((entry: any) => (
              <EntryBlock
                key={entry.id}
                modelName={entry.modelName}
                title={getReferenceTitle(entry)}
                status={entry.status}
              />
            ))}

          <a className="reference" onClick={() => handleReferenceModal(modelEntries)}>
            <Icon type="fas fa-link" /> {t('Link existing')} {modelName}
          </a>
        </div>
      )
    }
  }

  const renderFileInput = (field: any) => {
    return (
      <File
        name={field.identifier}
        selectedFile={selectedFile}
        label={t('Choose a file')}
        onChange={handleSelectedFile}
        maxFileSize={config.files.maxFileSize}
        design="success"
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
      <div className={field.type.toLowerCase()}>
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
    <>
      <ReferenceModal
        label={t('Inserting existing entry')}
        isOpen={isReferenceModalOpen}
        onClose={() => handleReferenceModal(null)}
        options={{
          position: 'top',
          width: '650px',
          data: {
            referenceEntries,
            setCurrentEntry
          }
        }}
      />

      <StyledCustomFields>
        <div className="fields">
          <div className="goBack">
            <Link href={CONTENT_LINK(router).as} title={`${t('Go back to')} ${getModel.modelName}`}>
              <Icon type="fas fa-chevron-left" />
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Badge className="badge">{getModel.modelName}</Badge>
            <div className="entryTitle">
              {values.title || (
                <>
                  {t('New')} {getModel.modelName}
                </>
              )}
            </div>
          </div>

          {customFields.map((field: any) => (
            <div
              key={field.id}
              className={cx(
                'field',
                active === field.identifier ? 'active' : '',
                required[field.identifier] ? 'red' : ''
              )}
              onClick={(): void => handleActive(field.identifier)}
            >
              <div>
                <label>
                  {field.fieldName}{' '}
                  {field.isRequired && (
                    <span className={cx('tag', required[field.identifier] ? 'red' : '')}>
                      {t('Required')}
                    </span>
                  )}
                </label>
              </div>

              {field.type === 'String' && (
                <div className={field.type.toLowerCase()}>
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
                <div className={field.type.toLowerCase()}>
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
              {field.type === 'Reference' && renderReference(field)}
            </div>
          ))}
        </div>
      </StyledCustomFields>
    </>
  )
}

export default memo(CustomFields)
