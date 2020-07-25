// Dependencies
import React, { FC, createContext, ReactElement } from 'react'
import { useCookies } from 'react-cookie'
import { getGraphQlError } from 'fogg-utils'
import { useMutation } from '@apollo/client'

// Mutations
import LOGIN_MUTATION from '@graphql/user/login.mutation'

// Interfaces
interface iUserContext {
  login(input: any): any
}

interface iProps {
  children: ReactElement
}

// Creating context
export const UserContext = createContext<iUserContext>({
  login: () => null
})

const UserProvider: FC<iProps> = ({ children }): ReactElement => {
  const [, setCookie] = useCookies()

  // Mutations
  const [loginMutation] = useMutation(LOGIN_MUTATION)

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
    login
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserProvider
