// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Modal, LinkButton } from 'fogg-ui'
import { redirectTo } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Contexts
import { ContentContext } from '@contexts/content'

// Mutation
import DELETE_MODEL_MUTATION from '@graphql/models/deleteModel.mutation'

// Styles
import { StyledModal } from './Modal.styled'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const DeleteModelModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Contexts
  const { t } = useContext(ContentContext)

  // Mutations
  const [deleteModelMutation] = useMutation(DELETE_MODEL_MUTATION)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const { data } = options

    const variables = {
      id: data.id
    }

    const deleted: any = await deleteModelMutation({
      variables
    })

    if (deleted) {
      redirectTo(`/dashboard/${deleted.data.deleteModel.appId}/master/`, true)
    }
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <StyledModal>
        <p>
          {t('Are you sure you want to delete the model?')} <br />
          {t('This cannot be reverted!')}
        </p>

        <div className="buttons">
          <LinkButton color="#6663fd" bold onClick={onClose}>
            {t('Cancel')}
          </LinkButton>

          <LinkButton onClick={handleSubmit} color="red" bg="#fadad7" bold>
            {t('Delete Model')}
          </LinkButton>
        </div>
      </StyledModal>
    </Modal>
  )
}

export default memo(DeleteModelModal)
