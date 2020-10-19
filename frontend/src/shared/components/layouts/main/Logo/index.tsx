// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Styles
import { StyledLogo } from './Logo.styled'

interface iProps {
  language?: string
}

const Logo: FC<iProps> = ({ language = 'en-US' }): ReactElement => {
  return (
    <StyledLogo>
      <a href={`/${language}/dashboard`}>
        <img alt="Logo" src="/images/logo.png" />
      </a>
    </StyledLogo>
  )
}

export default memo(Logo)
