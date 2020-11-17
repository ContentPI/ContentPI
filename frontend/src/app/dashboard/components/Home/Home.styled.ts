import { styled, theme, device, css } from '@styles/theme'

const box = css`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray.almostWhite};
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 6px;
  box-sizing: border-box;
  margin-bottom: 16px;
  margin: 0 auto;
  max-width: 792px;
  padding: 24px;
`

export const StyledHome = styled.div`
  .guide {
    ${box}

    .watch {
      display: flex;
      justify-content: space-between;
      width: 100%;

      a {
        border-radius: 10px;
        color: ${theme.colors.blue.dodgerBlue};
        display: inline-block;
        font-size: 14px;
        padding: 10px;
        text-align: center;
        width: 120px;

        @media ${device.mobileXl} {
          line-height: 24px;
        }

        i {
          font-size: 13px;
        }

        &:hover {
          background-color: ${theme.colors.gray.gallery};
        }
      }
    }

    h3 {
      color: #333;
      margin: 0;
      padding: 0;
      padding-left: 20px;
    }

    .title {
      color: #0f1c41;
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      margin-bottom: 8px;
    }
  }

  .invite {
    ${box}
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    height: 110px;

    .invite-wrapper {
      height: 110px;
    }

    @media ${device.mobileXl} {
      flex-direction: column;
      height: 160px;
    }

    h3 {
      margin: 0;
      padding: 0;
    }

    .button {
      width: 208px;
      line-height: 60px;
    }

    span {
      color: ${theme.colors.purple.kimberly};
    }
  }

  .resources {
    display: flex;
    margin: 0 auto;
    max-width: 792px;
    padding: 24px;
    font-size: 14px;

    @media ${device.mobileXl} {
      flex-direction: column;
    }

    .box {
      margin-left: 10px;

      h3 {
        i {
          font-size: 24px;
          diplay: block;
          width: 40px;
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-radius: 5px;
          margin-right: 5px;
        }
      }

      p {
        color: ${theme.colors.purple.kimberly};
        font-weight: 300;
      }

      a {
        color: ${theme.colors.blue.dodgerBlue};

        &:hover {
          color: ${theme.colors.blue.denim};
        }
      }
    }

    .documentation {
      h3 {
        i {
          background: #c9f9ff;
          color: #00e5ff;
        }
      }
    }

    .examples {
      h3 {
        i {
          background: #fff4ba;
          color: #ffd400;
        }
      }
    }

    .community {
      h3 {
        i {
          background: #ead6ff;
          color: #a047ff;
        }
      }
    }
  }
`
