import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '@lib/apolloClient'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from '@styles/theme'

export default function App({ Component, pageProps }: { Component: any; pageProps: any }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <GlobalStyle />

      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}
