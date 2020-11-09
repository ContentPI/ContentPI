// Dependencies
import React, { FC, ReactElement } from 'react'
import { isBrowser } from '@contentpi/utils'

// Contexts
import FormProvider from '@contexts/form'
import UserProvider from '@contexts/user'
import ContentProvider from '@contexts/i18n'

// Components
import LoginLayout from '@app/users/components/Login/Layout'

interface iProps {
  currentUrl: string
  __: any
  language: any
}

const Page: FC<iProps> = ({
  currentUrl = isBrowser() ? window.location.search.replace('?redirectTo=', '') : '',
  __,
  language
}): ReactElement => (
  <ContentProvider __={__} language={language}>
    <UserProvider>
      <FormProvider>
        <LoginLayout currentUrl={currentUrl} />
      </FormProvider>
    </UserProvider>
  </ContentProvider>
)

export default Page
