// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Icon, Steps, PrimaryButton } from '@contentpi/ui'

// Shared components
import Link from '@ui/Link'
import MainLayout from '@layouts/main/MainLayout'

// Constants
import { SLACK_LINK } from '@constants/links'

// Styles
import { StyledHome } from './Home.styled'

// Interfaces
interface iProps {
  router: any
}

const Home: FC<iProps> = ({ router }): ReactElement => {
  const steps = [
    {
      step: 'Set up your schema',
      description:
        'Define the schema of your content that will shape your editing interface and API.',
      done: true,
      href: '#'
    },
    {
      step: 'Create Content',
      description: 'Use the intuitive editing interface to fill your project with content.',
      done: false,
      href: '#'
    },
    {
      step: 'Make your API accesible',
      description:
        'Open your API to the public or create secure tokens to access your API from the outside.',
      done: false,
      href: '#'
    },
    {
      step: 'Integrate your content into your applications',
      description: 'Learn how to fetch content with GraphQL, using the interactive API Playground.',
      done: false,
      href: '#'
    }
  ]

  return (
    <MainLayout title="Home" header content footer sidebar router={router}>
      <StyledHome>
        <div className="guide">
          <div className="watch">
            <h3>Your quick start guide</h3>
            <a href="">
              <Icon type="fas fa-play" /> Watch tutorials
            </a>
          </div>

          <div className="steps">
            <Steps steps={steps} />
          </div>
        </div>

        <div className="invite">
          <div className="invite-wrapper">
            <h3>Invite a coworker to your project</h3>
            <span>Collaborate on content and build great digital products</span>
          </div>
          <div className="invite-colaborator">
            <PrimaryButton>Invite colaborator</PrimaryButton>
          </div>
        </div>

        <div className="resources">
          <div className="box documentation">
            <h3>
              <Icon type="fas fa-book" /> Documentation
            </h3>
            <p>Explore our guides, API reference and code examples.</p>
            <p>
              <Link href="#">
                <>
                  <Icon type="fas fa-external-link-alt" /> View documentation
                </>
              </Link>
            </p>
          </div>

          <div className="box examples">
            <h3>
              <Icon type="fas fa-code" /> Examples
            </h3>
            <p>Learn how to fetch content with your apps.</p>
            <p>
              <Link href="#">
                <>
                  <Icon type="fas fa-external-link-alt" /> Watch tutorials
                </>
              </Link>
            </p>
          </div>

          <div className="box community">
            <h3>
              <Icon type="fab fa-slack" /> Community
            </h3>
            <p>Join our friendly community and get in touch with us.</p>
            <p>
              <Link href={SLACK_LINK()} target="_blank">
                <>
                  <Icon type="fas fa-external-link-alt" /> Join on Slack
                </>
              </Link>
            </p>
          </div>
        </div>
      </StyledHome>
    </MainLayout>
  )
}

export default memo(Home)
