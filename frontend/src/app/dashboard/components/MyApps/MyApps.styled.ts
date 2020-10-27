import { styled, theme } from '@styles/theme'

export const StyledMyApps = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 70vh;
  width: 100%;

  .header {
    border-bottom: 1px solid ${theme.colors.gray.athensGray};
    width: 100%;
    height: 70px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 35%,
      rgba(0, 212, 255, 1) 100%
    );

    .logo {
      margin: 0 auto;
      padding-top: 9px;

      img {
        width: 50px;
        height: 50px;
      }
    }
  }

  .flexFooter {
    display: flex;
    margin-top: 350px;
  }
`
