import { styled, theme, isRtl } from '@styles/theme'

export const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  padding-top: 50px;
  margin: 0 auto;
  width: 98%;

  h1 {
    padding: 0px;
    margin: 0px;
    text-align: ${isRtl ? 'right' : 'left'};
    width: 96%;
    margin: 0 auto;
  }

  ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    li {
      a {
        color: ${theme.color.black};

        &:hover {
          color: ${theme.colors.blue.denim};
        }
      }

      .card {
        width: 210px;
        height: 260px;
        box-shadow: ${theme.colors.gray.alto} 0px 2px 4px;
        border-color: ${theme.color.white};
        border-radius: 4px;
        margin: 70px 50px 50px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;

        &:hover {
          cursor: pointer;
        }

        .createNewApp {
          margin: 20px;
          text-transform: capitalize;
        }

        .app {
          border-radius: 5px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          color: ${theme.color.white};
          text-transform: uppercase;
          font-size: 18px;
          font-weight: 600;

          i {
            font-size: 54px;
            color: ${theme.colors.blue.denim};
            padding: 8px;
          }
        }
      }
    }
  }
`
