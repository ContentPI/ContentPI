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
  const t = (key1: string, key2 = '', key3 = '') => {
    if (key2) {
      key1 += ` ${key2}`
    }

    if (key3) {
      key1 += key3 === '?' || key3 === '!' ? key3 : ` ${key3}`
    }

    if (isLocal() && !__[key1]) {
      console.log(`"${key1}": "",`) // eslint-disable-line no-console
    }

    return __[key1] || key1
  }

  const context = {
    __,
    t
  }

  return <ContentContext.Provider value={context}>{children}</ContentContext.Provider>
}

export default ContentProvider
