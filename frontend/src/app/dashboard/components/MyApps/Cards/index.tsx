// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'
import { Icon } from 'fogg-ui'

// Constants
import { STAGE_LINK } from '@constants/links'

// Components
import Link from '@ui/Link'
import CreateAppModal from '@modals/CreateAppModal'
import AppIcon from '../AppIcon'

// Styles
import { StyledCards } from './Cards.styled'

// Interfaces
interface iProps {
  items: any[]
  router: any
}

const Cards: FC<iProps> = ({ items, router }): ReactElement => {
  // Local state
  const [isOpen, setIsOpen] = useState(false)

  // Method to open modal
  const handleModal = (): void => setIsOpen(!isOpen)

  return (
    <>
      <CreateAppModal
        label="Create new App"
        isOpen={isOpen}
        onClose={handleModal}
        options={{
          position: 'center',
          width: '400px'
        }}
      />

      <StyledCards>
        <h1>My Apps</h1>

        <ul>
          {items.map(app => {
            router.appId = app.id

            return (
              <li key={app.id}>
                <Link href={STAGE_LINK(router).href} as={STAGE_LINK(router).as}>
                  <section className="card" title={app.description}>
                    <AppIcon app={app} />
                  </section>
                </Link>
              </li>
            )
          })}

          <li>
            <section className="card" onClick={handleModal}>
              <section className="app">
                <Icon type="fas fa-plus" />
              </section>

              <span className="createNewApp">Create New App</span>
            </section>
          </li>
        </ul>
      </StyledCards>
    </>
  )
}

export default memo(Cards)
