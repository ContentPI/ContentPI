import React, { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'
import { Playground as GraphqlPlayground, store } from 'graphql-playground-react'

import { styled } from '@styles/theme'

const PlaygroundWrapper = styled.div`
  width: calc(100vw - 75px);

  & button {
    border: none !important;
  }
`

const Playground: FC = (): ReactElement => {
  return (
    <PlaygroundWrapper>
      <Provider store={store}>
        <GraphqlPlayground endpoint="http://localhost:5000/graphql" />
      </Provider>
    </PlaygroundWrapper>
  )
}

export default Playground
