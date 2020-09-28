// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Components
import Breadcrumbs from '../Breadcrumbs'

// Styles
import { StyledHeader } from './Header.styled'

const Header: FC = (): ReactElement => (
  <StyledHeader>
    <Breadcrumbs />
  </StyledHeader>
)

export default memo(Header)
