// Dependencies
import React, { FC, ReactElement } from 'react'
import { useQuery } from '@apollo/client'

// Queries
import GET_APPS_QUERY from '@graphql/apps/getApps.query'

// Contexts
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'
import ContentProvider from '@contexts/content'

// Components
import MyApps from '@app/dashboard/components/MyApps'

interface iProps {
  __: any
  language: string
}

const Page: FC<iProps> = ({ __, language }): ReactElement => {
  const { data: dataGetApps, loading } = useQuery(GET_APPS_QUERY)

  if (loading) {
    return <div />
  }

  // Router
  const router = {
    appId: dataGetApps.getApps.length > 0 ? dataGetApps.getApps[0].id : null,
    stage: 'master',
    language
  }

  return (
    <ContentProvider __={__} language={language}>
      <UserProvider>
        <FormProvider>
          <MyApps dataGetApps={dataGetApps} router={router} />
        </FormProvider>
      </UserProvider>
    </ContentProvider>
  )
}

export default Page
