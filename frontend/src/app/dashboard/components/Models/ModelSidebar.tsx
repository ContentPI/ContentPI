// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Badge } from 'fogg-ui'

// Constants
import { MODEL_LINK } from '@constants/links'

// Components
import Link from '@ui/Link'

// Modals
import CreateModelModal from '@modals/CreateModelModal'

// Styles
import styles from './ModelSidebar.scss'

interface iProps {
  app: any
  router: any
}

const ModelSidebar: FC<iProps> = ({ app, router }): ReactElement => {
  // Local state
  const [isOpenModel, setIsOpenModel] = useState(false)

  // Method to open modal
  const handleModelModal = (): void => setIsOpenModel(!isOpenModel)

  // Models
  const { models = [] } = app

  return (
    <>
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
      </div>
    </>
  )
}

export default memo(ModelSidebar)
