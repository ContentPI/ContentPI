// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Badge } from 'fogg-ui'

// Constants
import { MODEL_LINK, ENUMERATION_LINK } from '@constants/links'

// Components
import Link from '@ui/Link'

// Modals
import CreateModelModal from '@modals/CreateModelModal'
import CreateEnumerationModal from '@modals/CreateEnumerationModal'

// Styles
import styles from './ModelSidebar.scss'

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

      <div className={styles.modelSidebar}>
        <div className={styles.wrapper}>
          <span className={styles.models}>Models</span>
          <span className={styles.create}>
            <Badge onClick={handleModelModal}>+ Create</Badge>
          </span>
        </div>

        <div className={styles.modelsWrapper}>
          {models.map((model: any) => {
            router.model = model.identifier

            return (
              <div key={model.id}>
                <Link href={MODEL_LINK(router).as}>{model.modelName}</Link>
              </div>
            )
          })}
        </div>

        <div className={styles.wrapper}>
          <span className={styles.models}>Enumerations</span>
          <span className={styles.create}>
            <Badge onClick={handleEnumerationModal}>+ Create</Badge>
          </span>
        </div>

        <div className={styles.modelsWrapper}>
          {enumerations.map((enumeration: any) => {
            router.enumeration = enumeration.identifier

            return (
              <div key={enumeration.id}>
                <Link href={ENUMERATION_LINK(router).as}>{enumeration.enumerationName}</Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default memo(ModelSidebar)
