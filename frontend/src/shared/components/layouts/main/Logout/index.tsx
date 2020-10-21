// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Icon } from 'fogg-ui'

// Constants
import { LOGOUT_LINK } from '@constants/links'

// Styles
import { StyledLogout } from './Logout.styled'

// Interface
interface iProps {
  router: any
}

const Logout: FC<iProps> = ({ router }): ReactElement => (
  <StyledLogout>
    <div className="logout">
      <a href={`${LOGOUT_LINK(router)}?redirectTo=/dashboard`} title="Logout">
        <Icon type="fas fa-power-off" />
      </a>
    </div>
  </StyledLogout>
)

export default memo(Logout)
