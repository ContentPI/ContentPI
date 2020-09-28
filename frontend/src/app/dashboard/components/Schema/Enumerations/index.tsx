// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import { StyledEnumerations } from './Enumerations.styled'

interface iProps {
  data: any
  router: any
}

const Enumerations: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const { getEnumerationsByAppId } = data

  // First render
  if (!getEnumerationsByAppId) {
    return <div />
  }

  return (
    <>
      <MainLayout title="Enumerations" header content footer sidebar router={router}>
        <StyledEnumerations>
          <h2>Enumerations</h2>

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
