// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Modal, PrimaryButton, SuccessButton, DarkButton, Icon } from 'fogg-ui'
import { cx } from 'fogg-utils'

// Contexts
import { ContentContext } from '@contexts/content'

// Styles
import { StyledModal } from './Modal.styled'

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
  // Contexts
  const { t } = useContext(ContentContext)

  const action = `<span class="${options.action}">${options.action}</span>`

  return (
    <Modal isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <StyledModal>
        <p
          className="center"
          dangerouslySetInnerHTML={{
            __html: t(`You ${action} correctly your entry!`, 'What do you want to do next?')
          }}
        />

        <div className={cx('buttons', 'center')}>
          <PrimaryButton onClick={options.handleEditNewEntry}>
            <>
              <Icon type="far fa-edit" /> {t('Continue Editing this Entry')}
            </>
          </PrimaryButton>
          <SuccessButton onClick={options.handleCreateNewEntry}>
            <>
              <Icon type="far fa-plus-square" /> {t('Create a new entry')}
            </>
          </SuccessButton>
          <DarkButton onClick={options.handleGoToEntriesList}>
            <>
              <Icon type="far fa-list-alt" /> {t('Go to entries list')}
            </>
          </DarkButton>
        </div>
      </StyledModal>
    </Modal>
  )
}

export default memo(AfterCreateOrEditEntryModal)
