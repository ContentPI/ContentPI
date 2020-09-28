import { styled } from '@styles/theme'

export const StyledSchema = styled.div`
  padding-left: 10px;

  .model {
    display: flex;
    align-items: center;

    h3 {
      margin-right: 10px;
    }

    .identifier {
      color: ${props => props.theme.colors.gray.frenchGray};
      margin-right: 10px;
    }

    .button {
      margin-right: 10px;
    }

    div {
      top: 160px;
      left: 205px;
    }

    .name {
      color: $tuna;
      display: inline;
      font-size: ${props => props.theme.font.size.xLarge};
      font-weight: 500;
    }

    .editContent {
      a {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        color: $cerulean;
        font-size: 14px;
        border-radius: 0.25rem;

        &:hover {
          color: ${props => props.theme.colors.blue.pacificBlue};
          background-color: ${props => props.theme.colors.gray.gallery};
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

    @include tablet {
      flex-direction: column;
    }
  }
`
