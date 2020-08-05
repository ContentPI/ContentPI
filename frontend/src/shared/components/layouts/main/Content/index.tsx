// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Components
import Header from '../Header'
import Footer from '../Footer'

// Styles
import styles from './Content.scss'

// Interfaces
interface iProps {
  header?: boolean
  footer?: boolean
  noWrapper?: boolean
  children: ReactElement
  router?: any
}

const Content: FC<iProps> = ({ children, header, footer, noWrapper }): ReactElement => (
  <section className={styles.content}>
    {header && <Header />}

    {!noWrapper && (
      <div className={styles.container}>
        <div className={styles.wrapper}>{children}</div>
      </div>
    )}

    {noWrapper && <div className={styles.container}>{children}</div>}

    {footer && <Footer />}
  </section>
)

export default memo(Content)
