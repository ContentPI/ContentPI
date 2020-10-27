import { styled, theme, device, add, isRtl } from '@styles/theme'

export const StyledSchema = styled.div`
  padding-left: 10px;

  .model {
    display: flex;
    align-items: center;

    h3 {
      margin-right: 10px;
    }

    .identifier {
      color: ${theme.colors.gray.frenchGray};
      margin-right: 10px;
    }

    .button {
      margin-right: 10px;
    }

    div {
      top: 160px;
      ${add('left: 205px;').if(!isRtl)}
      ${add('right: 205px;').if(isRtl)}
    }

    .name {
      color: ${theme.colors.gray.tuna};
      display: inline;
      font-size: ${theme.font.size.xLarge};
      font-weight: 500;
    }

    .editContent {
      a {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        color: ${theme.colors.blue.cerulean};
        font-size: 14px;
        border-radius: 0.25rem;

        &:hover {
          color: ${theme.colors.blue.pacificBlue};
          background-color: ${theme.colors.gray.gallery};
        }
      }
    }
  }

  .toggle {
    margin-top: 0px;
    margin-bottom: 20px;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;

    @media ${device.laptop} {
      flex-direction: column;
    }
  }
`
