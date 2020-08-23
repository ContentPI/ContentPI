// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Alert, PrimaryButton, SuccessButton } from 'fogg-ui'
import { cx, redirectTo } from 'fogg-utils'

// Shared components
import AfterCreateOrEditEntryModal from '@modals/AfterCreateOrEditEntryModal'

// Constants
import { CONTENT_LINK, CREATE_ENTRY_LINK, EDIT_ENTRY_LINK } from '@constants/links'

// Styles
import styles from './SystemFields.scss'

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
  router
}): ReactElement => {
  const editUrl = `${EDIT_ENTRY_LINK(router).as}?entryId=${systemValues.id}`
  const handleEditNewEntry = (): void => redirectTo(editUrl)
  const handleCreateNewEntry = (): void => redirectTo(CREATE_ENTRY_LINK(router).as)
  const handleGoToEntriesList = (): void => redirectTo(CONTENT_LINK(router).as)

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

      <div className={styles.systemFields}>
        <div className={styles.wrapper}>
          <div className={styles.block}>Status</div>

          <div className={styles.row}>
            <PrimaryButton
              onClick={(): any => handleSubmit('save')}
              isLoading={saveLoading}
              disabled={publishLoading}
              loadingText="Saving..."
            >
              Save
            </PrimaryButton>
            <SuccessButton
              onClick={(): any => handleSubmit('publish')}
              isLoading={publishLoading}
              disabled={saveLoading}
              loadingText="Publishing..."
            >
              Publish
            </SuccessButton>
          </div>

          <div className={styles.block}>System Fields</div>

          <div className={styles.row}>
            {systemFields.map((systemField: any): any => {
              if (systemField.identifier !== 'id') {
                return (
                  <div key={systemField.id} className={styles.systemField}>
                    <div>
                      {systemField.identifier === 'updatedAt'
                        ? 'Last saved'
                        : systemField.fieldName}
                    </div>
                    <div
                      className={cx(
                        styles[systemField.identifier],
                        styles[systemValues[systemField.identifier].toLowerCase()],
                        systemValues[systemField.identifier] === '' ? styles.empty : ''
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

        <div className={cx(styles.alert, showAlert ? styles.show : '')}>
          <Alert success={alertType === 'success'} danger={alertType === 'danger'} flat>
            {alert}
          </Alert>
        </div>
      </div>
    </>
  )
}

export default memo(SystemFields)
