// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Logo from '@layouts/main/Logo'
import Cards from './Cards'

// Styles
import styles from './MyApps.scss'

interface iProps {
  dataGetApps: any
  router: any
}

const MyApps: FC<iProps> = ({ dataGetApps, router }): ReactElement => {
  // First render
  if (!dataGetApps.getApps) {
    return <div />
  }

  return (
    <MainLayout title="My Apps">
      <div className={styles.myApps}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Logo />
          </div>
        </div>

        <Cards items={dataGetApps.getApps} router={router} />
      </div>
    </MainLayout>
  )
}

export default memo(MyApps)
