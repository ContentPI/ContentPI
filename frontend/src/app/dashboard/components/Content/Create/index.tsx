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

// Components
import CustomFields from '../CustomFields'
import SystemFields from '../SystemFields'

interface iProps {
  router: any
  data: any
}

const Create: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const { getModel } = data

  // Setting a unique ID
  const newId = uuidv4()

  // Fields
  const initialValues: any = {}
  const systemInitialValues: any = {}
  const requiredValues: any = {}
  const systemFields = getModel.fields.filter((field: any) => field.isSystem)
  const customFields = getModel.fields.filter((field: any) => !field.isSystem)
  const uniqueFields = getModel.fields.filter((field: any) => field.isUnique && !field.isSystem)

  // Custom fields
  customFields.forEach((field: any) => {
    initialValues[field.identifier] = ''

    if (field.isRequired) {
      requiredValues[field.identifier] = false
    }
  })

  // System fields
  systemFields.forEach((field: any) => {
    let value = field.defaultValue

    if (field.identifier === 'createdAt') {
      value = moment().format('MM/DD/YYYY hh:mm a')
    }

    if (field.identifier === 'updatedAt') {
      value = ''
    }

    if (field.identifier !== 'id') {
      systemInitialValues[field.identifier] = value
    }
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

  // Mutations
  const [createValuesMutation] = useMutation(CREATE_VALUES_MUTATION)
  const [findUniqueValuesMutation] = useMutation(FIND_UNIQUE_VALUES_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

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

        if (dataFindUniqueValues.findUniqueValues.length > 0) {
          setAlert('This entry already exists')
          setAlertType('danger')
          setShowAlert(true)

          waitFor(2).then(() => {
            setShowAlert(false)
          })
        } else {
          // Setting up System Field values
          values.id = newId
          values.status = action === 'save' ? 'Draft' : 'Published'
          values.createdAt = moment().format()
          values.updatedAt = moment().format()

          Object.keys(values).forEach((fieldIdentifier: string) => {
            const valueField = getModel.fields.find(
              (field: any) => field.identifier === fieldIdentifier
            )

            entryValues.push({
              entry: newId,
              fieldId: valueField.id,
              value: values[fieldIdentifier]
            })
          })

          const { data: dataCreateValues } = await createValuesMutation({
            variables: {
              values: entryValues
            }
          })

          if (dataCreateValues) {
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
            })
          }
        }
      })
    }
  }

  return (
    <MainLayout title="Create new Entry" header content footer sidebar noWrapper router={router}>
      <>
        <CustomFields
          action="create"
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
        />
      </>
    </MainLayout>
  )
}

export default memo(Create)
