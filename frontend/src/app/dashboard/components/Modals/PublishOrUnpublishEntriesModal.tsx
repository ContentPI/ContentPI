// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Modal as ModalUI, LinkButton } from '@contentpi/ui'
import { redirectTo, pluralify, capitalize } from '@contentpi/utils'
import { useMutation } from '@apollo/client'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Mutation
import PUBLISH_UNPUBLISH_ENTRIES_MUTATION from '@graphql/values/publishOrUnpublishEntries.mutation'

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

  // Data
  const {
    data: { entries, action }
  } = options

  // Mutations
  const [publishOrUnpublishEntriesMutation] = useMutation(PUBLISH_UNPUBLISH_ENTRIES_MUTATION)

  // Methods
  const handleSubmit = async (): Promise<void> => {
    const variables = {
      entries,
      action
    }

    const result = await publishOrUnpublishEntriesMutation({
      variables
    })

    if (result) {
      redirectTo('_self')
    }
  }

  return (
    <ModalUI isOpen={isOpen} label={label} options={options} onClose={onClose}>
      <StyledModal>
        <p>
          {t(
            `Are you sure you want to ${action || 'publish'}`,
            pluralify('this entry', 'these entries', entries.length),
            '?'
          )}
        </p>

        <div className="buttons">
          <LinkButton color="#6663fd" bold onClick={onClose}>
            {t('Cancel')}
          </LinkButton>

          <LinkButton
            onClick={handleSubmit}
            color={action === 'publish' ? '#0eb87f' : '#ffb914'}
            bg={action === 'publish' ? '#dbfff3' : '#fff2d4'}
            bold
          >
            <>
              {t(
                `${capitalize(action) || 'Publish'} ${pluralify(
                  'Entry',
                  'Entries',
                  entries.length
                )}`
              )}
            </>
          </LinkButton>
        </div>
      </StyledModal>
    </ModalUI>
  )
}

export default memo(Modal)
