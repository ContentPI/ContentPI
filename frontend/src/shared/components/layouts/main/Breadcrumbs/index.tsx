// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Icon } from 'fogg-ui'

// Styles
import styles from './Breadcrumbs.scss'

const Breadcrumbs: FC = (): ReactElement => (
  <div className={styles.breadcrumbs}>
    <ul>
      <li>
        <Icon type="fas fa-home" />
      </li>
      <li>
        <span>/</span>
      </li>
      <li>
        <a href="#">Home</a>
      </li>
    </ul>
  </div>
)

export default memo(Breadcrumbs)
