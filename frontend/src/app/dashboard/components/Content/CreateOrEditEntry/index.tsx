// Dependencies
import React, { FC, ReactElement, useState, useContext, useEffect, memo } from 'react'
import { slugFn, getEmptyValues, waitFor, uploadFile, keys, hasOwnProperty } from 'fogg-utils'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { useMutation } from '@apollo/client'

// Configuration
import config from '@config'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Contexts
import { FormContext } from '@contexts/form'
import { I18nContext } from '@contexts/i18n'

// Mutation
import CREATE_VALUES_MUTATION from '@graphql/values/createValues.mutation'
import FIND_UNIQUE_VALUES_MUTATION from '@graphql/values/findUniqueValues.mutation'
import UPDATE_VALUES_MUTATION from '@graphql/values/updateValues.mutation'

// Components
import CustomFields from '../CustomFields'
import SystemFields from '../SystemFields'

interface iProps {
  router: any
  data: any
}

const CreateOrEditEntry: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const {
    getModel,
    entryId = null,
    getValuesByEntry = null,
    getEnumerationsByAppId,
    entries
  } = data
  const isEditing = entryId && getValuesByEntry

  // Setting a unique ID
  const newId = uuidv4()

  // Fields
  const initialValues: any = {}
  const systemInitialValues: any = {}
  const requiredValues: any = {}
  const systemFields = getModel.fields.filter((field: any) => field.isSystem)
  const customFields = getModel.fields.filter((field: any) => !field.isSystem)
  const uniqueFields = getModel.fields.filter((field: any) => field.isUnique && !field.isSystem)
  const enumerations: any = []
  const initialSelectedEntries: any = {}

  const getValue = (fieldId: string) => {
    if (isEditing && getValuesByEntry) {
      const value = getValuesByEntry.find((valueEntry: any) => valueEntry.fieldId === fieldId)
      return value || { value: '' }
    }

    return { value: '' }
  }

  // Custom fields
  customFields.forEach((field: any) => {
    const val = getValue(field.id)

    initialValues[field.identifier] = val.value

    if (field.type === 'Dropdown') {
      const enumerationId = field.defaultValue
      const enumeration = getEnumerationsByAppId.find((e: any) => e.id === enumerationId)
      enumerations.push(enumeration)
    }

    if (field.type === 'Reference' && isEditing) {
      const initialEntries = entries.filter((entry: any) => entry.modelName === field.fieldName)
      const entryValueId = field.values[0].value

      if (initialEntries.length > 0) {
        const selectedEntry = initialEntries[0].entries
          .filter((entry: any) => entry.id === entryValueId)
          .map((entry: any) => ({ ...entry, modelName: field.fieldName }))

        initialSelectedEntries[field.fieldName] = [...selectedEntry]
      }
    }

    if (field.isRequired) {
      requiredValues[field.identifier] = false
    }
  })

  // System fields
  systemFields.forEach((field: any) => {
    let value = field.defaultValue
    const val = getValue(field.id)

    if (field.identifier === 'createdAt') {
      value = moment().format('MM/DD/YYYY hh:mm a')
    }

    if (field.identifier === 'updatedAt') {
      value = ''
    }

    systemInitialValues[field.identifier] = val.value || value
  })

  // States
  const [active, setActive] = useState('')
  const [alert, setAlert] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [showAlert, setShowAlert] = useState(false)
  const [values, setValues] = useState(initialValues)
  const [systemValues, setSystemValues] = useState(systemInitialValues)
  const [required, setRequired] = useState(requiredValues)
  const [saveLoading, setSaveLoading] = useState(false)
  const [publishLoading, setPublishLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState(false)
  const [referenceEntries, setReferenceEntries] = useState(null)
  const [selectedEntries, setSelectedEntries] = useState<any>({})

  // Mutations
  const [createValuesMutation] = useMutation(CREATE_VALUES_MUTATION)
  const [findUniqueValuesMutation] = useMutation(FIND_UNIQUE_VALUES_MUTATION)
  const [updateValuesMutation] = useMutation(UPDATE_VALUES_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)
  const { t } = useContext(I18nContext)

  // Methods
  const setCurrentEntry = (entry: any) => {
    const newSelectedEntries = { ...selectedEntries }
    newSelectedEntries[entry.modelName] = [entry]

    setSelectedEntries(newSelectedEntries)
    setIsReferenceModalOpen(!isReferenceModalOpen)
  }

  const handleReferenceModal = (modelEntries: any): void => {
    setReferenceEntries(modelEntries)
    setIsReferenceModalOpen(!isReferenceModalOpen)
  }

  const handleAfterCreateOrEditEntryModal = (): void => setIsModalOpen(!isModalOpen)

  const handleActive = (field: string) => {
    setActive(field)
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'title') {
      if (hasOwnProperty(initialValues, 'slug')) {
        setValue('slug', slugFn(e.target.value), setValues)
      }

      if (hasOwnProperty(initialValues, 'identifier')) {
        setValue('identifier', slugFn(e.target.value), setValues)
      }
    }

    onChange(e, setValues)
  }

  const handleSubmit = async (action: string, isFile: boolean): Promise<void> => {
    const emptyValues = getEmptyValues(values, keys(requiredValues))
    const entryValues: any[] = []
    let isUploaded = false
    const entriesKeys = keys(selectedEntries)

    // Looking for entries values
    if (entriesKeys.length > 0) {
      entriesKeys.forEach((key: string) => {
        if (selectedEntries[key] && emptyValues[key.toLowerCase()]) {
          delete emptyValues[key.toLowerCase()]
        }
      })
    }

    if (emptyValues && keys(emptyValues).length > 0) {
      setRequired(emptyValues)
    } else {
      if (action === 'save') {
        setSaveLoading(true)
      } else {
        setPublishLoading(true)
      }

      const uniqueValues = uniqueFields.map((field: any) => ({ value: values[field.identifier] }))

      const { data: dataFindUniqueValues } = await findUniqueValuesMutation({
        variables: {
          input: uniqueValues
        }
      })

      waitFor(2).then(async () => {
        if (action === 'save') {
          setSaveLoading(false)
        } else {
          setPublishLoading(false)
        }

        if (!isEditing && dataFindUniqueValues.findUniqueValues.length > 0) {
          setAlert(t('This entry already exists'))
          setAlertType('danger')
          setShowAlert(true)

          waitFor(2).then(() => {
            setShowAlert(false)
          })
        } else {
          // Setting up System Field values
          values.id = systemValues.id || newId
          values.status = action === 'save' ? 'Draft' : 'Published'
          values.createdAt = isEditing ? systemValues.createdAt : moment().format()
          values.updatedAt = moment().format()

          // Set entries id to values
          if (entriesKeys.length > 0) {
            entriesKeys.forEach((key: string) => {
              if (selectedEntries[key]) {
                values[key.toLowerCase()] = selectedEntries[key][0].id
              }
            })
          }

          if (isFile) {
            const [, , , fileUrl] = values.fileUrl.split('/')
            isUploaded = await uploadFile(values.file, `${config.baseUrl}/upload/${fileUrl}`)
            values.file = values.fileName
          }

          keys(values).forEach((fieldIdentifier: string) => {
            const valueField = getModel.fields.find(
              (field: any) => field.identifier === fieldIdentifier
            )

            entryValues.push({
              entry: values.id,
              fieldId: valueField.id,
              value: values[fieldIdentifier],
              fieldIdentifier
            })
          })

          let dataUpdateValues: any = null
          let dataCreateValues: any = null

          if (isEditing) {
            const response = await updateValuesMutation({
              variables: {
                entry: entryId,
                values: entryValues
              }
            })

            dataUpdateValues = response.data
          } else {
            const response = await createValuesMutation({
              variables: {
                values: entryValues
              }
            })

            dataCreateValues = response.data
          }

          if (dataCreateValues || dataUpdateValues) {
            const message = action === 'save' ? 'Saved' : 'Published'

            setAlert(isFile && isUploaded ? t('Uploaded') : t(message))
            setShowAlert(true)
            setAlertType('success')
            setSystemValues({
              id: values.id,
              createdAt: values.createdAt,
              updatedAt: values.updatedAt,
              status: values.status
            })

            waitFor(5).then(() => {
              setShowAlert(false)
            })

            waitFor(1).then(() => {
              handleAfterCreateOrEditEntryModal()
            })
          }
        }
      })
    }
  }

  useEffect(() => {
    if (keys(initialSelectedEntries).length > 0 && keys(selectedEntries).length === 0) {
      setSelectedEntries(initialSelectedEntries)
    }
  }, [initialSelectedEntries])

  let title = t('Create new Entry')

  if (isEditing) {
    title = `${t('Edit')} ${values.title || t('Entry')}`
  }

  return (
    <MainLayout title={title} header content footer sidebar noWrapper router={router}>
      <>
        <CustomFields
          action={isEditing ? 'edit' : 'create'}
          active={active}
          customFields={customFields}
          getModel={getModel}
          handleActive={handleActive}
          onChange={_onChange}
          required={required}
          router={router}
          values={values}
          setValues={setValues}
          enumerations={enumerations}
          entries={entries}
          referenceEntries={referenceEntries}
          selectedEntries={selectedEntries}
          setCurrentEntry={setCurrentEntry}
          handleReferenceModal={handleReferenceModal}
          isReferenceModalOpen={isReferenceModalOpen}
        />

        <SystemFields
          alert={alert}
          alertType={alertType}
          handleSubmit={handleSubmit}
          publishLoading={publishLoading}
          router={router}
          saveLoading={saveLoading}
          showAlert={showAlert}
          systemFields={systemFields}
          systemValues={systemValues}
          values={values}
          isModalOpen={isModalOpen}
        />
      </>
    </MainLayout>
  )
}

export default memo(CreateOrEditEntry)
