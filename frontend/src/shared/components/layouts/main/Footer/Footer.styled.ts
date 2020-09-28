import { styled } from '@styles/theme'

export const StyledFooter = styled.footer`
  width: 97%;
  text-align: center;
  height: 54px;
  background-color: transparent;

  .content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $emperor;
    font-size: 14px;
    justify-content: space-between;

    ${props => props.theme.mixins.breakpoint.sm`
      flex-direction: column-reverse;
    `};

    .copyright {
      color: $black;
      margin-bottom: 10px;
    }

    .rightOptions {
      ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        margin: 0px;
        margin-top: -10px;
        padding: 0px;

        li {
          flex: auto;
          padding: 10px;

          a {
            color: ${props => props.theme.color.gray};
            text-decoration: none;
            letter-spacing: 0.5px;
            font-size: 14px;

            &:hover {
              color: ${props => props.theme.color.black};
            }
          }
        }
      }
    }
  }
`
