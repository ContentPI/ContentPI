// Dependencies
import React, { ReactElement } from 'react'
import { isBrowser } from 'fogg-utils'

// Contexts
import FormProvider from '@contexts/form'
import UserProvider from '@contexts/user'

// Components
import LoginLayout from '@app/users/components/Login/Layout'

const LoginPage = ({
  currentUrl = isBrowser() ? window.location.search.replace('?redirectTo=', '') : ''
}): ReactElement => {
  return (
    <UserProvider>
      <FormProvider>
        <LoginLayout currentUrl={currentUrl} />
      </FormProvider>
    </UserProvider>
  )
}

export default LoginPage
