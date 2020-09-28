// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Styles
import { StyledAppIcon } from './AppIcon.styled'

// Interfaces
interface iProps {
  app: any
  hideName?: boolean
}

const AppIcon: FC<iProps> = ({ app, hideName }): ReactElement => {
  return (
    <StyledAppIcon>
      <div className="icon" style={{ backgroundColor: app.icon }} title={app.appName}>
        {app.appName.substring(0, 2)}
      </div>

      {!hideName && <span className="iconName">{app.appName}</span>}
    </StyledAppIcon>
  )
}

export default memo(AppIcon)
