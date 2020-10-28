// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Select } from 'fogg-ui'
import { getSelectLanguages, getCurrentLanguage, redirectTo } from 'fogg-utils'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Config
import config from '@config'

// Styles
import { StyledLanguageSwitcher } from './LanguageSwitcher.styled'

const LanguageSwitcher: FC = (): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  const currentLanguage = getCurrentLanguage()
  const options = getSelectLanguages(config.languages.list)

  return (
    <StyledLanguageSwitcher>
      <Select
        top="160px"
        type="white"
        name="language"
        label={t('Select language')}
        onClick={({ value }: { value: any }): void => {
          if (value && value !== currentLanguage) {
            redirectTo('_self', value)
          }
        }}
        options={options}
      />
    </StyledLanguageSwitcher>
  )
}

export default memo(LanguageSwitcher)
