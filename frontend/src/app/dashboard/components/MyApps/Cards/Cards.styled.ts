import { styled } from '@styles/theme'

export const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  padding-top: 50px;
  width: 100%;

  h1 {
    padding: 0px;
    margin: 0px;
    text-align: left;
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
        color: ${props => props.theme.color.black};

        &:hover {
          color: ${props => props.theme.colors.blue.denim};
        }
      }

      .card {
        width: 210px;
        height: 260px;
        box-shadow: ${props => props.theme.colors.gray.alto} 0px 2px 4px;
        border-color: ${props => props.theme.color.white};
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
          color: $white;
          text-transform: uppercase;
          font-size: 18px;
          font-weight: 600;

          i {
            font-size: 54px;
            color: ${props => props.theme.colors.blue.denim};
            padding: 8px;
          }
        }
      }
    }
  }
`
