// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { cx } from '@contentpi/utils'
import { Icon } from '@contentpi/ui'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Components
import DeleteFieldModal from '@modals/DeleteFieldModal'
import EditFieldModal from '@modals/EditFieldModal'

// Styles
import { StyledFields } from './Fields.styled'

interface iProps {
  model: string
  fields: any
  showSystem: boolean
  language: string
}

const Fields: FC<iProps> = ({ model, fields, showSystem, language }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

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
        label={t('Delete Field')}
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
        options={{
          data,
          position: 'center',
          width: '600px'
        }}
      />

      <EditFieldModal
        label={t('Edit Field')}
        isOpen={isOpenEdit}
        onClose={handleEditModal}
        options={{
          data,
          position: 'top',
          height: language === 'ja-JP' || language === 'ar' ? '800px' : '760px',
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
                <Icon title={t(field.description)} className="id">
                  ID
                </Icon>
              )}
              {field.type === 'Integer' && (
                <Icon title={t(field.type)} className="integer">
                  10
                </Icon>
              )}
              {field.type === 'Float' && (
                <Icon title={t(field.type)} className="float">
                  1.0
                </Icon>
              )}
              {field.type === 'DateTime' && <Icon title={field.description} type="fas fa-clock" />}
              {field.type === 'Status' && (
                <Icon title={t(field.description)} type="fas fa-low-vision" />
              )}
              {field.type === 'String' && <Icon title={t(field.type)} type="fas fa-font" />}
              {field.type === 'Text' && <Icon title={t(field.type)} type="fas fa-quote-right" />}
              {field.type === 'Media' && <Icon title={t(field.type)} type="fas fa-image" />}
              {field.type === 'Boolean' && <Icon title={t(field.type)} type="fas fa-toggle-on" />}
              {field.type === 'Dropdown' && (
                <Icon title={t(field.type)} type="fas fa-caret-square-down" />
              )}
              {field.type === 'Reference' && <Icon title={t(field.type)} type="fas fa-link" />}
            </div>

            <div className="name">
              {field.fieldName}
              <span className="identifier">#{field.identifier}</span>

              <div className="information">
                {field.type !== 'Media' && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>{t(field.type)}</span>
                )}
                {field.isPrimaryKey && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>
                    {t('Primary Key')}
                  </span>
                )}
                {field.isRequired && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>{t('Required')}</span>
                )}
                {field.isUnique && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>{t('Unique')}</span>
                )}
                {field.isMedia && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>{t('Media')}</span>
                )}
                {field.isHide && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>{t('Hide')}</span>
                )}
                {field.isSystem && (
                  <span className={cx('tag', field.isSystem ? 'system' : '')}>
                    {t('System Field')}
                  </span>
                )}
              </div>

              {!field.isSystem && model !== 'asset' && (
                <div className="actions">
                  <Icon
                    type="fas fa-edit"
                    title={t('Edit')}
                    onClick={(): void => handleEdit(field.id)}
                  />
                  <Icon
                    type="fas fa-trash"
                    title={t('Delete')}
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
