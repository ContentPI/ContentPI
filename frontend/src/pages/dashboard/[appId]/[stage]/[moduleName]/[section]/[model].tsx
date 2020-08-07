// Dependencies
import React, { FC, ReactElement, createElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'

// Components
import Schema from '@dashboard/components/Schema'
import PageNotFound from '@dashboard/components/PageNotFound'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'

const Page: FC = (): ReactElement => {
  // Router
  const router = useRouter()
  const { appId, section, moduleName, model } = router.query
  let dataModel: any = null

  // Executing Queries
  if (section === 'model') {
    const response = useQuery(GET_MODEL_QUERY, {
      variables: {
        identifier: model,
        appId
      }
    })

    dataModel = response.data
  }

  // Pages components
  const Pages: any = {
    schema: Schema
  }

  const renderPage = (page: any) => {
    if (Pages[page]) {
      return createElement(Pages[page], {
        router: router.query,
        data: {
          section,
          ...dataModel
        }
      })
    } else {
      return <PageNotFound />
    }
  }

  return (
    <UserProvider>
      <AppProvider id={appId}>
        <FormProvider>{renderPage(moduleName)}</FormProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default Page
