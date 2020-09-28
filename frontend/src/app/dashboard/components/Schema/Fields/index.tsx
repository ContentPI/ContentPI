// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { cx } from 'fogg-utils'
import { Icon } from 'fogg-ui'

// Components
import DeleteFieldModal from '@modals/DeleteFieldModal'
import EditFieldModal from '@modals/EditFieldModal'

// Styles
import { StyledFields } from './Fields.styled'

interface iProps {
  model: string
  fields: any
  showSystem: boolean
}

const Fields: FC<iProps> = ({ model, fields, showSystem }): ReactElement => {
  // State
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [data, setData] = useState({})

  // Methods
  const handleDeleteModal = (): void => setIsOpenDelete(!isOpenDelete)
  const handleEditModal = (): void => setIsOpenEdit(!isOpenEdit)

  const handleDelete = (id: any): any => {
    handleDeleteModal()
    setData({ id })
  }

  const handleEdit = (id: any): any => {
    handleEditModal()
    setData({ id, fields })
  }

  return (
    <>
      <DeleteFieldModal
        label="Delete Field"
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
        options={{
          data,
          position: 'center',
          width: '600px'
        }}
      />

      <EditFieldModal
        label="Edit Field"
        isOpen={isOpenEdit}
        onClose={handleEditModal}
        options={{
          data,
          position: 'top',
          height: '760px',
          width: '600px'
        }}
      />

      <StyledFields>
        {fields.map((field: any) => (
          <div
            key={field.id}
            className={cx(
              'field',
              field.isSystem ? 'sys' : field.type,
              field.isSystem && !showSystem ? 'hideSys' : ''
            )}
          >
            <div className={cx('icon', field.type)}>
              {field.type === 'ID' && (
                <Icon title={field.description} className="id">
                  ID
                </Icon>
              )}
              {field.type === 'Integer' && (
                <Icon title={field.description} className="integer">
                  10
                </Icon>
              )}
              {field.type === 'Float' && (
                <Icon title={field.description} className="float">
                  1.0
                </Icon>
              )}
              {field.type === 'DateTime' && <Icon title={field.description} type="fas fa-clock" />}
              {field.type === 'Status' && (
                <Icon title={field.description} type="fas fa-low-vision" />
              )}
              {field.type === 'String' && <Icon title={field.description} type="fas fa-font" />}
              {field.type === 'Text' && (
                <Icon title={field.description} type="fas fa-quote-right" />
              )}
              {field.type === 'Media' && <Icon title={field.description} type="fas fa-image" />}
              {field.type === 'Boolean' && (
                <Icon title={field.description} type="fas fa-toggle-on" />
              )}
              {field.type === 'Dropdown' && (
                <Icon title={field.description} type="fas fa-caret-square-down" />
              )}
              {field.type === 'Reference' && <Icon title={field.description} type="fas fa-link" />}
            </div>

            <div className="name">
              {field.fieldName}
              <span className="identifier">#{field.identifier}</span>

              <div className="information">
                {field.type !== 'Media' && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>{field.type}</span>
                )}
                {field.isPrimaryKey && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>Primary Key</span>
                )}
                {field.isRequired && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>Required</span>
                )}
                {field.isUnique && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>Unique</span>
                )}
                {field.isMedia && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>Media</span>
                )}
                {field.isHide && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>Hide</span>
                )}
                {field.isSystem && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>System Field</span>
                )}
              </div>

              {!field.isSystem && model !== 'asset' && (
                <div className="actions">
                  <Icon
                    type="fas fa-edit"
                    title="Edit"
                    onClick={(): void => handleEdit(field.id)}
                  />
                  <Icon
                    type="fas fa-trash"
                    title="Delete"
                    onClick={(): void => handleDelete(field.id)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </StyledFields>
    </>
  )
}

export default memo(Fields)
