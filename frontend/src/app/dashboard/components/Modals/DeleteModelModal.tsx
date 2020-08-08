// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Modal, LinkButton } from 'fogg-ui'
import { redirectTo } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Mutation
import DELETE_MODEL_MUTATION from '@graphql/models/deleteModel.mutation'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const DeleteFieldModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
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
      redirectTo(`/dashboard/${deleted.data.deleteModel.appId}/master/`)
    }
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div className={styles.modal}>
        <p>
          Are you sure you want to delete the model? <br />
          This cannot be reverted!
        </p>

        <div className={styles.buttons}>
          <LinkButton color="#6663fd" bold onClick={onClose}>
            Cancel
          </LinkButton>

          <LinkButton onClick={handleSubmit} color="red" bg="#fadad7" bold>
            Delete Model
          </LinkButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(DeleteFieldModal)
