// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

const Home: FC = (): ReactElement => {
  return (
    <MainLayout title="Home" header content footer sidebar>
      <h1>Home</h1>
    </MainLayout>
  )
}

export default memo(Home)
