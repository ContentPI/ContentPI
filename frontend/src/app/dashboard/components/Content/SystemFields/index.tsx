// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { PrimaryButton, SuccessButton } from 'fogg-ui'
import { cx, redirectTo } from 'fogg-utils'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Shared components
import AfterCreateOrEditEntryModal from '@modals/AfterCreateOrEditEntryModal'

// Constants
import { CONTENT_LINK, CREATE_ENTRY_LINK, EDIT_ENTRY_LINK } from '@constants/links'

// Styles
import { StyledSystemFields } from './SystemFields.styled'

interface iProps {
  alert: string
  alertType: string
  handleSubmit: any
  publishLoading: boolean
  router: any
  saveLoading: boolean
  showAlert: boolean
  systemFields: any
  systemValues: any
  values: any
  isModalOpen: boolean
}

const SystemFields: FC<iProps> = ({
  alert,
  handleSubmit,
  publishLoading,
  saveLoading,
  showAlert,
  systemFields,
  systemValues,
  isModalOpen,
  router,
  values
}): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  const editUrl = `${EDIT_ENTRY_LINK(router).as}?entryId=${systemValues.id}`
  const handleEditNewEntry = (): void => redirectTo(editUrl)
  const handleCreateNewEntry = (): void => redirectTo(CREATE_ENTRY_LINK(router).as)
  const handleGoToEntriesList = (): void => redirectTo(CONTENT_LINK(router).as)
  const isFile =
    values &&
    values.hasOwnProperty('file') &&
    values.hasOwnProperty('fileUrl') &&
    values.hasOwnProperty('information')

  return (
    <>
      <AfterCreateOrEditEntryModal
        label={t("What's next?")}
        isOpen={isModalOpen}
        onClose={handleEditNewEntry}
        options={{
          position: 'center',
          width: '630px',
          action: alert === 'Saved' ? 'saved' : 'published',
          handleEditNewEntry,
          handleCreateNewEntry,
          handleGoToEntriesList
        }}
      />

      <StyledSystemFields>
        <div className="wrapper">
          <div className="block">{t('Status')}</div>

          <div className="row">
            {!isFile && (
              <PrimaryButton
                onClick={(): any => handleSubmit('save', false)}
                isLoading={saveLoading}
                disabled={publishLoading}
                loadingText={t('Saving...')}
              >
                {t('Save')}
              </PrimaryButton>
            )}
            <SuccessButton
              onClick={(): any => handleSubmit('publish', isFile)}
              isLoading={publishLoading}
              disabled={saveLoading}
              loadingText={`${isFile ? t('Uploading...') : t('Publishing...')}`}
            >
              {isFile ? t('Upload and publish') : t('Publish')}
            </SuccessButton>

            <p
              className={cx(
                'alert',
                showAlert ? 'show' : '',
                alert === 'Published' ? 'published' : 'saved'
              )}
            >
              {t(`${alert || 'Published'} successfully!`)}
            </p>
          </div>

          <div className="block">{t('System Fields')}</div>

          <div className="row">
            {systemFields.map((systemField: any): any => {
              if (systemField.identifier !== 'id') {
                return (
                  <div key={systemField.id} className="systemField">
                    <div>
                      {systemField.identifier === 'updatedAt'
                        ? t('Last saved')
                        : t(systemField.fieldName)}
                    </div>
                    <div
                      className={cx(
                        systemField.identifier,
                        systemValues[systemField.identifier].toLowerCase(),
                        systemValues[systemField.identifier] === '' ? 'empty' : ''
                      )}
                    >
                      {t(systemValues[systemField.identifier])}
                    </div>
                  </div>
                )
              }

              return <div key={systemField.id} />
            })}
          </div>
        </div>
      </StyledSystemFields>
    </>
  )
}

export default memo(SystemFields)
