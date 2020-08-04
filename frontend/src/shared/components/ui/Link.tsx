// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import NextLink from 'next/link'
import { isString } from 'fogg-utils'

// Interfaces
interface iProps {
  children: ReactElement
  href: string
  as?: string
  className?: string
  onClick?(): any
  title?: any
}

const Link: FC<iProps> = ({ href, as, children, className, onClick, title }): ReactElement => {
  const linkProps = {
    onClick,
    className
  }

  const props: any = {
    href
  }

  if (as) {
    props.as = as
  }

  if (isString(children)) {
    title = children
  }

  return (
    <NextLink {...props}>
      <a {...linkProps} title={title || ''}>
        {children}
      </a>
    </NextLink>
  )
}

export default memo(Link)
