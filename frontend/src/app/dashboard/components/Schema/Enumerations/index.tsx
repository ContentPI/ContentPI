// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import styles from './Enumerations.scss'

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
        <div className={styles.enumerations}>
          <h2>Enumerations</h2>

          <div className={styles.wrapper}>
            {getEnumerationsByAppId.map((enumeration: any) => {
              const values = JSON.parse(enumeration.values)

              return (
                <div key={enumeration.id} className={styles.enumeration}>
                  <div className={styles.information}>
                    <h3 className={styles.name}>{enumeration.enumerationName}</h3>{' '}
                    <span className={styles.identifier}>#{enumeration.identifier}</span>
                  </div>

                  <div className={styles.values}>
                    {values.map((value: any) => (
                      <span key={value.value} className={styles.value}>
                        {value.option}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default memo(Enumerations)
