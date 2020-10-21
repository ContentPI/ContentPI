// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'

// Contexts
import { ContentContext } from '@contexts/content'

// Styles
import { StyledFooter } from './Footer.styled'

const Footer: FC = (): ReactElement => {
  // Contexts
  const { t } = useContext(ContentContext)

  return (
    <StyledFooter>
      <div className="content">
        <div className="copyright">&copy; {new Date().getFullYear()} ContentPI.com</div>

        <nav className="rightOptions">
          <ul>
            <li>
              <a href="#">{t('Blog')}</a>
            </li>
            <li>
              <a href="#">{t('Documentation')}</a>
            </li>
            <li>
              <a href="#">{t('Contact')}</a>
            </li>
          </ul>
        </nav>
      </div>
    </StyledFooter>
  )
}

export default memo(Footer)
