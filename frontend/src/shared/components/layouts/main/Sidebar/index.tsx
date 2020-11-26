// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Icon } from '@contentpi/ui'
import { getDirection } from '@contentpi/core'

// Contexts
import { AppContext } from '@contexts/app'

// Constants
import { STAGE_LINK, ASSET_LINK, LOGOUT_LINK, I18N_LINK } from '@constants/links'

// Sidebars
import ModelSidebar from '@dashboard/components/Models/ModelSidebar'
import ContentSidebar from '@dashboard/components/Content/ContentSidebar'

// Components
import Link from '@ui/Link'
import AppIcon from '@dashboard/components/MyApps/AppIcon'
import Logo from '../Logo'

// Styles
import { StyledSidebar } from './Sidebar.styled'

// Interface
interface iProps {
  router: any
}

const Sidebar: FC<iProps> = ({ router }): ReactElement => {
  // State
  const [open, setOpen] = useState(false)
  const [sidebar, setSidebar] = useState('')

  // Contexts
  const {
    state: { getAppById }
  } = useContext(AppContext)

  // Methods
  const handleOpen = (side: string, isOpen: boolean): void => {
    setSidebar(side)
    setOpen(isOpen)
  }

  return (
    <StyledSidebar>
      <section className="firstOptions">
        <div className="isoType">
          <Logo language={router && router.language} />
        </div>

        <ul>
          {getAppById && (
            <li className="appIcon">
              <Link href={STAGE_LINK(router).href} as={STAGE_LINK(router).as}>
                <AppIcon app={getAppById} hideName />
              </Link>
            </li>
          )}

          <li onClick={(): void => handleOpen('model', true)}>
            <a title="Models">
              <Icon type="layers" library="feather" />
            </a>
          </li>

          <li onClick={(): void => handleOpen('content', true)}>
            <a title="Content">
              <Icon type="edit" library="feather" />
            </a>
          </li>

          <li>
            <Link href={I18N_LINK(router).as} title="I18n">
              <Icon type="globe" library="feather" />
            </Link>
          </li>

          <li>
            <Link href={ASSET_LINK(router).as} title="Content">
              <Icon type="image" library="feather" />
            </Link>
          </li>

          <li>
            <a href={`${LOGOUT_LINK(router)}?redirectTo=/dashboard`} title="Logout">
              <Icon type="power" library="feather" />
            </a>
          </li>
        </ul>

        <section className={`profile ${getDirection(router && router.language)}`}>
          <span title="Carlos Santana">CS</span>
        </section>
      </section>

      <section
        className={`closed ${open ? `secondOptions` : ''} ${getDirection(
          router && router.language
        )}`}
      >
        <div className="close" onClick={(): void => handleOpen('', false)}>
          <span>
            <Icon
              type={`fas fa-arrow-${getDirection(router && router.language, 'right', 'left')}`}
            />
          </span>
        </div>

        <div className="subOptions">
          {sidebar === 'model' && <ModelSidebar app={getAppById} router={router} />}
          {sidebar === 'content' && <ContentSidebar app={getAppById} router={router} />}
        </div>
      </section>
    </StyledSidebar>
  )
}

export default memo(Sidebar)
