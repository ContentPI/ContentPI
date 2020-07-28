// Dependencies
import React, { ReactElement } from 'react'
import { useQuery } from '@apollo/client'

// Queries
import GET_APPS_QUERY from '@graphql/apps/getApps.query'

// Contexts
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'

// Components
import MyApps from '@app/dashboard/components/MyApps'

const Page = (): ReactElement => {
  const { data: dataGetApps, loading } = useQuery(GET_APPS_QUERY)

  if (loading) {
    return <div />
  }

  return (
    <UserProvider>
      <FormProvider>
        <MyApps dataGetApps={dataGetApps} />
      </FormProvider>
    </UserProvider>
  )
}

export default Page
