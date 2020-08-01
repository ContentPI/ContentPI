// Dependencies
import React, { FC, createContext, ReactElement, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { getGraphQlError, redirectTo, getDebug } from 'fogg-utils'
import { useQuery, useMutation } from '@apollo/client'

// Mutations
import LOGIN_MUTATION from '@graphql/user/login.mutation'

// Queries
import GET_USER_DATA_QUERY from '@graphql/user/getUserData.query'

// Interfaces
interface iUserContext {
  login(input: any): any
  user: any
}

interface iProps {
  children: ReactElement
}

// Creating context
export const UserContext = createContext<iUserContext>({
  login: () => null,
  user: null
})

const UserProvider: FC<iProps> = ({ children }): ReactElement => {
  const [cookies, setCookie] = useCookies()
  const [user, setUser] = useState(null)

  // Mutations
  const [loginMutation] = useMutation(LOGIN_MUTATION)

  // Queries
  const { data: dataUser } = useQuery(GET_USER_DATA_QUERY, {
    variables: {
      at: cookies.at || ''
    }
  })

  // Effects
  useEffect(() => {
    if (dataUser) {
      const debug = getDebug(dataUser.getUserData)

      if (!dataUser.getUserData.id && debug.hasCookie) {
        redirectTo('/logout?redirectTo=/dashboard')
      } else {
        setUser(dataUser.getUserData)
      }
    }
  }, [dataUser])

  async function login(input: { email: string; password: string }): Promise<any> {
    try {
      const { data: dataLogin } = await loginMutation({
        variables: {
          email: input.email,
          password: input.password
        }
      })

      if (dataLogin) {
        setCookie('at', dataLogin.login.token, { path: '/' })

        return dataLogin.login.token
      }
    } catch (err) {
      return getGraphQlError(err)
    }
  }

  const context = {
    login,
    user
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider
