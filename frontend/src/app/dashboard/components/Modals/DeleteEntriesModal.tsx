// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Modal as ModalUI, LinkButton } from '@contentpi/ui'
import { redirectTo, pluralify } from '@contentpi/utils'
import { useMutation } from '@apollo/client'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Mutation
import DELETE_VALUES_MUTATION from '@graphql/values/deleteValues.mutation'

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

  // Data
  const { data } = options

  // Mutations
  const [deleteMutation] = useMutation(DELETE_VALUES_MUTATION)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const variables = {
      entries: data.entries
    }

    const deleted = await deleteMutation({
      variables
    })

    if (deleted) {
      redirectTo('_self')
    }
  }

  return (
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <StyledModal>
        <p>
          {t(
            'Are you sure you want to delete',
            pluralify('this entry', 'these entries', data.entries.length),
            '?'
          )}{' '}
          <br />
          {t('This cannot be reverted!')}
        </p>

        <div className="buttons">
          <LinkButton color="#6663fd" bold onClick={onClose}>
            {t('Cancel')}
          </LinkButton>

          <LinkButton onClick={handleSubmit} color="red" bg="#fadad7" bold>
            <>{t(`Delete ${pluralify('Entry', 'Entries', data.entries.length)}`)}</>
          </LinkButton>
        </div>
      </StyledModal>
    </ModalUI>
  )
}

export default memo(Modal)
