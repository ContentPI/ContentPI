// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Table, PrimaryButton } from 'fogg-ui'
import { getValuesForTable } from 'fogg-utils'

// Constants
import { CREATE_ENTRY_LINK, EDIT_ENTRY_LINK } from '@constants/links'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Link from '@ui/Link'

// Styles
import styles from './Content.scss'

interface iProps {
  router: any
  data: any
}

const Content: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const { getModel, getDeclarations } = data

  // First render
  if (!getModel && !getDeclarations) {
    return <div />
  }

  const { body, head, rows, total } = getValuesForTable(getModel.fields, null, 'createdAt', 'desc')

  return (
    <MainLayout title="Content" header content footer sidebar noWrapper router={router}>
      <div className={styles.content}>
        <div className={styles.model}>
          <PrimaryButton
            href={CREATE_ENTRY_LINK(router).href}
            as={CREATE_ENTRY_LINK(router).as}
            Link={Link}
          >
            + New Entry
          </PrimaryButton>
        </div>

        <div className={styles.rows}>
          <Table
            url={EDIT_ENTRY_LINK(router).as}
            data={{
              body,
              head,
              rows: rows[0],
              count: total,
              fileTypes: {}
            }}
            onDelete={(ids: any): void => console.log('Delete', ids)}
            onPublish={(ids: any): void => console.log('Publish', ids)}
            onUnpublish={(ids: any): void => console.log('Unpublish', ids)}
          />
        </div>
      </div>
    </MainLayout>
  )
}

export default memo(Content)
