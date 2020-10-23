// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Select } from 'fogg-ui'
import { getSelectLanguages, getCurrentLanguage, redirectTo } from 'fogg-utils'

// Config
import config from '@config'

// Styles
import { StyledSwitchLanguage } from './SwitchLanguage.styled'

const currentLanguage = getCurrentLanguage()

const SwitchLanguage: FC = (): ReactElement => (
  <StyledSwitchLanguage>
    <Select
      top="160px"
      type="white"
      name="language"
      label="Select language"
      onClick={({ option, value }: { option: string; value: any }): void => {
        if (value && value !== currentLanguage) {
          redirectTo(`/${value}/dashboard`)
        }
      }}
      options={getSelectLanguages(config.languages.list)}
    />
  </StyledSwitchLanguage>
)

export default memo(SwitchLanguage)
