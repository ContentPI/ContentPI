// Dependencies
import React, { ReactElement, memo } from 'react'

// Components
import Link from '@ui/Link'

// Styles
import { StyledLogo } from './Logo.styled'

const Logo = (): ReactElement => {
  return (
    <StyledLogo>
      <Link href="/dashboard" as="/dashboard">
        <img alt="Logo" src="/images/logo.png" />
      </Link>
    </StyledLogo>
  )
}

export default memo(Logo)
