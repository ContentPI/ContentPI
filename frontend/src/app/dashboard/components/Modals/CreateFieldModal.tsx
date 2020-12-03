// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import {
  Modal as ModalUI,
  Badge,
  Input,
  PrimaryButton,
  LinkButton,
  Toggle,
  Select
} from '@contentpi/ui'
import { camelCase, redirectTo, getParamsFromUrl, waitFor } from '@contentpi/utils'
import { getEmptyValues } from '@contentpi/core'
import { useLazyQuery, useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'
import { I18nContext } from '@contexts/i18n'

// Hooks
import usePrevious from '@lib/usePrevious'

// Mutation
import CREATE_FIELD_MUTATION from '@graphql/fields/createField.mutation'
import GET_MODEL_QUERY from '@graphql/models/getModel.query'

// Styles
import { theme } from '@styles/theme'
import { StyledModal } from './Modal.styled'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const Modal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  const { appId } = getParamsFromUrl(['language', 'page', 'appId', 'stage'])

  const {
    data: { enumerations = [], fieldsCount = 0, models }
  } = options

  // States
  const initialValues = {
    model: options.data.modelIdentifier,
    modelId: '',
    modelName: options.data.modelName,
    fieldName: '',
    identifier: '',
    order: `${Number(fieldsCount) + 1}`,
    type: options.data.type,
    defaultValue: '',
    description: '',
    isHide: false,
    isMedia: false,
    isUnique: false,
    isRequired: true,
    isSystem: false,
    isPrimaryKey: false
  }
  const [values, setValues] = useState(initialValues)
  const [required, setRequired] = useState<any>({
    fieldName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)
  const [enumeration, setEnumeration] = useState('')
  const [reference, setReference] = useState('')

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Mutations
  const [createMutation] = useMutation(CREATE_FIELD_MUTATION)

  // Queries
  const [getModelQueryThenCreateField] = useLazyQuery(GET_MODEL_QUERY, {
    onCompleted: async data => createField(data)
  })

  // Previous Props
  const prevProps: any = usePrevious({ options })

  // Methods
  const _onChange = (e: any): any => {
    if (e.target.name === 'fieldName') {
      setValue('identifier', camelCase(e.target.value), setValues)
    }

    if (e.target.name === 'order') {
      if (Number(e.target.value) <= 0) {
        e.target.value = e.target.value === '0' ? '1' : Math.abs(e.target.value)
      } else if (e.target.value > 25) {
        e.target.value = '25'
      }

      setValue('order', Math.abs(e.target.value), setValues)
    }

    onChange(e, setValues)
  }

  const _onClose = (): any => {
    setValues(initialValues)
    onClose()
  }

  const createField = async (data: any): Promise<void> => {
    if (data.getModel && data.getModel.id) {
      values.modelId = data.getModel.id

      if (options.data.type === 'Dropdown') {
        values.defaultValue = enumeration
      }

      if (options.data.type === 'Reference') {
        values.defaultValue = reference
      }

      const { data: dataField } = await createMutation({
        variables: values
      })

      if (dataField.createField) {
        _onClose()
        redirectTo('_self')
      }
    }
  }

  const handleSubmit = async (): Promise<void> => {
    let emptyValues = getEmptyValues(values, ['fieldName', 'identifier'])

    if (options.data.type === 'Dropdown') {
      if (!emptyValues && !enumeration) {
        emptyValues = {
          enumeration: true
        }
      } else if (!enumeration) {
        emptyValues.enumeration = true
      }
    }

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(1).then(async () => {
        setLoading(false)

        // Creating a new field
        getModelQueryThenCreateField({
          variables: {
            identifier: values.model,
            appId
          }
        })
      })
    }
  }

  const renderDropdown = () => {
    const selectOptions: any = enumerations.map((option: any) => ({
      option: option.enumerationName,
      value: option.id
    }))

    return (
      <div>
        <label htmlFor="enumeration">
          {t('Enumeration')} {required.enumeration && <Badge danger>{t('Required')}</Badge>}
        </label>
        <Select
          name="enumeration"
          label={t('Select Enumeration')}
          onClick={({ value }: { value: any }): void => {
            if (value) {
              setEnumeration(value)
            }
          }}
          options={selectOptions}
        />
      </div>
    )
  }

  const renderReference = () => {
    const currentModel = options.data.modelIdentifier
    const selectOptions: any = models
      .filter((model: any) => model.modelName !== 'Asset' && model.identifier !== currentModel)
      .map((option: any) => ({
        option: option.modelName,
        value: option.id
      }))

    return (
      <div>
        <label htmlFor="reference">
          {t('Reference')} {required.reference && <Badge danger>{t('Required')}</Badge>}
        </label>

        <Select
          name="reference"
          label="Select Reference"
          onClick={({ value }: { value: any }): void => {
            if (value) {
              setReference(value)
            }
          }}
          options={selectOptions}
        />
      </div>
    )
  }

  // Effects
  useEffect(() => {
    if (prevProps && prevProps.options !== options) {
      setValue('type', options.data.type, setValues)
    }
  }, [prevProps, options])

  return (
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={_onClose}>
      <StyledModal>
        <div>
          <label htmlFor="fieldName">
            {t('Field Name')} {required.fieldName && <Badge danger>{t('Required')}</Badge>}
          </label>
          <Input
            id="fieldName"
            name="fieldName"
            placeholder={t('First Field? Try Title')}
            hasError={required.fieldName}
            onChange={_onChange}
            value={values.fieldName}
          />
        </div>

        <div>
          <label htmlFor="identifier">
            {t('Identifier')} {required.identifier && <Badge danger>{t('Required')}</Badge>}
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
          <label htmlFor="order">{t('Order (1 to 25)')}</label>
          <Input
            type="number"
            name="order"
            min="1"
            max="25"
            onChange={_onChange}
            value={values.order}
          />
        </div>

        {options.data.type === 'Dropdown' && renderDropdown()}
        {options.data.type === 'Reference' && renderReference()}

        <div>
          <label htmlFor="description">{t('Description')}</label>
          <Input
            name="description"
            placeholder={t('Small description about your field')}
            onChange={_onChange}
            value={values.description}
          />
        </div>

        <div className="toggles">
          <div className="left">
            <div style={{ marginBottom: '20px' }}>
              <Toggle
                color={theme.colors.green.screaminGreen}
                type="round"
                label={t('Make field required')}
                onChange={(): void => setValue('isRequired', !values.isRequired, setValues)}
                checked={values.isRequired}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Toggle
                color={theme.colors.green.screaminGreen}
                type="round"
                label={t('Set field as Primary Key')}
                onChange={(): void => setValue('isPrimaryKey', !values.isPrimaryKey, setValues)}
                checked={values.isPrimaryKey}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Toggle
                color={theme.colors.green.screaminGreen}
                type="round"
                label={t('Is Media (image, video or document)?')}
                onChange={(): void => setValue('isMedia', !values.isMedia, setValues)}
                checked={values.isMedia}
              />
            </div>
          </div>

          <div className="right">
            <div style={{ marginBottom: '20px' }}>
              <Toggle
                color={theme.colors.green.screaminGreen}
                type="round"
                label={t('Set field as unique')}
                onChange={(): void => setValue('isUnique', !values.isUnique, setValues)}
                checked={values.isUnique}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <Toggle
                color={theme.colors.green.screaminGreen}
                type="round"
                label={t('Hide field')}
                onChange={(): void => setValue('isHide', !values.isHide, setValues)}
                checked={values.isHide}
              />
            </div>
          </div>
        </div>

        <div className="buttons">
          <LinkButton onClick={_onClose}>{t('Cancel')}</LinkButton>
          <PrimaryButton
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={t('Creating Field...')}
          >
            {t('Create Field')}
          </PrimaryButton>
        </div>
      </StyledModal>
    </ModalUI>
  )
}

export default memo(Modal)
