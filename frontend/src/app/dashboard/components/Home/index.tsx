// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Interfaces
interface iProps {
  router: any
}

const Home: FC<iProps> = ({ router }): ReactElement => {
  return (
    <MainLayout title="Home" header content footer sidebar router={router}>
      <h1>Home</h1>
    </MainLayout>
  )
}

export default memo(Home)
