// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'
import Logo from '@layouts/main/Logo'
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

  return (
    <MainLayout title="My Apps">
      <StyledMyApps>
        <div className="header">
          <div className="logo">
            <Logo />
          </div>
        </div>

        <Cards items={dataGetApps.getApps} router={router} />
      </StyledMyApps>
    </MainLayout>
  )
}

export default memo(MyApps)
