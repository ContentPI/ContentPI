// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { LinkButton, Menu, Toggle, Icon } from 'fogg-ui'

// Contexts
import { AppContext } from '@contexts/app'

// Components
import MainLayout from '@layouts/main/MainLayout'
import DeleteModelModal from '@modals/DeleteModelModal'
import EditModelModal from '@modals/EditModelModal'
import Link from '@ui/Link'
import Fields from './Fields'
import Declarations from './Declarations'
import Enumerations from './Enumerations'

// Styles
import { StyledSchema } from './Schema.styled'

interface iProps {
  data: any
  router: any
}

const Schema: FC<iProps> = ({ data, router }): ReactElement => {
  // State
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [modalData, setModalData] = useState({})
  const [showSystem, setShowSystem] = useState(false)

  // Contexts
  const {
    state: { getAppById }
  } = useContext(AppContext)

  // Methods
  const handleDeleteModal = (): void => setIsOpenDelete(!isOpenDelete)
  const handleMenu = (): void => setIsOpen(!isOpen)
  const handleEditModal = (): void => setIsOpenEdit(!isOpenEdit)
  const handleDelete = (id: any): any => {
    handleMenu()
    handleDeleteModal()
    setModalData({ id })
  }
  const handleEdit = (): any => {
    handleMenu()
    handleEditModal()
  }

  if (!getAppById) {
    return <div />
  }

  // Data
  const { getModel, getDeclarations, getEnumerationsByAppId, section } = data

  // First render
  if (!getModel && !getDeclarations) {
    return <div />
  }

  if (section === 'enumeration') {
    return <Enumerations data={data} router={router} />
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

      <EditModelModal
        label="Edit Model"
        isOpen={isOpenEdit}
        onClose={handleEditModal}
        options={{
          data: { model: getModel },
          position: 'center',
          width: '400px'
        }}
      />

      <MainLayout title="Schema" header content footer sidebar router={router}>
        <StyledSchema>
          <div className="model">
            <h3 className="name">{getModel.modelName}</h3>{' '}
            <span className="identifier">#{getModel.identifier}</span>{' '}
            <LinkButton className="button" onClick={handleMenu}>
              •••
            </LinkButton>
            <Menu
              isOpen={isOpen}
              items={[
                {
                  option: 'Edit Model',
                  icon: 'edit',
                  onClick: (): void => handleEdit()
                },
                {
                  option: 'Delete Model',
                  icon: 'trash',
                  onClick: (): void => handleDelete(getModel.id)
                }
              ]}
            />
            <div className="editContent">
              <Link
                href={`/dashboard/${getModel.appId}/master/content/model/${getModel.identifier}`}
              >
                <>
                  <Icon type="fas fa-edit" /> Go to content editing
                </>
              </Link>
            </div>
          </div>

          <div className="toggle">
            <Toggle
              checked={showSystem}
              type="round"
              label="Show system fields"
              onChange={(): void => setShowSystem(!showSystem)}
            />
          </div>

          <div className="wrapper">
            <Fields model={getModel.identifier} fields={getModel.fields} showSystem={showSystem} />
            <Declarations
              model={getModel}
              declarations={getDeclarations}
              enumerations={getEnumerationsByAppId}
              models={getAppById.models}
            />
          </div>
        </StyledSchema>
      </MainLayout>
    </>
  )
}

export default memo(Schema)
