// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Alert, PrimaryButton, SuccessButton } from 'fogg-ui'
import { cx } from 'fogg-utils'

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
}

const SystemFields: FC<iProps> = ({
  alert,
  alertType,
  handleSubmit,
  publishLoading,
  saveLoading,
  showAlert,
  systemFields,
  systemValues
}): ReactElement => {
  return (
    <>
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
