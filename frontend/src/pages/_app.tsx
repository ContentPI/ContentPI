import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apolloClient'

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
