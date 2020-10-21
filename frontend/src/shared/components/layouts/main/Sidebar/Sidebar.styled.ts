import { styled, theme } from '@styles/theme'

export const StyledSidebar = styled.aside`
  background: ${theme.color.white};

  width: auto;
  background-color: ${theme.color.white};
  display: flex;
  flex-direction: row;
  box-shadow: 0 3px 10px rgba(62, 85, 120, 0.07);

  .firstOptions {
    width: 75px;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      180deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(9, 9, 121, 1) 35%,
      rgba(0, 212, 255, 1) 100%
    );
    color: ${theme.color.white};

    .isoType {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 10px;

      img {
        height: 40px;
        object-fit: cover;
      }
    }

    ul {
      list-style: none;
      padding: 0px;
      margin: 0px;

      li {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        &.appIcon {
          margin-top: 20px;

          a {
            width: 60px;

            &:hover {
              background-color: transparent;
            }
          }
        }

        &:hover {
          cursor: pointer;
        }

        a {
          color: ${theme.color.white};
          text-decoration: none;
          font-size: 16px;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 45px;
          height: 40px;

          &:hover {
            background-color: rgba(64, 143, 224, 0.59);
            border-radius: 5px;
          }
        }
      }
    }
  }

  .closed {
    display: none;

    &.secondOptions {
      width: 225px;
      display: block;

      .logoContainer {
        height: 70px;
        width: 100%;
      }

      .close {
        height: 60px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        span {
          background-color: ${theme.colors.gray.wildSand};
          border-radius: 0.5rem;
          margin-right: 1rem;

          i {
            color: ${theme.colors.gray.emperor};
            font-size: 14px;
            width: 45px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .subOptions {
        margin-top: 10px;

        ul {
          list-style: none;
          padding: 0px;
          margin: 0px;

          li {
            display: flex;
            justify-content: left;

            &:first-of-type {
              a {
                color: ${theme.colors.blue.denim};
                font-weight: 600;

                &:hover {
                  &:after {
                    content: none;
                  }
                }
              }
            }

            a {
              padding: 10px 30px;
              text-decoration: none;
              color: ${theme.colors.gray.emperor};
              font-size: 0.835rem;
              font-weight: 400;
              line-height: 1.5;
              position: relative;
              width: 100%;

              &:hover {
                color: ${theme.colors.blue.denim};

                &:after {
                  content: '';
                  position: absolute;
                  display: block;
                  width: 3px;
                  -webkit-border-top-left-radius: 5px;
                  -moz-border-radius-topleft: 5px;
                  border-top-left-radius: 5px;
                  -webkit-border-bottom-left-radius: 5px;
                  -moz-border-radius-bottomleft: 5px;
                  border-bottom-left-radius: 5px;
                  top: 0;
                  bottom: 0;
                  right: 0;
                  background-color: ${theme.colors.blue.denim};
                }
              }
            }
          }
        }
      }
    }
  }

  .profile {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 19px;
    margin-bottom: 10px;

    span {
      display: inline-block;
      background-color: ${theme.colors.blue.pictonBlue};
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      border-radius: 50%;
      font-weight: 100;
    }
  }
`
