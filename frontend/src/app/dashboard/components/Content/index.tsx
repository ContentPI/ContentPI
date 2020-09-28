// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Table, PrimaryButton, Pagination } from 'fogg-ui'
import { getValuesForTable, pluralify } from 'fogg-utils'

// Configuration
import config from '@config'

// Constants
import { CREATE_ENTRY_LINK, EDIT_ENTRY_LINK, CONTENT_LINK } from '@constants/links'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Link from '@ui/Link'
import DeleteEntriesModal from '@modals/DeleteEntriesModal'
import PageNotFound from '../PageNotFound'

// Styles
import { StyledContent } from './Content.styled'

interface iProps {
  router: any
  data: any
}

const Content: FC<iProps> = ({ data, router }): ReactElement => {
  // States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [entries, setEntries] = useState<any[]>([])

  // Data
  const { getModel, getDeclarations } = data
  const { page = 1 } = router

  // First render
  if (!getModel && !getDeclarations) {
    return <div />
  }

  // Methods
  const handleDeleteEntriesModal = (entriesToDelete: any[]) => {
    setIsModalOpen(!isModalOpen)

    if (entriesToDelete.length > 0) {
      setEntries(entriesToDelete)
    }
  }

  const { body, head, rows, total } = getValuesForTable(getModel.fields, null, 'createdAt', 'desc')

  // If page does not exists we display 404 error page
  if (!rows[page - 1]) {
    return <PageNotFound />
  }

  const isFile = body.includes('file') && body.includes('fileUrl') && body.includes('information')

  return (
    <>
      <DeleteEntriesModal
        label={`Delete ${pluralify('Entry', 'Entries', entries.length)}`}
        isOpen={isModalOpen}
        onClose={() => handleDeleteEntriesModal([])}
        options={{
          position: 'center',
          width: '620px',
          data: {
            entries
          }
        }}
      />

      <MainLayout title="Content" header content footer sidebar noWrapper router={router}>
        <StyledContent>
          <div className="model">
            <PrimaryButton
              href={CREATE_ENTRY_LINK(router).href}
              as={CREATE_ENTRY_LINK(router).as}
              Link={Link}
            >
              + New Entry
            </PrimaryButton>
          </div>

          <div className="rows">
            <Table
              url={EDIT_ENTRY_LINK(router).as}
              query="?entryId="
              data={{
                body,
                head,
                rows: rows[page - 1],
                count: total,
                fileTypes: config.files.types,
                isFile
              }}
              onDelete={(ids: any): any => handleDeleteEntriesModal(ids)}
              onPublish={(ids: any): void => console.log('Publish', ids)}
              onUnpublish={(ids: any): void => console.log('Unpublish', ids)}
            />

            <Pagination
              theme="primary"
              page={page}
              total={total}
              href={`${CONTENT_LINK(router).href}?page=`}
              as={`${CONTENT_LINK(router).as}?page=`}
              Link={Link}
            />
          </div>
        </StyledContent>
      </MainLayout>
    </>
  )
}

export default memo(Content)
