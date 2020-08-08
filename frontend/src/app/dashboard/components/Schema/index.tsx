// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { LinkButton, Menu } from 'fogg-ui'

// Components
import DeleteModelModal from '@modals/DeleteModelModal'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import styles from './Schema.scss'

interface iProps {
  data: any
  router: any
}

const Schema: FC<iProps> = ({ data, router }): ReactElement => {
  // State
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [modalData, setModalData] = useState({})

  // Methods
  const handleDeleteModal = (): void => setIsOpenDelete(!isOpenDelete)
  const handleMenu = (): void => setIsOpen(!isOpen)
  const handleDelete = (id: any): any => {
    handleMenu()
    handleDeleteModal()
    setModalData({ id })
  }

  // Data
  const { getModel } = data

  if (!getModel) {
    return <div />
  }

  return (
    <>
      <DeleteModelModal
        label="Delete Model"
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
        options={{
          data: modalData,
          position: 'center',
          width: '600px'
        }}
      />

      <MainLayout title="Schema" header content footer sidebar router={router}>
        <div className={styles.schema}>
          <div className={styles.model}>
            <h3 className={styles.name}>{getModel.modelName}</h3>{' '}
            <span className={styles.identifier}>#{getModel.identifier}</span>{' '}
            <LinkButton className={styles.button} onClick={handleMenu}>
              •••
            </LinkButton>
            <Menu
              isOpen={isOpen}
              items={[
                {
                  option: 'Delete Model',
                  icon: 'trash',
                  onClick: (): void => handleDelete(getModel.id)
                }
              ]}
            />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default memo(Schema)
