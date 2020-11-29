// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Modal as ModalUI, Badge, Input, PrimaryButton, LinkButton } from '@contentpi/ui'
import { redirectTo, getParamsFromUrl, camelCase, waitFor } from '@contentpi/utils'
import { getEmptyValues } from '@contentpi/core'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'
import { I18nContext } from '@contexts/i18n'

// Mutation
import EDIT_MODEL_MUTATION from '@graphql/models/editModel.mutation'

// Styles
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
  const { appId } = getParamsFromUrl(['language', 'page', 'appId', 'stage'])

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

  const _onClose = (): any => {
    setValues(initialValues)
    onClose()
  }

  return (
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={_onClose}>
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
            value={values.description}
            onChange={_onChange}
          />
        </div>

        <div className="buttons">
          <LinkButton onClick={_onClose}>{t('Cancel')}</LinkButton>
          <PrimaryButton
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={t('Updating Model...')}
          >
            {t('Update Model')}
          </PrimaryButton>
        </div>
      </StyledModal>
    </ModalUI>
  )
}

export default memo(Modal)
