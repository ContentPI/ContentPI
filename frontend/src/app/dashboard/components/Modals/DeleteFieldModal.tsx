// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Modal, LinkButton } from 'fogg-ui'
import { redirectTo } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Mutation
import DELETE_FIELD_MUTATION from '@graphql/fields/deleteField.mutation'

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
  const [deleteFieldMutation] = useMutation(DELETE_FIELD_MUTATION)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const { data } = options

    const variables = {
      id: data.id
    }

    const deleted = await deleteFieldMutation({
      variables
    })

    if (deleted) {
      redirectTo('_self')
    }
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div className={styles.modal}>
        <p>
          Are you sure you want to delete the field? <br />
          This cannot be reverted!
        </p>

        <div className={styles.buttons}>
          <LinkButton color="#6663fd" bold onClick={onClose}>
            Cancel
          </LinkButton>

          <LinkButton onClick={handleSubmit} color="red" bg="#fadad7" bold>
            Delete Field
          </LinkButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(DeleteFieldModal)
