// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Icon } from 'fogg-ui'

// Components
import AppIcon from '../AppIcon'

// Styles
import styles from './Cards.scss'

// Interfaces
interface iProps {
  items: any[]
}

const Cards: FC<iProps> = ({ items }): ReactElement => {
  return (
    <>
      <section className={styles.cards}>
        <h1>My Apps</h1>

        <ul>
          {items.map(app => {
            return (
              <li key={app.id}>
                <section className={styles.card} title={app.description}>
                  <AppIcon app={app} />
                </section>
              </li>
            )
          })}

          <li>
            <section className={styles.card}>
              <section className={styles.app}>
                <Icon type="fas fa-plus" />
              </section>

              <span className={styles.createNewApp}>Create New App</span>
            </section>
          </li>
        </ul>
      </section>
    </>
  )
}

export default memo(Cards)
