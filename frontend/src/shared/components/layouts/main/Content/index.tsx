// Dependencies
import React, { FC, ReactElement, memo } from 'react'

// Components
import Header from '../Header'
import Footer from '../Footer'

// Styles
import { StyledContent } from './Content.styled'

// Interfaces
interface iProps {
  header?: boolean
  footer?: boolean
  noWrapper?: boolean
  children: ReactElement
  router?: any
}

const Content: FC<iProps> = ({ children, header, footer, noWrapper }): ReactElement => (
  <StyledContent>
    {header && <Header />}

    {!noWrapper && (
      <div className="container">
        <div className="wrapper">{children}</div>
      </div>
    )}

    {noWrapper && <div className="container">{children}</div>}

    {footer && <Footer />}
  </StyledContent>
)

export default memo(Content)
