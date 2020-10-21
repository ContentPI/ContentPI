// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { LinkButton, Menu, Toggle, Icon } from 'fogg-ui'

// Contexts
import { AppContext } from '@contexts/app'
import { ContentContext } from '@contexts/content'

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
  // Contexts
  const { t } = useContext(ContentContext)

  // Router
  const { language } = router

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

  const { appId, identifier } = getModel

  return (
    <>
      <DeleteModelModal
        label={t('Delete Model')}
        isOpen={isOpenDelete}
        onClose={handleDeleteModal}
        options={{
          data: modalData,
          position: 'center',
          width: '600px'
        }}
      />

      <EditModelModal
        label={t('Edit Model')}
        isOpen={isOpenEdit}
        onClose={handleEditModal}
        options={{
          data: { model: getModel },
          position: 'center',
          width: '400px'
        }}
      />

      <MainLayout title={t('Schema')} header content footer sidebar router={router}>
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
                  option: t('Edit Model'),
                  icon: 'edit',
                  onClick: (): void => handleEdit()
                },
                {
                  option: t('Delete Model'),
                  icon: 'trash',
                  onClick: (): void => handleDelete(getModel.id)
                }
              ]}
            />
            <div className="editContent">
              <Link href={`/${language}/dashboard/${appId}/master/content/model/${identifier}`}>
                <>
                  <Icon type="fas fa-edit" /> {t('Go to content editing')}
                </>
              </Link>
            </div>
          </div>

          <div className="toggle">
            <Toggle
              checked={showSystem}
              type="round"
              label={t('Show system fields')}
              onChange={(): void => setShowSystem(!showSystem)}
            />
          </div>

          <div className="wrapper">
            <Fields
              model={getModel.identifier}
              fields={getModel.fields}
              showSystem={showSystem}
              language={language}
            />
            <Declarations
              model={getModel}
              declarations={getDeclarations}
              enumerations={getEnumerationsByAppId}
              models={getAppById.models}
              language={language}
            />
          </div>
        </StyledSchema>
      </MainLayout>
    </>
  )
}

export default memo(Schema)
