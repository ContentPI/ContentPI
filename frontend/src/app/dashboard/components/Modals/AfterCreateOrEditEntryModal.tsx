// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Modal as ModalUI, PrimaryButton, SuccessButton, DarkButton, Icon } from '@contentpi/ui'
import { cx } from '@contentpi/utils'

// Contexts
import { I18nContext } from '@contexts/i18n'

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

  const action = `<span class="${options.action}">${options.action}</span>`

  return (
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={onClose}>
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
    </ModalUI>
  )
}

export default memo(Modal)
