// Dependencies
import React, { FC, ReactElement } from 'react'
import { useRouter } from 'next/router'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'
import ContentProvider from '@contexts/i18n'

// Components
import Home from '@dashboard/components/Home'

interface iProps {
  __: any
}

const Page: FC<iProps> = ({ __ }): ReactElement => {
  const router = useRouter()
  const { appId, language } = router.query

  if (!appId) {
    return <div />
  }

  return (
    <ContentProvider __={__} language={language}>
      <UserProvider>
        <AppProvider id={appId}>
          <FormProvider>
            <Home router={router.query} />
          </FormProvider>
        </AppProvider>
      </UserProvider>
    </ContentProvider>
  )
}

export default Page
