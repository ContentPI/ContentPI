// Dependencies
import React, { FC, ReactElement } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import ContentProvider from '@contexts/i18n'

interface iProps {
  __: any
}

const Playground = dynamic(
  () => {
    return import('@dashboard/components/Playground')
  },
  { ssr: false }
)

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
          <MainLayout title="Playground" sidebar router={router.query}>
            <Playground />
          </MainLayout>
        </AppProvider>
      </UserProvider>
    </ContentProvider>
  )
}

export default Page
