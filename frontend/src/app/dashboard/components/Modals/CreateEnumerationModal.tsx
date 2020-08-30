// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton, Tags } from 'fogg-ui'
import { redirectTo, getParamsFromUrl, camelCase, getEmptyValues, waitFor } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import CREATE_ENUMERATION_MUTATION from '@graphql/enumerations/createEnumeration.mutation'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateEnumerationModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Getting appId
  const { appId } = getParamsFromUrl(['page', 'appId', 'stage'])

  // States
  const [values, setValues] = useState<any>({
    enumerationName: '',
    identifier: '',
    description: '',
    appId
  })
  const [enumValues, setEnumValues] = useState<any>([])
  const [required, setRequired] = useState<any>({
    enumerationName: false,
    identifier: false,
    enumerationValues: false
  })
  const [loading, setLoading] = useState(false)

  // Mutations
  const [createEnumerationMutation] = useMutation(CREATE_ENUMERATION_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    let emptyValues: any = getEmptyValues(values, ['enumerationName', 'identifier'])

    if (enumValues.length === 0) {
      if (!emptyValues) {
        emptyValues = {
          enumerationValues: true
        }
      } else {
        emptyValues.enumerationValues = true
      }
    }

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(2).then(async () => {
        setLoading(false)

        values.values = JSON.stringify(enumValues)

        const { data: dataCreateEnumeration } = await createEnumerationMutation({
          variables: values
        })

        if (dataCreateEnumeration.createEnumeration) {
          redirectTo(`/dashboard/${appId}/master/schema/enumeration/${values.identifier}`)
        }
      })
    }
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'enumerationName') {
      setValue('identifier', camelCase(e.target.value), setValues)
    }

    onChange(e, setValues)
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div className={styles.modal}>
        <div>
          <label htmlFor="modelName">
            Enumeration Name {required.enumerationName && <Badge danger>Required</Badge>}
          </label>
          <Input
            name="enumerationName"
            placeholder="Enumeration Name"
            hasError={required.enumerationName}
            onChange={_onChange}
            value={values.enumerationName}
          />
        </div>

        <div>
          <label htmlFor="identifier">
            Identifier {required.identifier && <Badge danger>Required</Badge>}
          </label>
          <Input
            name="identifier"
            value={values.identifier}
            hasError={required.identifier}
            onChange={_onChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Input
            name="description"
            placeholder="Small description about your new app"
            onChange={_onChange}
            value={values.description}
          />
        </div>

        <div className={styles.values}>
          <label htmlFor="values">
            Values {required.enumerationValues && <Badge danger>Required</Badge>}
          </label>
          <Tags
            label="Add new value"
            tags={[]}
            getTags={(eValues): void => {
              if (eValues.length > 0) {
                setEnumValues(eValues)
              }
            }}
          />
        </div>

        <div className={styles.buttons}>
          <LinkButton onClick={onClose}>Cancel</LinkButton>
          <PrimaryButton
            onClick={handleSubmit}
            isLoading={loading}
            loadingText="Creating Enumeration..."
          >
            Create Enumeration
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(CreateEnumerationModal)
