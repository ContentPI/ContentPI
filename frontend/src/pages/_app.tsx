// Dependencies
import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apolloClient'
import Head from 'next/head'
import fetch from 'isomorphic-fetch'
import { LocalStorage } from 'node-localstorage'

// Configuration
import config from '@config'

// Components
import PageNotFound from '@dashboard/components/PageNotFound'

function App({
  Component,
  pageProps,
  __,
  error
}: {
  Component: any
  pageProps: any
  __: any
  error: boolean
}) {
  const apolloClient = useApollo((pageProps && pageProps.initialApolloState) || {})
  const viewport = 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'

  if (error) {
    return <PageNotFound noLayout />
  }

  return (
    <>
      <Head>
        <meta name="viewport" content={viewport} />
      </Head>

      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} __={__} />
      </ApolloProvider>
    </>
  )
}

App.getInitialProps = async ({ router }: { router: any }) => {
  let localStorage

  if (!localStorage) {
    localStorage = new LocalStorage('./content')
  }

  const { language = config.languages.default } = router.query
  let __ = {}
  let error = false

  if (language !== 'en-US' && config.languages.list.includes(language)) {
    if (!localStorage.getItem(language)) {
      // Fetching language content
      try {
        const response = await fetch(`${config.baseUrl}/content/${language}.json`)
        __ = await response.json()

        if (config.cache.enable) {
          localStorage.setItem(language, JSON.stringify(__))
        }
      } catch {
        error = true
      }
    } else {
      // Retrieving content from cache
      __ = JSON.parse(localStorage.getItem(language) || '')
    }
  } else {
    error = language !== 'en-US'
  }

  return {
    __,
    error,
    language
  }
}

export default App
