// Dependencies
import React, { FC, createContext, useState, useEffect, ReactElement } from 'react'
import { useQuery } from '@apollo/client'

// Queries
import GET_APP_BY_ID_QUERY from '@graphql/apps/getAppById.query'

interface iAppContext {
  state: any
}

interface iProps {
  id: any
  children: ReactElement
}

export const AppContext = createContext<iAppContext>({
  state: {}
})

const AppProvider: FC<iProps> = ({ id, children }): ReactElement => {
  // States
  const [state, setState] = useState({})

  // Queries
  const { data: dataApp } = useQuery(GET_APP_BY_ID_QUERY, {
    variables: {
      id
    }
  })

  // Effects
  useEffect(() => {
    if (dataApp) {
      setState({
        getAppById: dataApp.getAppById
      })
    }
  }, [dataApp])

  const context = {
    state
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export default AppProvider
