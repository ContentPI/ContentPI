// Dependencies
import React, { FC, ReactElement, useContext, useState, memo } from 'react'
import { Icon } from 'fogg-ui'

// Contexts
import { AppContext } from '@contexts/app'

// Constants
import { STAGE_LINK } from '@constants/links'

// Sidebars
import ModelSidebar from '@dashboard/components/Models/ModelSidebar'
import ContentSidebar from '@dashboard/components/Content/ContentSidebar'

// Components
import Link from '@ui/Link'
import AppIcon from '@dashboard/components/MyApps/AppIcon'
import Logo from '../Logo'

// Styles
import styles from './Sidebar.scss'

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
    <aside className={styles.sidebar}>
      <section className={styles.firstOptions}>
        <div className={styles.isoType}>
          <Logo />
        </div>

        <ul>
          {getAppById && (
            <li className={styles.appIcon}>
              <Link href={STAGE_LINK(router).href} as={STAGE_LINK(router).as}>
                <AppIcon app={getAppById} hideName />
              </Link>
            </li>
          )}

          <li onClick={(): void => handleOpen('model', true)}>
            <a title="Models">
              <Icon type="fas fa-cubes" />
            </a>
          </li>

          <li onClick={(): void => handleOpen('content', true)}>
            <a title="Content">
              <Icon type="fas fa-pencil-alt" />
            </a>
          </li>

          <li>
            <a title="Assets">
              <Icon type="fas fa-photo-video" />
            </a>
          </li>

          <li>
            <Link href="/logout?redirectTo=/dashboard" title="Logout">
              <Icon type="fas fa-power-off" />
            </Link>
          </li>
        </ul>

        <section className={styles.profile}>
          <span title="Carlos Santana">CS</span>
        </section>
      </section>

      <section className={`${styles.closed} ${open ? `${styles.secondOptions}` : ''}`}>
        <div className={styles.close} onClick={(): void => handleOpen('', false)}>
          <span>
            <Icon type="fas fa-arrow-left" />
          </span>
        </div>

        <div className={styles.subOptions}>
          {sidebar === 'model' && <ModelSidebar app={getAppById} router={router} />}
          {sidebar === 'content' && <ContentSidebar />}
        </div>
      </section>
    </aside>
  )
}

export default memo(Sidebar)
