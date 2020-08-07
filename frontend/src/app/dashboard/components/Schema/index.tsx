// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

interface iProps {
  data: any
  router: any
}

const Schema: FC<iProps> = ({ data, router }): ReactElement => {
  // Data
  const { getModel } = data
  console.log('getModel===', getModel)
  return (
    <MainLayout title="Schema" header content footer sidebar>
      <h1>Schema</h1>
    </MainLayout>
  )
}

export default memo(Schema)
