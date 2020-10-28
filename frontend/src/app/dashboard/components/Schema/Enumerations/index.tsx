// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import { StyledEnumerations } from './Enumerations.styled'

interface iProps {
  data: any
  router: any
}

const Enumerations: FC<iProps> = ({ data, router }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  // Data
  const { getEnumerationsByAppId } = data

  // First render
  if (!getEnumerationsByAppId) {
    return <div />
  }

  return (
    <>
      <MainLayout title={t('Enumerations')} header content footer sidebar router={router}>
        <StyledEnumerations>
          <h2>{t('Enumerations')}</h2>

          <div className="wrapper">
            {getEnumerationsByAppId.map((enumeration: any) => {
              const values = JSON.parse(enumeration.values)

              return (
                <div key={enumeration.id} className="enumeration">
                  <div className="information">
                    <h3 className="name">{enumeration.enumerationName}</h3>{' '}
                    <span className="identifier">#{enumeration.identifier}</span>
                  </div>

                  <div className="values">
                    {values.map((value: any) => (
                      <span key={value.value} className="value">
                        {value.option}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </StyledEnumerations>
      </MainLayout>
    </>
  )
}

export default memo(Enumerations)
