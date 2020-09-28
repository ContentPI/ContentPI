// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Styles
import { StyledFooter } from './Footer.styled'

const Footer: FC = (): ReactElement => (
  <StyledFooter>
    <div className="content">
      <div className="copyright">&copy; {new Date().getFullYear()} ContentPI.com</div>

      <nav className="rightOptions">
        <ul>
          <li>
            <a href="#">Blog</a>
          </li>
          <li>
            <a href="#">Documentation</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  </StyledFooter>
)

export default memo(Footer)
