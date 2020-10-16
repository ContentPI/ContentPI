// Dependencies
import React, { FC, ReactElement } from 'react'
import { isBrowser } from 'fogg-utils'

// Contexts
import FormProvider from '@contexts/form'
import UserProvider from '@contexts/user'
import ContentProvider from '@contexts/content'

// Components
import LoginLayout from '@app/users/components/Login/Layout'

interface iProps {
  currentUrl: string
  __: any
}

const Page: FC<iProps> = ({
  currentUrl = isBrowser() ? window.location.search.replace('?redirectTo=', '') : '',
  __
}): ReactElement => (
  <ContentProvider __={__}>
    <UserProvider>
      <FormProvider>
        <LoginLayout currentUrl={currentUrl} />
      </FormProvider>
    </UserProvider>
  </ContentProvider>
)

export default Page
