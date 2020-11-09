// Dependencies
import React, { FC, ReactElement, useContext, useState, useEffect, memo } from 'react'
import { Modal, Badge, Input, PrimaryButton, LinkButton, Icon } from '@contentpi/ui'
import {
  generateHexCode,
  invertHexCode,
  redirectTo,
  slugFn,
  getEmptyValues,
  waitFor
} from '@contentpi/utils'
import { useMutation } from '@apollo/client'

// Contexts
import { FormContext } from '@contexts/form'
import { UserContext } from '@contexts/user'
import { I18nContext } from '@contexts/i18n'

// Mutation
import CREATE_APP_MUTATION from '@graphql/apps/createApp.mutation'

// Styles
import { StyledModal } from './Modal.styled'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const CreateAppModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  // States
  const [values, setValues] = useState({
    appName: '',
    identifier: '',
    icon: generateHexCode(),
    description: '',
    userId: ''
  })
  const [required, setRequired] = useState<any>({
    appName: false,
    identifier: false
  })
  const [loading, setLoading] = useState(false)

  // Mutations
  const [createAppMutation] = useMutation(CREATE_APP_MUTATION)

  // Contexts
  const { user } = useContext(UserContext)
  const { onChange, setValue } = useContext(FormContext)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const emptyValues = getEmptyValues(values, ['appName', 'identifier'])

    if (emptyValues) {
      setRequired(emptyValues)
    } else {
      setLoading(true)

      waitFor(2).then(async () => {
        setLoading(false)

        const { data: dataCreateApp } = await createAppMutation({
          variables: values
        })

        if (dataCreateApp.createApp) {
          redirectTo(`/dashboard/${dataCreateApp.createApp.id}/master`, true)
        }
      })
    }
  }

  const handleIconColor = (): void => setValue('icon', generateHexCode(), setValues)

  const _onChange = (e: any): any => {
    if (e.target.name === 'appName') {
      setValue('identifier', slugFn(e.target.value), setValues)
    }

    onChange(e, setValues)
  }

  // Effects
  useEffect(() => {
    // Setting up the user
    if (user) {
      setValues((prevValues: any) => ({
        ...prevValues,
        userId: user.id
      }))
    }
  }, [user])

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <StyledModal>
        <div>
          <label htmlFor="appName">
            {t('App Name')} {required.appName && <Badge danger>{t('Required')}</Badge>}
          </label>
          <Input
            name="appName"
            placeholder={t('First App? Try Blog or Forums')}
            hasError={required.appName}
            onChange={_onChange}
            value={values.appName}
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
          <label htmlFor="icon">
            {t('Icon Color')} <Icon type="fas fa-sync-alt" onClick={handleIconColor} />
          </label>
          <Input
            name="icon"
            onChange={_onChange}
            value={values.icon}
            readOnly
            style={{
              color: invertHexCode(values.icon),
              backgroundColor: values.icon
            }}
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
            loadingText={t('Creating App...')}
          >
            {t('Create App')}
          </PrimaryButton>
        </div>
      </StyledModal>
    </Modal>
  )
}

export default memo(CreateAppModal)
