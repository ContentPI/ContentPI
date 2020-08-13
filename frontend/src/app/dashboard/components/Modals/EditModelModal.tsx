// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton } from 'fogg-ui'
import { redirectTo, getParamsFromUrl, camelCase, getEmptyValues, waitFor } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import EDIT_MODEL_MUTATION from '@graphql/models/editModel.mutation'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const EditModelModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Getting data from options
  const {
    data: { model }
  } = options

  // States
  const initialValues = {
    id: model.id,
    modelName: model.modelName,
    identifier: model.identifier,
    description: model.description
  }
  const [values, setValues] = useState(initialValues)
  const [required, setRequired] = useState<any>({
    modelName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Mutations
  const [editModelMutation] = useMutation(EDIT_MODEL_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Getting appId
  const { appId } = getParamsFromUrl(['page', 'appId', 'stage'])

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['modelName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(2).then(async () => {
        setLoading(false)

        const { data: dataEditModel } = await editModelMutation({
          variables: {
            id: values.id,
            modelName: values.modelName,
            identifier: values.identifier,
            description: values.description
          }
        })

        if (dataEditModel.editModel) {
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

  const _onClose = (): any => {
    setValues(initialValues)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={_onClose}>
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
            value={values.description}
            onChange={_onChange}
          />
        </div>

        <div className={styles.buttons}>
          <LinkButton onClick={_onClose}>Cancel</LinkButton>
          <PrimaryButton onClick={handleSubmit} isLoading={loading} loadingText="Updating Model...">
            Update Model
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(EditModelModal)
