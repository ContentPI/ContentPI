// Dependencies
import React, { FC, createContext, ReactElement } from 'react'

// Configuration
import { isLocal } from '@config'

interface iI18nContext {
  __: any
  t: any
  language: any
}

interface iProps {
  __: any
  language: any
  children: ReactElement
}

export const I18nContext = createContext<iI18nContext>({
  __: {},
  t: () => null,
  language: ''
})

const I18nProvider: FC<iProps> = ({ __, language = 'en-US', children }): ReactElement => {
  const t = (key1: string, key2 = '', key3 = '') => {
    if (key2) {
      key1 += ` ${key2}`
    }

    if (key3) {
      key1 += key3 === '?' || key3 === '!' ? key3 : ` ${key3}`
    }

    if (isLocal() && !__[key1] && language !== 'en-US') {
      console.log(`"${key1}": "",`) // eslint-disable-line no-console
    }

    return __[key1] || key1
  }

  const context = {
    __,
    language,
    t
  }

  return <I18nContext.Provider value={context}>{children}</I18nContext.Provider>
}

export default I18nProvider
