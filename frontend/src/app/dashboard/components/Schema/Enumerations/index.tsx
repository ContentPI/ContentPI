// Dependencies
import React, { FC, ReactElement, useContext, memo, useState } from 'react'
import { Icon } from '@contentpi/ui'
import DeleteEnumerationModal from '@modals/DeleteEnumerationModal'
import EditEnumerationModal from '@modals/EditEnumerationModal'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import { StyledEnumerations } from './Enumerations.styled'

interface iProps {
  data: any
  router: any
}

const Enumerations: FC<iProps> = ({ data, router }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  // State
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [id, setId] = useState('')

  // Data
  const { getEnumerationsByAppId } = data

  // First render
  if (!getEnumerationsByAppId) {
    return <div />
  }

  // Methods
  const handleDeleteModal = (): void => setIsOpenDelete(!isOpenDelete)
  const handleEditModal = (): void => setIsOpenEdit(!isOpenEdit)

  const handleDelete = (idx: string): void => {
    handleDeleteModal()
    setId(idx)
  }

  const handleEdit = (idx: any): any => {
    handleEditModal()
    setId(idx)
  }

  return (
    <>
      <DeleteEnumerationModal
        label={t('Delete Enumeration')}
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
        options={{
          data: { id },
          position: 'center',
          width: '600px'
        }}
      />
      {id && (
        <EditEnumerationModal
          label={t('Edit Enumeration')}
          isOpen={isOpenEdit}
          onClose={handleEditModal}
          options={{
            data: { id, getEnumerationsByAppId },
            position: 'top',
            width: '600px',
            height: '600px'
          }}
        />
      )}
      <MainLayout title={t('Enumerations')} header content footer sidebar router={router}>
        <StyledEnumerations>
          <h2>{t('Enumerations')}</h2>

          <div className="wrapper">
            {getEnumerationsByAppId.map((enumeration: any) => {
              const values = JSON.parse(enumeration.values)

              return (
                <div key={enumeration.id} className="enumeration">
                  <div className="information">
                    <div>
                      <h3 className="name">{enumeration.enumerationName}</h3>{' '}
                      <span className="identifier">#{enumeration.identifier}</span>
                    </div>
                    <div>
                      <Icon
                        type="far fa-edit"
                        title={t('Edit Enumeration')}
                        onClick={() => handleEdit(enumeration.id)}
                      />{' '}
                      <Icon
                        type="far fa-trash-alt"
                        title={t('Delete Enumeration')}
                        onClick={() => handleDelete(enumeration.id)}
                      />
                    </div>
                  </div>

                  <div className="values">
                    {values.map((value: any) => (
                      <span key={value.value} className="value">
                        {value.option}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </StyledEnumerations>
      </MainLayout>
    </>
  )
}

export default memo(Enumerations)
