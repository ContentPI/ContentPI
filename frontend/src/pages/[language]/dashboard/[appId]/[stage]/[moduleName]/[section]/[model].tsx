// Dependencies
import React, { FC, ReactElement, createElement } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

// Contexts
import AppProvider from '@contexts/app'
import UserProvider from '@contexts/user'
import FormProvider from '@contexts/form'
import ContentProvider from '@contexts/i18n'

// Components
import Schema from '@dashboard/components/Schema'
import Content from '@dashboard/components/Content'
import CreateOrEditEntry from '@dashboard/components/Content/CreateOrEditEntry'
import PageNotFound from '@dashboard/components/PageNotFound'

// Queries
import GET_MODEL_QUERY from '@graphql/models/getModel.query'
import GET_DECLARATIONS_QUERY from '@graphql/declarations/getDeclarations.query'
import GET_VALUES_BY_ENTRY_QUERY from '@graphql/values/getValuesByEntry.query'
import GET_ENUMERATIONS_BY_APP_ID_QUERY from '@graphql/enumerations/getEnumerationsByAppId.query'
import GET_ENTRIES_BY_MODEL_ID_QUERY from '@graphql/values/getEntriesByModelId.query'
import GET_I18N_QUERY from '@graphql/i18n/getI18n.query'

interface iProps {
  __: any
}

const Page: FC<iProps> = ({ __ }): ReactElement => {
  // Router
  const router = useRouter()
  const { appId, section, moduleName, model, entryId, language } = router.query
  let modelId = null
  let entries: any = []

  // Executing Queries
  const { data: getModelQueryData } = useQuery(GET_MODEL_QUERY, {
    variables: {
      identifier: model,
      appId
    },
    skip: section !== 'model' || model === 'i18n'
  })

  const { data: getDeclarationsQueryData } = useQuery(GET_DECLARATIONS_QUERY, {
    skip: model === 'i18n'
  })

  const { data: getValuesByEntryQueryData } = useQuery(GET_VALUES_BY_ENTRY_QUERY, {
    variables: {
      entry: entryId
    },
    skip: !entryId || model === 'i18n'
  })

  const { data: getEnumerationsByAppIdQueryData } = useQuery(GET_ENUMERATIONS_BY_APP_ID_QUERY, {
    variables: {
      appId
    },
    skip: !appId || model === 'i18n'
  })

  const { data: getI18nQueryData } = useQuery(GET_I18N_QUERY, {
    skip: model !== 'i18n'
  })

  if (getModelQueryData) {
    modelId = getModelQueryData.getModel.id
  }

  const { data: getEntriesByModelIdQueryData } = useQuery(GET_ENTRIES_BY_MODEL_ID_QUERY, {
    variables: {
      modelId
    },
    skip: !modelId || model === 'i18n'
  })

  // Blocking render if dataValues is not ready
  if (entryId && !getValuesByEntryQueryData) {
    return <div />
  }

  if (model !== 'i18n' && section === 'model' && !getModelQueryData) {
    return <div />
  }

  if (model !== 'i18n' && !getEnumerationsByAppIdQueryData) {
    return <div />
  }

  if (getEntriesByModelIdQueryData) {
    entries = JSON.parse(getEntriesByModelIdQueryData.getEntriesByModelId.entries)
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
          entries,
          ...getI18nQueryData,
          ...getModelQueryData,
          ...getDeclarationsQueryData,
          ...getValuesByEntryQueryData,
          ...getEnumerationsByAppIdQueryData
        }
      })
    }

    return <PageNotFound />
  }

  return (
    <ContentProvider __={__} language={language}>
      <UserProvider>
        <AppProvider id={appId}>
          <FormProvider>{renderPage(moduleName)}</FormProvider>
        </AppProvider>
      </UserProvider>
    </ContentProvider>
  )
}

export default Page
