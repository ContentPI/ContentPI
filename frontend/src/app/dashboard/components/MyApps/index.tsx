// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'

// Contexts
import { ContentContext } from '@contexts/content'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Logo from '@layouts/main/Logo'
import Logout from '@layouts/main/Logout'
import LanguageSwitcher from '@layouts/main/LanguageSwitcher'
import Cards from './Cards'

// Styles
import { StyledMyApps } from './MyApps.styled'

interface iProps {
  dataGetApps: any
  router: any
}

const MyApps: FC<iProps> = ({ dataGetApps, router }): ReactElement => {
  // First render
  if (!dataGetApps.getApps) {
    return <div />
  }

  // Contexts
  const { t } = useContext(ContentContext)

  return (
    <MainLayout title={t('My Apps')}>
      <StyledMyApps>
        <div className="header">
          <div className="logo">
            <Logo />
          </div>
        </div>

        <Cards items={dataGetApps.getApps} router={router} />

        <div className="flexFooter">
          <LanguageSwitcher />
          <Logout router={router} />
        </div>
      </StyledMyApps>
    </MainLayout>
  )
}

export default memo(MyApps)
