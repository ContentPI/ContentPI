// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Modal as ModalUI, EntryBlock } from '@contentpi/ui'
import { getReferenceTitle } from '@contentpi/core'

// Styles
import { StyledModal } from './Modal.styled'

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
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <StyledModal>
        {referenceEntries.entries.map((entry: any) => {
          entry.modelName = referenceEntries.modelName

          return (
            <EntryBlock
              key={entry.id}
              onClick={() => setCurrentEntry(entry)}
              modelName={referenceEntries.modelName}
              title={getReferenceTitle(entry)}
              status={entry.status}
            />
          )
        })}
      </StyledModal>
    </ModalUI>
  )
}

export default memo(ReferenceModal)
