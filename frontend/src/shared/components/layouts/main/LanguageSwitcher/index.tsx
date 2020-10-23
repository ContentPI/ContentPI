// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Select } from 'fogg-ui'
import { getSelectLanguages, getCurrentLanguage, redirectTo } from 'fogg-utils'

// Config
import config from '@config'

// Styles
import { StyledLanguageSwitcher } from './LanguageSwitcher.styled'

const currentLanguage = getCurrentLanguage()

const LanguageSwitcher: FC = (): ReactElement => (
  <StyledLanguageSwitcher>
    <Select
      top="160px"
      type="white"
      name="language"
      label="Select language"
      onClick={({ value }: { value: any }): void => {
        if (value && value !== currentLanguage) {
          redirectTo('_self', value)
        }
      }}
      options={getSelectLanguages(config.languages.list)}
    />
  </StyledLanguageSwitcher>
)

export default memo(LanguageSwitcher)
