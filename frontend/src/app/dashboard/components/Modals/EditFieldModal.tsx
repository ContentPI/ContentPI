// Dependencies
import React, { FC, ReactElement, useState, useEffect, useContext, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton, Toggle } from 'fogg-ui'
import { camelCase, getEmptyValues, redirectTo, waitFor } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Hooks
import usePrevious from '@lib/usePrevious'

// Contexts
import { FormContext } from '@contexts/form'

// Mutation
import EDIT_FIELD_MUTATION from '@graphql/fields/editField.mutation'

// Styles
import { StyledModal } from './Modal.styled'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const EditFieldModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Getting data from options
  const {
    data: { id: fieldId, fields }
  } = options

  // Previous Props
  const prevProps: any = usePrevious({ options })

  // States
  const initialValues = {
    type: '',
    fieldName: '',
    identifier: '',
    order: '1',
    description: '',
    isMedia: false,
    isRequired: true,
    isUnique: false,
    isHide: false,
    isSystem: false,
    isPrimaryKey: false
  }
  const [values, setValues] = useState(initialValues)
  const [required, setRequired] = useState<any>({
    appName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Mutations
  const [editFieldMutation] = useMutation(EDIT_FIELD_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Methods
  const _onClose = (): any => {
    setValues(initialValues)
    onClose()
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'fieldName') {
      setValue('identifier', camelCase(e.target.value), setValues)
    }

    if (e.target.name === 'order') {
      if (Number(e.target.value) <= 0) {
        e.target.value = e.target.value === '0' ? '1' : e.target.value
      } else if (e.target.value > 25) {
        e.target.value = '25'
      }

      setValue('order', Math.abs(e.target.value), setValues)
    }

    onChange(e, setValues)
  }

  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['fieldName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(1).then(async () => {
        setLoading(false)

        const edited = await editFieldMutation({
          variables: {
            id: fieldId,
            ...values
          }
        })

        if (edited) {
          redirectTo('_self')
        }
      })
    }
  }

  // Effects
  useEffect(() => {
    const currentField = fields ? fields.filter((field: any) => field.id === fieldId) : []

    if (prevProps && prevProps.options !== options && currentField.length > 0) {
      setValues(currentField[0])
    } else if (currentField.length > 0) {
      setValues(currentField[0])
    }
  }, [fields, options])

  // Wait until we set our form context
  if (!values) {
    return <div />
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={_onClose}>
      <StyledModal>
        <div>
          <label htmlFor="fieldName">
            Field Name {required.fieldName && <Badge danger>Required</Badge>}
          </label>
          <Input
            id="fieldName"
            name="fieldName"
            placeholder="First Field? Try Title"
            hasError={required.fieldName}
            onChange={_onChange}
            value={values.fieldName}
          />
        </div>

        <div>
          <label htmlFor="identifier">
            Identifier {required.identifier && <Badge danger>Required</Badge>}
          </label>
          <Input
            id="identifier"
            name="identifier"
            value={values.identifier}
            hasError={required.identifier}
            onChange={_onChange}
          />
        </div>

        <div>
          <label htmlFor="order">Order (1 to 25)</label>
          <Input
            type="number"
            name="order"
            min="1"
            max="25"
            onChange={_onChange}
            value={values.order}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <Input
            name="description"
            placeholder="Small description about your field"
            onChange={_onChange}
            value={values.description}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Make field required"
            onChange={(): void => setValue('isRequired', !values.isRequired, setValues)}
            checked={values.isRequired}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as Primary Key"
            onChange={(): void => setValue('isPrimaryKey', !values.isPrimaryKey, setValues)}
            checked={values.isPrimaryKey}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Set field as unique"
            onChange={(): void => setValue('isUnique', !values.isUnique, setValues)}
            checked={values.isUnique}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Is System Field?"
            onChange={(): void => setValue('isSystem', !values.isSystem, setValues)}
            checked={values.isSystem}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Hide field"
            onChange={(): void => setValue('isHide', !values.isHide, setValues)}
            checked={values.isHide}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Toggle
            color="#42f598"
            type="round"
            label="Is Media (image, video or document)?"
            onChange={(): void => setValue('isMedia', !values.isMedia, setValues)}
            checked={values.isMedia}
          />
        </div>

        <div className="buttons">
          <LinkButton onClick={_onClose}>Cancel</LinkButton>
          <PrimaryButton onClick={handleSubmit} isLoading={loading} loadingText="Updating Field...">
            Update Field
          </PrimaryButton>
        </div>
      </StyledModal>
    </Modal>
  )
}

export default memo(EditFieldModal)
