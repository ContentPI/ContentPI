// Dependencies
import React, { FC, createContext, ReactElement } from 'react'

// Configuration
import { isLocal } from '@config'

interface iContentContext {
  __: any
  t: any
  language: any
}

interface iProps {
  __: any
  language: any
  children: ReactElement
}

export const ContentContext = createContext<iContentContext>({
  __: {},
  t: () => null,
  language: ''
})

const ContentProvider: FC<iProps> = ({ __, language = 'en-US', children }): ReactElement => {
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
    language,
    t
  }

  return <ContentContext.Provider value={context}>{children}</ContentContext.Provider>
}

export default ContentProvider
