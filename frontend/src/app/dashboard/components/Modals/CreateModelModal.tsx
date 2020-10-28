// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton } from 'fogg-ui'
import { redirectTo, getParamsFromUrl, camelCase, getEmptyValues, waitFor } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'
import { I18nContext } from '@contexts/i18n'

// Mutation
import CREATE_MODEL_MUTATION from '@graphql/models/createModel.mutation'

// Styles
import { StyledModal } from './Modal.styled'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateModelModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Getting appId
  const { appId } = getParamsFromUrl(['language', 'page', 'appId', 'stage'])

  // Contexts
  const { t } = useContext(I18nContext)

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
          redirectTo(`/dashboard/${appId}/master/schema/model/${values.identifier}`, true)
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
      <StyledModal>
        <div>
          <label htmlFor="modelName">
            {t('Model Name')} {required.modelName && <Badge danger>{t('Required')}</Badge>}
          </label>
          <Input
            name="modelName"
            placeholder={t('First Model? Try Post')}
            hasError={required.modelName}
            onChange={_onChange}
            value={values.modelName}
          />
        </div>

        <div>
          <label htmlFor="identifier">
            {t('Identifier')} {required.identifier && <Badge danger>{t('Required')}</Badge>}
          </label>
          <Input
            name="identifier"
            value={values.identifier}
            hasError={required.identifier}
            onChange={_onChange}
          />
        </div>

        <div>
          <label htmlFor="description">{t('Description')}</label>
          <Input
            name="description"
            placeholder={t('Small description about your new app')}
            onChange={_onChange}
            value={values.description}
          />
        </div>

        <div className="buttons">
          <LinkButton onClick={onClose}>{t('Cancel')}</LinkButton>
          <PrimaryButton
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={t('Creating Model...')}
          >
            {t('Create Model')}
          </PrimaryButton>
        </div>
      </StyledModal>
    </Modal>
  )
}

export default memo(CreateModelModal)
