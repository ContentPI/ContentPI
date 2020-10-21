// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Badge } from 'fogg-ui'

// Contexts
import { ContentContext } from '@contexts/content'

// Constants
import { MODEL_LINK, ENUMERATION_LINK } from '@constants/links'

// Modals
import CreateModelModal from '@modals/CreateModelModal'
import CreateEnumerationModal from '@modals/CreateEnumerationModal'

// Components
import Link from '@ui/Link'

// Styles
import { StyledModelSidebar } from './ModelSidebar.styled'

interface iProps {
  app: any
  router: any
}

const ModelSidebar: FC<iProps> = ({ app, router }): ReactElement => {
  // Contexts
  const { t } = useContext(ContentContext)

  // Local state
  const [isOpenModel, setIsOpenModel] = useState(false)
  const [isOpenEnumeration, setIsOpenEnumeration] = useState(false)

  // Method to open modal
  const handleModelModal = (): void => setIsOpenModel(!isOpenModel)
  const handleEnumerationModal = (): void => setIsOpenEnumeration(!isOpenEnumeration)

  // Models
  const { models = [], enumerations = [] } = app

  return (
    <>
      <CreateEnumerationModal
        label={t('Create new Enumeration')}
        isOpen={isOpenEnumeration}
        onClose={handleEnumerationModal}
        options={{
          position: 'top',
          height: '600px',
          width: '600px'
        }}
      />

      <CreateModelModal
        label={t('Create new Model')}
        isOpen={isOpenModel}
        onClose={handleModelModal}
        options={{
          position: 'center',
          width: '400px'
        }}
      />

      <StyledModelSidebar>
        <div className="wrapper">
          <span className="models">{t('Models')}</span>
          <span className="create">
            <Badge onClick={handleModelModal}>+ {t('Create')}</Badge>
          </span>
        </div>

        <div className="modelsWrapper">
          {models.map((model: any) => {
            router.model = model.identifier

            if (model.identifier === 'asset') {
              return <div key={model.id} />
            }

            return (
              <div key={model.id}>
                <Link href={MODEL_LINK(router).as}>{model.modelName}</Link>
              </div>
            )
          })}
        </div>

        <div className="wrapper">
          <span className="models">{t('Enumerations')}</span>
          <span className="create">
            <Badge onClick={handleEnumerationModal}>+ {t('Create')}</Badge>
          </span>
        </div>

        <div className="modelsWrapper">
          {enumerations.map((enumeration: any) => {
            router.enumeration = enumeration.identifier

            return (
              <div key={enumeration.id}>
                <Link href={ENUMERATION_LINK(router).as}>{enumeration.enumerationName}</Link>
              </div>
            )
          })}
        </div>
      </StyledModelSidebar>
    </>
  )
}

export default memo(ModelSidebar)
