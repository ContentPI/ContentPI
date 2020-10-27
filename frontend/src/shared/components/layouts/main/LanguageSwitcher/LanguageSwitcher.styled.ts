import { styled, isRtl, add } from '@styles/theme'

export const StyledLanguageSwitcher = styled.div`
  margin-left: 20px;
  ${add('margin-right: 20px;').if(isRtl)}
`
