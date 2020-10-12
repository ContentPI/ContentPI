// Dependencies
import React, { FC, ReactElement, memo, useContext } from 'react'

// Contexts
import { UserContext } from '@contexts/user'

// Components
import MainLayout from '@layouts/main/MainLayout'
import Login from './Login'

// Interfaces
interface iProps {
  currentUrl: string
}

const Layout: FC<iProps> = ({ currentUrl }): ReactElement => {
  const { login } = useContext(UserContext)

  return (
    <MainLayout title="Login" noFlex>
      <Login login={login} currentUrl={currentUrl} />
    </MainLayout>
  )
}

export default memo(Layout)
