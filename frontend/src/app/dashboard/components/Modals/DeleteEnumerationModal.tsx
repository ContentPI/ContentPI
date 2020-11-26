// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Modal as ModalUI, LinkButton } from '@contentpi/ui'
import { redirectTo } from '@contentpi/utils'
import { useMutation } from '@apollo/client'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Mutation
import DELETE_ENUMERATION_MUTATION from '@graphql/enumerations/deleteEnumeration.mutation'

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

  // Mutations
  const [deleteMutation] = useMutation(DELETE_ENUMERATION_MUTATION)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const { data } = options

    const variables = {
      id: data.id
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
          {t('Are you sure you want to delete the enumeration?')} <br />
          {t('This cannot be reverted!')}
        </p>

        <div className="buttons">
          <LinkButton color="#6663fd" bold onClick={onClose}>
            {t('Cancel')}
          </LinkButton>

          <LinkButton onClick={handleSubmit} color="red" bg="#fadad7" bold>
            {t('Delete Enumeration')}
          </LinkButton>
        </div>
      </StyledModal>
    </ModalUI>
  )
}

export default memo(Modal)
