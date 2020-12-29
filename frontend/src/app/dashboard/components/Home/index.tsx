// Dependencies
import React, { FC, ReactElement, useContext, memo } from 'react'
import { Icon, Steps, PrimaryButton } from '@contentpi/ui'

// Shared components
import Link from '@ui/Link'
import MainLayout from '@layouts/main/MainLayout'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Constants
import { SLACK_LINK } from '@constants/links'

// Styles
import { StyledHome } from './Home.styled'

// Interfaces
interface iProps {
  router: any
}

const Home: FC<iProps> = ({ router }): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

  const steps = [
    {
      step: t('Set up your schema'),
      description: t(
        'Define the schema of your content that will shape your editing interface and API.'
      ),
      done: true,
      href: '#'
    },
    {
      step: t('Create Content'),
      description: t('Use the intuitive editing interface to fill your project with content.'),
      done: false,
      href: '#'
    },
    {
      step: t('Make your API accesible'),
      description: t(
        'Open your API to the public or create secure tokens to access your API from the outside.'
      ),
      done: false,
      href: '#'
    },
    {
      step: t('Integrate your content into your applications'),
      description: t(
        'Learn how to fetch content with GraphQL, using the interactive API Playground.'
      ),
      done: false,
      href: '#'
    }
  ]

  return (
    <MainLayout title="Home" header content footer sidebar router={router}>
      <StyledHome>
        <div className="guide">
          <div className="watch">
            <h3>{t('Your quick start guide')}</h3>

            <a href="#">
              <Icon type="fas fa-play" /> {t('Watch tutorials')}
            </a>
          </div>

          <div className="steps">
            <Steps steps={steps} />
          </div>
        </div>

        <div className="invite">
          <div className="invite-wrapper">
            <h3>{t('Invite a coworker to your project')}</h3>
            <span>{t('Collaborate on content and build great digital products')}</span>
          </div>

          <div className="invite-colaborator">
            <PrimaryButton>{t('Invite colaborator')}</PrimaryButton>
          </div>
        </div>

        <div className="resources">
          <div className="box documentation">
            <h3>
              <Icon type="fas fa-book" /> {t('Documentation')}
            </h3>

            <p>{t('Explore our guides, API reference and code examples.')}</p>

            <p>
              <a href="#">
                <>
                  <Icon type="fas fa-external-link-alt" /> {t('View documentation')}
                </>
              </a>
            </p>
          </div>

          <div className="box examples">
            <h3>
              <Icon type="fas fa-code" /> {t('Examples')}
            </h3>

            <p>{t('Learn how to fetch content with your apps.')}</p>

            <p>
              <a href="#">
                <>
                  <Icon type="fas fa-external-link-alt" /> {t('Watch tutorials')}
                </>
              </a>
            </p>
          </div>

          <div className="box community">
            <h3>
              <Icon type="fab fa-slack" /> {t('Community')}
            </h3>

            <p>{t('Join our friendly community and get in touch with us.')}</p>

            <p>
              <Link href={SLACK_LINK()} target="_blank">
                <>
                  <Icon type="fas fa-external-link-alt" /> {t('Join on Slack')}
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
