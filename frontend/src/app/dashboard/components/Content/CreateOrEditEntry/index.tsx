// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { slugFn, getEmptyValues, waitFor } from 'fogg-utils'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import { useMutation } from '@apollo/client'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Contexts
import { FormContext } from '@contexts/form'

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
  const { getModel, entryId = null, getValuesByEntry = null } = data
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

  const getValue = (fieldId: string) => {
    return isEditing && getValuesByEntry
      ? getValuesByEntry.find((valueEntry: any) => valueEntry.fieldId === fieldId)
      : { value: '' }
  }

  // Custom fields
  customFields.forEach((field: any) => {
    const val = getValue(field.id)

    initialValues[field.identifier] = val.value

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

  // Mutations
  const [createValuesMutation] = useMutation(CREATE_VALUES_MUTATION)
  const [findUniqueValuesMutation] = useMutation(FIND_UNIQUE_VALUES_MUTATION)
  const [updateValuesMutation] = useMutation(UPDATE_VALUES_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Methods
  const handleAfterCreateOrEditEntryModal = (): void => setIsModalOpen(!isModalOpen)

  // Methods
  const handleActive = (field: string) => {
    setActive(field)
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'title') {
      if (Object.prototype.hasOwnProperty.call(initialValues, 'slug')) {
        setValue('slug', slugFn(e.target.value), setValues)
      }

      if (Object.prototype.hasOwnProperty.call(initialValues, 'identifier')) {
        setValue('identifier', slugFn(e.target.value), setValues)
      }
    }

    onChange(e, setValues)
  }

  const handleSubmit = async (action: string): Promise<void> => {
    const emptyValues = getEmptyValues(values, Object.keys(requiredValues))
    const entryValues: any[] = []

    if (emptyValues) {
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
          setAlert('This entry already exists')
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

          Object.keys(values).forEach((fieldIdentifier: string) => {
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

            setAlert(message)
            setShowAlert(true)
            setAlertType('success')
            setSystemValues({
              id: values.id,
              createdAt: values.createdAt,
              updatedAt: values.updatedAt,
              status: values.status
            })

            waitFor(2).then(() => {
              setShowAlert(false)
              handleAfterCreateOrEditEntryModal()
            })
          }
        }
      })
    }
  }

  let title = 'Create new Entry'

  if (isEditing) {
    title = `Edit ${values.title || 'Entry'}`
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
