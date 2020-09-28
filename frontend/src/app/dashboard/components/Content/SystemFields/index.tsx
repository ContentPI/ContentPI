// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Alert, PrimaryButton, SuccessButton } from 'fogg-ui'
import { cx, redirectTo } from 'fogg-utils'

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
  alertType,
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
        label="What's next?"
        isOpen={isModalOpen}
        onClose={handleEditNewEntry}
        options={{
          position: 'center',
          width: '620px',
          action: alert === 'Saved' ? 'saved' : 'published',
          handleEditNewEntry,
          handleCreateNewEntry,
          handleGoToEntriesList
        }}
      />

      <StyledSystemFields>
        <div className="wrapper">
          <div className="block">Status</div>

          <div className="row">
            {!isFile && (
              <PrimaryButton
                onClick={(): any => handleSubmit('save', false)}
                isLoading={saveLoading}
                disabled={publishLoading}
                loadingText="Saving..."
              >
                Save
              </PrimaryButton>
            )}
            <SuccessButton
              onClick={(): any => handleSubmit('publish', isFile)}
              isLoading={publishLoading}
              disabled={saveLoading}
              loadingText={`${isFile ? 'Uploading...' : 'Publishing...'}`}
            >
              {isFile ? 'Upload and publish' : 'Publish'}
            </SuccessButton>
          </div>

          <div className="block">System Fields</div>

          <div className="row">
            {systemFields.map((systemField: any): any => {
              if (systemField.identifier !== 'id') {
                return (
                  <div key={systemField.id} className="systemField">
                    <div>
                      {systemField.identifier === 'updatedAt'
                        ? 'Last saved'
                        : systemField.fieldName}
                    </div>
                    <div
                      className={cx(
                        systemField.identifier,
                        systemValues[systemField.identifier].toLowerCase(),
                        systemValues[systemField.identifier] === '' ? 'empty' : ''
                      )}
                    >
                      {systemValues[systemField.identifier]}
                    </div>
                  </div>
                )
              }

              return <div key={systemField.id} />
            })}
          </div>
        </div>

        <div className={cx('alert', showAlert ? 'show' : '')}>
          <Alert success={alertType === 'success'} danger={alertType === 'danger'} flat>
            {alert}
          </Alert>
        </div>
      </StyledSystemFields>
    </>
  )
}

export default memo(SystemFields)
