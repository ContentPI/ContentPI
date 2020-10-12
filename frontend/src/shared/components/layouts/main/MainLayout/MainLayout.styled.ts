import { styled } from '@styles/theme'

interface StyledMainLayoutProps {
  noFlex?: boolean
}

export const StyledMainLayout = styled.div<StyledMainLayoutProps>`
  height: 100%;
  min-height: 100%;
  width: 100%;
  ${(props: any) =>
    !props.noFlex &&
    `
      display: flex;
      flex-direction: row;
  `}
`
