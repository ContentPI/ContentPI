import { styled } from '@styles/theme'

export const StyledAppIcon = styled.div`
  .icon {
    color: ${props => props.theme.color.white};
    border-radius: 5px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    text-transform: capitalize;
    font-size: ${props => props.theme.font.size.large};
    font-weight: ${props => props.theme.font.weight.bold};

    i {
      font-size: 54px;
      color: ${props => props.theme.colors.blue.denim};
      padding: 8px;
    }

    .iconName {
      margin: 20px;
      text-transform: capitalize;
    }
  }
`
