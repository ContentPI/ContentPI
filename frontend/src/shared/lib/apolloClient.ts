// Dependencies
import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import fetch from 'isomorphic-fetch'

// Configuration
import config from '@config'

let apolloClient: any

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      fetch,
      uri: config.api.uri,
      credentials: config.api.credentials
    }),
    cache: new InMemoryCache()
  })
}

export function initializeApollo(initialState = null) {
  const client = apolloClient || createApolloClient()

  if (initialState) {
    client.cache.restore(initialState)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client
  }

  return client
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
