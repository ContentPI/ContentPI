// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Icon } from '@contentpi/ui'

// Shared components
import MainLayout from '@layouts/main/MainLayout'

// Styles
import { StyledHome } from './Home.styled'

// Interfaces
interface iProps {
  router: any
}

const Home: FC<iProps> = ({ router }): ReactElement => {
  return (
    <MainLayout title="Home" header content footer sidebar router={router}>
      <StyledHome>
        <div className="watch">
          <h3>Your quick start guide</h3>
          <a href="">
            <Icon type="fas fa-play" /> Watch tutorials
          </a>
        </div>

        <ul className="StepProgress">
          <li className="StepProgress-item is-done">
            <strong>Set up your schema</strong>
            <span>
              Define the schema of your content that will shape your editing interface and API.
            </span>
          </li>
          <li className="StepProgress-item is-done">
            <strong>Create Content</strong>
            <span>Use the intuitive editing interface to fill your project with content.</span>
          </li>
          <li className="StepProgress-item is-done">
            <strong>Make your API accesible</strong>
            <span>
              Open your API to the public or create secure tokens to access your API from the
              outside.
            </span>
          </li>
          <li className="StepProgress-item is-done last">
            <strong>Integrate your content into your applications</strong>
            <span>
              Learn how to fetch content with GraphQL, using the interactive API Playground.
            </span>
          </li>
        </ul>
      </StyledHome>
    </MainLayout>
  )
}

export default memo(Home)
