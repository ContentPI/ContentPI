// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Modal as ModalUI, Badge, Input, PrimaryButton, LinkButton, Tags } from '@contentpi/ui'
import { camelCase, redirectTo, waitFor } from '@contentpi/utils'
import { getEmptyValues } from '@contentpi/core'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'
import { I18nContext } from '@contexts/i18n'

// Mutation
import EDIT_ENUMERATION_MUTATION from '@graphql/enumerations/editEnumeration.mutation'

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
    data: { id: enumerationId, getEnumerationsByAppId: enumerations }
  } = options

  // Getting current enumeration
  const currentEnum = enumerations
    ? enumerations.filter((enumeration: any) => enumeration.id === enumerationId)
    : []

  // States
  const initialValues = currentEnum.length > 0 ? currentEnum[0] : null
  const initialEnumValues = currentEnum.length > 0 ? JSON.parse(currentEnum[0].values) : []

  const [enumValues, setEnumValues] = useState<any>(initialEnumValues)
  const [values, setValues] = useState(initialValues)
  const [required, setRequired] = useState<any>({
    enumerationName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Mutations
  const [editMutation] = useMutation(EDIT_ENUMERATION_MUTATION)

  // Contexts
  const { onChange, setValue } = useContext(FormContext)

  // Methods
  const _onClose = (): any => {
    setValues(initialValues)
    onClose()
  }

  const _onChange = (e: any): any => {
    if (e.target.name === 'enumerationName') {
      setValue('identifier', camelCase(e.target.value), setValues)
    }

    onChange(e, setValues)
  }

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

        const newValues = { ...values, values: JSON.stringify(enumValues) }

        const { data: dataEditEnumeration } = await editMutation({
          variables: newValues
        })

        if (dataEditEnumeration.editEnumeration) {
          redirectTo('_self')
        }
      })
    }
  }

  // Wait until we set our form context
  if (!values) {
    return <div />
  }

  return (
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={_onClose}>
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
            tags={enumValues}
            getTags={(eValues): void => {
              if (eValues.length > 0) {
                setEnumValues(eValues)
              }
            }}
          />
        </div>

        <div className="buttons">
          <LinkButton onClick={_onClose}>{t('Cancel')}</LinkButton>
          <PrimaryButton
            onClick={handleSubmit}
            isLoading={loading}
            loadingText={t('Updating Enumeration...')}
          >
            {t('Update Enumeraiton')}
          </PrimaryButton>
        </div>
      </StyledModal>
    </ModalUI>
  )
}

export default memo(Modal)
