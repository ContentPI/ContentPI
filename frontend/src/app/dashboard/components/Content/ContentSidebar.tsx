// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'

// Contexts
import { ContentContext } from '@contexts/content'

// Constants
import { CONTENT_LINK } from '@constants/links'

// Component
import Link from '@ui/Link'

// Styles
import { StyledContentSidebar } from './ContentSidebar.styled'

interface iProps {
  app: any
  router: any
}

const ContentSidebar: FC<iProps> = ({ app, router }): ReactElement => {
  // Contexts
  const { t } = useContext(ContentContext)

  // Models
  const { models = [] } = app

  return (
    <>
      <StyledContentSidebar>
        <div className="wrapper">
          <span className="models">{t('Content')}</span>
        </div>

        <div className="modelsWrapper">
          {models.map((model: any) => {
            router.section = 'model'
            router.model = model.identifier

            if (model.identifier === 'asset') {
              return <div key={model.id} />
            }

            return (
              <div key={model.id}>
                <Link href={CONTENT_LINK(router).as}>{model.modelName}</Link>
              </div>
            )
          })}
        </div>
      </StyledContentSidebar>
    </>
  )
}

export default memo(ContentSidebar)
