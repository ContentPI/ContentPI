// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Modal, PrimaryButton, SuccessButton, DarkButton, Icon } from 'fogg-ui'
import { cx } from 'fogg-utils'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const AfterCreateOrEditEntryModal: FC<iProps> = ({
  isOpen,
  label,
  onClose,
  options
}): ReactElement => {
  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div className={styles.modal}>
        <p className={styles.center}>
          You <span className={styles[options.action]}>{options.action}</span> correctly your entry!
          What do you want to do next?
        </p>

        <div className={cx(styles.buttons, styles.center)}>
          <PrimaryButton onClick={options.handleEditNewEntry}>
            <>
              <Icon type="far fa-edit" /> Continue Editing this Entry
            </>
          </PrimaryButton>
          <SuccessButton onClick={options.handleCreateNewEntry}>
            <>
              <Icon type="far fa-plus-square" /> Create a new entry
            </>
          </SuccessButton>
          <DarkButton onClick={options.handleGoToEntriesList}>
            <>
              <Icon type="far fa-list-alt" /> Go to entries list
            </>
          </DarkButton>
        </div>
      </div>
    </Modal>
  )
}

export default memo(AfterCreateOrEditEntryModal)
