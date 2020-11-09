// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Table, PrimaryButton, Pagination } from '@contentpi/ui'
import { getValuesForTable, pluralify } from '@contentpi/utils'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Configuration
import config from '@config'

// Constants
import { CREATE_ENTRY_LINK, EDIT_ENTRY_LINK, CONTENT_LINK } from '@constants/links'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Link from '@ui/Link'
import DeleteEntriesModal from '@modals/DeleteEntriesModal'
import PublishOrUnpublishEntriesModal from '@modals/PublishOrUnpublishEntriesModal'
import PageNotFound from '../PageNotFound'

// Data
import i18nFields from './i18nFields'

// Styles
import { StyledContent } from './Content.styled'

interface iProps {
  router: any
  data: any
}

const Content: FC<iProps> = ({ data, router }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  // States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPublishOrUnpublishModalOpen, setIsPublishOrUnpublishModalOpen] = useState(false)
  const [entries, setEntries] = useState<any[]>([])
  const [action, setAction] = useState('')

  // Data
  const { getModel, getDeclarations, getI18n } = data
  const { page = 1 } = router
  const rowsPerPage = getI18n ? 50 : 10
  let fields: any = []
  let values: any = null

  // First render
  if (!getI18n && !getModel && !getDeclarations) {
    return <div />
  }

  if (getModel) {
    fields = getModel.fields
  } else {
    fields = i18nFields
    values = getI18n
  }

  // Methods
  const handleEntriesModal = (entriesToDelete: any[], modalAction: string) => {
    if (modalAction === 'delete') {
      setIsDeleteModalOpen(!isDeleteModalOpen)
    } else {
      setIsPublishOrUnpublishModalOpen(!isPublishOrUnpublishModalOpen)
      setAction(modalAction)
    }

    if (entriesToDelete.length > 0) {
      setEntries(entriesToDelete)
    }
  }

  const { body, head, rows, total, raw } = getValuesForTable(
    { fields, values },
    null,
    'createdAt',
    'desc',
    rowsPerPage
  )

  // If page does not exists we display 404 error page
  if (!rows[page - 1]) {
    return <PageNotFound />
  }

  const isFile = body.includes('file') && body.includes('fileUrl') && body.includes('information')

  const label = `${action === 'publish' ? 'Publish' : 'Unpublish'} ${pluralify(
    'Entry',
    'Entries',
    entries.length
  )}`

  return (
    <>
      <DeleteEntriesModal
        label={t(`Delete ${pluralify('Entry', 'Entries', entries.length)}`)}
        isOpen={isDeleteModalOpen}
        onClose={() => handleEntriesModal([], 'delete')}
        options={{
          position: 'center',
          width: '620px',
          data: {
            entries
          }
        }}
      />

      <PublishOrUnpublishEntriesModal
        label={t(label)}
        isOpen={isPublishOrUnpublishModalOpen}
        onClose={() => handleEntriesModal([], action)}
        options={{
          position: 'center',
          width: '620px',
          data: {
            action,
            entries
          }
        }}
      />

      <MainLayout title={t('Content')} header content footer sidebar noWrapper router={router}>
        <StyledContent style={{ margin: '0 auto', width: '98%' }}>
          <div className="model">
            <PrimaryButton
              href={CREATE_ENTRY_LINK(router).href}
              as={CREATE_ENTRY_LINK(router).as}
              Link={Link}
            >
              <>+ {t('New Entry')}</>
            </PrimaryButton>
          </div>

          <div className="rows">
            <Table
              t={t}
              url={EDIT_ENTRY_LINK(router).as}
              query="?entryId="
              data={{
                body,
                head,
                rows: rows[page - 1],
                raw,
                fileTypes: config.files.types,
                isFile
              }}
              onDelete={(ids: any): any => handleEntriesModal(ids, 'delete')}
              onPublish={(ids: any): void => handleEntriesModal(ids, 'publish')}
              onUnpublish={(ids: any): void => handleEntriesModal(ids, 'unpublish')}
            />

            <Pagination
              design="primary"
              page={page}
              total={total}
              rowsPerPage={rowsPerPage}
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
