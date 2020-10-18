// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'

// Contexts
import { ContentContext } from '@contexts/content'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import { StyledPageNotFound } from './PageNotFound.styled'

interface iProps {
  noLayout?: boolean
}

const PageNotFound: FC<iProps> = ({ noLayout = false }): ReactElement => {
  // Contexts
  const { t } = useContext(ContentContext)

  // Characters
  const characters = ['boy', 'girl']
  const image = characters[Math.round(Math.random())]

  const Page404 = (
    <StyledPageNotFound className={image}>
      <img alt={t('Not Found')} src={`/images/characters/${image}.png`} />

      <div className="notFound">
        <h1>404</h1>

        <span>{t('Um, yeah. This is awkward')}.</span>

        <p>
          {t('We tried really hard, but couldn&apos;t find the page you were looking for.')}{' '}
          {t(
            'You may find what you were looking for on our',
            '<a href="/dashboard">dashboard homepage</a>'
          )}
          .
        </p>
      </div>
    </StyledPageNotFound>
  )

  if (noLayout) {
    return (
      <MainLayout title={t('Page not found')} noFlex>
        {Page404}
      </MainLayout>
    )
  }

  return (
    <MainLayout title={t('Page not found')} header content footer sidebar>
      {Page404}
    </MainLayout>
  )
}

export default memo(PageNotFound)
