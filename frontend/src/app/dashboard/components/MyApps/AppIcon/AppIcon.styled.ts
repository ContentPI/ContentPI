import { styled, theme } from '@styles/theme'

export const StyledAppIcon = styled.div`
  .icon {
    color: ${theme.color.white};
    border-radius: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    text-transform: capitalize;
    font-size: ${theme.font.size.large};
    font-weight: ${theme.font.weight.bold};
    margin: 0 auto;

    i {
      font-size: 54px;
      color: ${theme.colors.blue.denim};
      padding: 8px;
    }

    .iconName {
      margin: 20px;
      text-transform: capitalize;
    }
  }
`
