// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import NextLink from 'next/link'
import { isString } from '@contentpi/utils'

// Interfaces
interface iProps {
  children: ReactElement | string
  href: string
  as?: string
  className?: string
  onClick?(): any
  title?: any
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const Link: FC<iProps> = ({
  href,
  as,
  children,
  className,
  onClick,
  title = undefined,
  target = undefined
}): ReactElement => {
  const linkProps = {
    onClick,
    className,
    target
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
      <a {...linkProps} title={title}>
        {children}
      </a>
    </NextLink>
  )
}

export default memo(Link)
