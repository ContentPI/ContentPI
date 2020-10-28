// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Components
import LanguageSwitcher from '@layouts/main/LanguageSwitcher'

// Styles
import { StyledFooter } from './Footer.styled'

const Footer: FC = (): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  return (
    <StyledFooter>
      <div className="content">
        <LanguageSwitcher />

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
