import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apolloClient'
import Head from 'next/head'

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const viewport = 'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no'

  return (
    <>
      <Head>
        <meta name="viewport" content={viewport} />
      </Head>

      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}
