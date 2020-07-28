// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import Head from 'next/head'

// Styles
import styles from './MainLayout.scss'

// Interface
interface iProps {
  children: ReactElement
  title?: string
}

const MainLayout: FC<iProps> = ({ children, title }): ReactElement => {
  return (
    <>
      <Head>
        <title>Dashboard {title ? `- ${title}` : ''}</title>
        <meta name="title" content={`Dashboard ${title ? `- ${title}` : ''}`} />
      </Head>

      <div className={styles.mainLayout}>{children}</div>
    </>
  )
}

export default memo(MainLayout)
