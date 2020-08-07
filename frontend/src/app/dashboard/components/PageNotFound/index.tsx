// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Utils
import { cx } from 'fogg-utils'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import styles from './PageNotFound.scss'

const PageNotFound: FC = (): ReactElement => {
  // Characters
  const characters = ['boy', 'girl']
  const image = characters[Math.round(Math.random())]

  return (
    <MainLayout title="Page not found" header content footer sidebar>
      <div className={cx(styles.pageNotFound, styles[image])}>
        <img alt="Not Found" src={`/images/characters/${image}.png`} />

        <div className={styles.notFound}>
          <h1>404</h1>

          <span>Um, yeah. This is awkward.</span>

          <p>
            We tried really hard, but couldn&apos;t find the page you were looking for. You may find
            what you were looking for on our <a href="/dashboard">dashboard homepage</a>.
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default memo(PageNotFound)
