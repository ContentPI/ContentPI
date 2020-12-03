// Dependencies
import React, { FC, ReactElement, useState, useContext, memo, useRef } from 'react'
import { cx } from '@contentpi/utils'
import { Icon } from '@contentpi/ui'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import update from 'immutability-helper'
import { XYCoord } from 'dnd-core'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Components
import DeleteFieldModal from '@modals/DeleteFieldModal'
import EditFieldModal from '@modals/EditFieldModal'
import { ItemTypes } from './ItemTypes'

// Styles
import { StyledFields } from './Fields.styled'

interface iProps {
  model: string
  fields: any
  showSystem: boolean
  language: string
}

interface iDragItem {
  index: number
  id: string
  type: string
}

const Fields: FC<iProps> = ({ model, fields, showSystem, language }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  // State
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [data, setData] = useState({})
  const [_fields, setFields] = useState(fields)

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

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = _fields[dragIndex]
    setFields(
      update(_fields, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      })
    )
  }

  const fieldRender = (field: any) => {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
      accept: ItemTypes.FIELD,
      hover(item: iDragItem, monitor: DropTargetMonitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = field.index
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        // Determine mouse position
        const clientOffset = monitor.getClientOffset()
        // Get pixels to the top
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        // Time to actually perform the action
        moveCard(dragIndex, hoverIndex)
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex
      }
    })

    const [{ isDragging }, drag] = useDrag({
      item: { type: ItemTypes.FIELD, id: field.id, index: field.index },
      collect: (monitor: any) => ({
        isDragging: !!monitor.isDragging()
      })
    })
    drag(drop(ref))
    return (
      <div
        style={{ opacity: isDragging ? '0.5' : '1' }}
        ref={ref}
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
          {field.type === 'Status' && <Icon title={field.description} type="fas fa-low-vision" />}
          {field.type === 'String' && <Icon title={field.description} type="fas fa-font" />}
          {field.type === 'Text' && <Icon title={field.description} type="fas fa-quote-right" />}
          {field.type === 'Media' && <Icon title={field.description} type="fas fa-image" />}
          {field.type === 'Boolean' && <Icon title={field.description} type="fas fa-toggle-on" />}
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
              <span className={cx('tag', field.isSystem ? 'system' : '')}>{t(field.type)}</span>
            )}
            {field.isPrimaryKey && (
              <span className={cx('tag', field.isSystem ? 'system' : '')}>{t('Primary Key')}</span>
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
              <span className={cx('tag', field.isSystem ? 'system' : '')}>{t('System Field')}</span>
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
    )
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
          height: language === 'ja-JP' || language === 'ar' ? '627px' : '610px',
          width: '600px'
        }}
      />

      <StyledFields>
        {_fields.map((field: any, index: number) => fieldRender({ ...field, index }))}
      </StyledFields>
    </>
  )
}

export default memo(Fields)
