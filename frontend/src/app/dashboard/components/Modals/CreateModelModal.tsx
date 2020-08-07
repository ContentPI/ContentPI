// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton } from 'fogg-ui'
import { redirectTo, getParamsFromUrl, camelCase, getEmptyValues, waitFor } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import CREATE_MODEL_MUTATION from '@graphql/models/createModel.mutation'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateModelModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Getting appId
  const { appId } = getParamsFromUrl(['page', 'appId', 'stage'])

  // States
  const [values, setValues] = useState({
    modelName: '',
    identifier: '',
    description: '',
    appId
  })
  const [required, setRequired] = useState<any>({
    modelName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Mutations
  const [createModelMutation] = useMutation(CREATE_MODEL_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['modelName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(2).then(async () => {
        setLoading(false)

        const { data: dataCreateModel } = await createModelMutation({
          variables: values
        })

        if (dataCreateModel.createModel) {
          redirectTo(`/dashboard/${appId}/master/schema/model/${values.identifier}`)
        }
      })
    }
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'modelName') {
      setValue('identifier', camelCase(e.target.value), setValues)
    }

    onChange(e, setValues)
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div className={styles.modal}>
        <div>
          <label htmlFor="modelName">
            Model Name {required.modelName && <Badge danger>Required</Badge>}
          </label>
          <Input
            name="modelName"
            placeholder="First Model? Try Post"
            hasError={required.modelName}
            onChange={_onChange}
            value={values.modelName}
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

        <div className={styles.buttons}>
          <LinkButton onClick={onClose}>Cancel</LinkButton>
          <PrimaryButton onClick={handleSubmit} isLoading={loading} loadingText="Creating Model...">
            Create Model
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(CreateModelModal)
