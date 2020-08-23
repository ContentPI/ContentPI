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
import Content from '@dashboard/components/Content'
import CreateOrEditEntry from '@dashboard/components/Content/CreateOrEditEntry'
import PageNotFound from '@dashboard/components/PageNotFound'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'
import GET_DECLARATIONS_QUERY from '@graphql/declarations/getDeclarations.query'
import GET_VALUES_BY_ENTRY_QUERY from '@graphql/values/getValuesByEntry.query'

const Page: FC = (): ReactElement => {
  // Router
  const router = useRouter()
  const { appId, section, moduleName, model, entryId } = router.query

  // Executing Queries
  const { data: getModelQueryData } = useQuery(GET_MODEL_QUERY, {
    variables: {
      identifier: model,
      appId
    },
    skip: section !== 'model'
  })

  const { data: getDeclarationsQueryData } = useQuery(GET_DECLARATIONS_QUERY)

  const { data: dataValues } = useQuery(GET_VALUES_BY_ENTRY_QUERY, {
    variables: {
      entry: entryId
    },
    skip: !entryId
  })

  // Blocking render if dataValues is not ready
  if (entryId && !dataValues) {
    return <div />
  }

  if (!getModelQueryData) {
    return <div />
  }

  // Pages components
  const Pages: any = {
    content: Content,
    create: CreateOrEditEntry,
    edit: CreateOrEditEntry,
    schema: Schema
  }

  const renderPage = (page: any) => {
    if (Pages[page]) {
      return createElement(Pages[page], {
        router: router.query,
        data: {
          entryId,
          section,
          ...getModelQueryData,
          ...getDeclarationsQueryData,
          ...dataValues
        }
      })
    }

    return <PageNotFound />
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
