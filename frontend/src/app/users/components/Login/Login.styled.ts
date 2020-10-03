import { styled } from '@styles/theme'

export const StyledLogin = styled.div`
  .wrapper {
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.colors.gray.mineShaft};
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 200px;
    overflow: hidden;
    position: relative;
    width: 500px;

    ${props => props.theme.mixins.breakpoint.sm`
      margin-top: 20px;
      width: 320px;
    `};

    .success {
      text-align: center;
    }

    .form {
      ${props => props.theme.mixins.placeholder(props.theme.colors.gray.silverChalice)}
      position: relative;
      margin: 0 auto;
      margin-top: 20px;
      width: 90%;

      .logo {
        margin-bottom: 20px;
      }

      .actions {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        .left {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 17px;
          width: 100%;

          .login {
            margin-right: 10px;
            width: 100px;

            ${props => props.theme.mixins.breakpoint.sm`
              margin-right: 5px;
            `}
          }

          .register {
            width: 100px;
          }
        }
      }
    }
  }
`
