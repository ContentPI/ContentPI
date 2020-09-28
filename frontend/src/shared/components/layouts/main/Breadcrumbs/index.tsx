// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Icon } from 'fogg-ui'

// Styles
import { StyledBreadcrumbs } from './Breadcrumbs.styled'

const Breadcrumbs: FC = (): ReactElement => (
  <StyledBreadcrumbs>
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
  </StyledBreadcrumbs>
)

export default memo(Breadcrumbs)
