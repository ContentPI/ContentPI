// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Modal as ModalUI, Badge, Input, PrimaryButton, LinkButton, Tags } from '@contentpi/ui'
import { redirectTo, getParamsFromUrl, camelCase, waitFor } from '@contentpi/utils'
import { getEmptyValues } from '@contentpi/core'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'
import { I18nContext } from '@contexts/i18n'

// Mutation
import CREATE_ENUMERATION_MUTATION from '@graphql/enumerations/createEnumeration.mutation'

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

  // Getting appId
  const { appId } = getParamsFromUrl(['language', 'page', 'appId', 'stage'])

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
  const [createMutation] = useMutation(CREATE_ENUMERATION_MUTATION)

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

        const { data: dataCreateEnumeration } = await createMutation({
          variables: values
        })

        if (dataCreateEnumeration.createEnumeration) {
          redirectTo(`/dashboard/${appId}/master/schema/enumeration/${values.identifier}`, true)
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
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <StyledModal>
        <div>
          <label htmlFor="modelName">
            {t('Enumeration Name')}{' '}
            {required.enumerationName && <Badge danger>{t('Required')}</Badge>}
          </label>
          <Input
            name="enumerationName"
            placeholder={t('Enumeration Name')}
            hasError={required.enumerationName}
            onChange={_onChange}
            value={values.enumerationName}
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

        <div className="values">
          <label htmlFor="values">
            {t('Values')} {required.enumerationValues && <Badge danger>{t('Required')}</Badge>}
          </label>
          <Tags
            label={t('Add new value')}
            tags={[]}
            getTags={(eValues): void => {
              if (eValues.length > 0) {
                setEnumValues(eValues)
              }
            }}
          />
        </div>

        <div className="buttons">
          <LinkButton onClick={onClose}>{t('Cancel')}</LinkButton>
          <PrimaryButton
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={t('Creating Enumeration...')}
          >
            {t('Create Enumeration')}
          </PrimaryButton>
        </div>
      </StyledModal>
    </ModalUI>
  )
}

export default memo(Modal)
