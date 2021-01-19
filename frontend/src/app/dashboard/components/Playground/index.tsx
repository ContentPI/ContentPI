import React, { FC, ReactElement } from 'react'
import GraphiQL from 'graphiql'
import 'graphiql/graphiql.min.css'

import { styled } from '@styles/theme'

const PlaygroundWrapper = styled.div`
  width: 100%;
`

const Playground: FC = (): ReactElement => {
  return (
    <PlaygroundWrapper>
      <GraphiQL
        fetcher={async graphQLParams => {
          const data = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(graphQLParams),
            credentials: 'same-origin'
          })
          return data.json().catch(() => data.text())
        }}
      />
    </PlaygroundWrapper>
  )
}

export default Playground
