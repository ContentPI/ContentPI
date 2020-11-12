import { styled, device, theme } from '@styles/theme'

export const StyledDeclarations = styled.div`
  width: 210px;
  padding: 10px;
  margin-top: -147px;

  @media ${device.tablet} {
    margin-top: 0;
    width: 97%;
  }

  h3 {
    color: ${theme.colors.gray.tuna};
    display: inline-block;
    font-size: 24px;
    font-weight: 500;
  }

  ul {
    list-style: none;
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    outline: none;

    @media ${device.tablet} {
      margin-top: 0px;
    }

    li {
      div {
        cursor: pointer;

        p {
          color: ${theme.color.gray};
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 12px;
          padding: 0px;
          font-weight: 600;
          line-height: 1;
          margin-top: 10px;
          padding-top: 20px;

          @media ${device.tablet} {
            padding-top: 0;
          }

          &:first-of-type {
            padding: 0;
            margin-top: -10px;
          }
        }

        .widgetOption {
          align-items: center;
          border-radius: 5px;
          border: 1px solid ${theme.colors.gray.alabaster};
          box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 4px;
          box-sizing: border-box;
          display: flex;
          height: 40px;
          padding: 30px 10px;
          margin-bottom: 40px;
          width: 100%;

          &.disabled {
            background: ${theme.colors.gray.almostWhite};
          }

          i {
            margin-right: 10px;
            font-size: 32px;
          }

          span {
            font-size: 14px;
            text-transform: capitalize;
            outline: none;
          }
        }
      }
    }
  }
`
