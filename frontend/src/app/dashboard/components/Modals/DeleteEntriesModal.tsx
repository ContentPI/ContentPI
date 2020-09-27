// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Modal, LinkButton } from 'fogg-ui'
import { redirectTo, pluralify } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Mutation
import DELETE_VALUES_MUTATION from '@graphql/values/deleteValues.mutation'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const DeleteEntriesModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Data
  const { data } = options

  // Mutations
  const [deleteValuesMutation] = useMutation(DELETE_VALUES_MUTATION)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const variables = {
      entries: data.entries
    }

    const deleted = await deleteValuesMutation({
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
          Are you sure you want to delete{' '}
          {pluralify('this entry', 'these entries', data.entries.length)}? <br />
          This cannot be reverted!
        </p>

        <div className={styles.buttons}>
          <LinkButton color="#6663fd" bold onClick={onClose}>
            Cancel
          </LinkButton>

          <LinkButton onClick={handleSubmit} color="red" bg="#fadad7" bold>
            <>Delete {pluralify('Entry', 'Entries', data.entries.length)}</>
          </LinkButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(DeleteEntriesModal)
