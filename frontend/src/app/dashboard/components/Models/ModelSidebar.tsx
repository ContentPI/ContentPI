// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Badge } from 'fogg-ui'

// Constants
import { MODEL_LINK, ENUMERATION_LINK } from '@constants/links'

// Modals
import CreateModelModal from '@modals/CreateModelModal'
import CreateEnumerationModal from '@modals/CreateEnumerationModal'

// Styles
import { StyledModelSidebar } from './ModelSidebar.styled'

interface iProps {
  app: any
  router: any
}

const ModelSidebar: FC<iProps> = ({ app, router }): ReactElement => {
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
        label="Create new Enumeration"
        isOpen={isOpenEnumeration}
        onClose={handleEnumerationModal}
        options={{
          position: 'top',
          height: '600px',
          width: '600px'
        }}
      />

      <CreateModelModal
        label="Create new Model"
        isOpen={isOpenModel}
        onClose={handleModelModal}
        options={{
          position: 'center',
          width: '400px'
        }}
      />

      <StyledModelSidebar>
        <div className="wrapper">
          <span className="models">Models</span>
          <span className="create">
            <Badge onClick={handleModelModal}>+ Create</Badge>
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
                <a href={MODEL_LINK(router).as}>{model.modelName}</a>
              </div>
            )
          })}
        </div>

        <div className="wrapper">
          <span className="models">Enumerations</span>
          <span className="create">
            <Badge onClick={handleEnumerationModal}>+ Create</Badge>
          </span>
        </div>

        <div className="modelsWrapper">
          {enumerations.map((enumeration: any) => {
            router.enumeration = enumeration.identifier

            return (
              <div key={enumeration.id}>
                <a href={ENUMERATION_LINK(router).as}>{enumeration.enumerationName}</a>
              </div>
            )
          })}
        </div>
      </StyledModelSidebar>
    </>
  )
}

export default memo(ModelSidebar)
