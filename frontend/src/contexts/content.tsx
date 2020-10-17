// Dependencies
import React, { FC, createContext, ReactElement } from 'react'

// Configuration
import { isLocal } from '@config'

interface iContentContext {
  __: any
  t: any
}

interface iProps {
  __: any
  children: ReactElement
}

export const ContentContext = createContext<iContentContext>({
  __: {},
  t: () => null
})

const ContentProvider: FC<iProps> = ({ __, children }): ReactElement => {
  const t = (key: string) => {
    if (isLocal() && !__[key]) {
      console.log(`"${key}": ""`) // eslint-disable-line no-console
    }

    return __[key] || key
  }

  const context = {
    __,
    t
  }

  return <ContentContext.Provider value={context}>{children}</ContentContext.Provider>
}

export default ContentProvider
