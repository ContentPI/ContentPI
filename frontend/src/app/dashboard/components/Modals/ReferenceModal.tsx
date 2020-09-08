// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Modal, EntryBlock } from 'fogg-ui'

// Styles
import styles from './Modal.scss'

interface iProps {
  isOpen: boolean
  label: string
  options: any
  onClose(): void
}

const ReferenceModal: FC<iProps> = ({ isOpen, label, onClose, options }): ReactElement => {
  // Getting data from options
  const {
    data: { referenceEntries, setCurrentEntry }
  } = options

  if (!referenceEntries) {
    return <div />
  }

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <div className={styles.modal}>
        {referenceEntries.entries.map((entry: any) => {
          const title: any = Object.entries(entry)[0][1]
          entry.modelName = referenceEntries.modelName

          return (
            <EntryBlock
              key={entry.id}
              onClick={() => setCurrentEntry(entry)}
              modelName={referenceEntries.modelName}
              title={title}
              status={entry.status}
            />
          )
        })}
      </div>
    </Modal>
  )
}

export default memo(ReferenceModal)
