import { styled, theme, device, isRtl, add } from '@styles/theme'

export const StyledFields = styled.div`
  display: flex;
  flex-flow: column;
  margin-top: 0px;
  width: 75%;

  @media ${device.desktop} {
    width: 88%;
  }

  .field {
    box-sizing: border-box;
    box-shadow: 0px 2px 2px -1px rgba(235, 235, 235, 1);
    border: 1px solid ${theme.colors.gray.gallery};
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    position: relative;

    .actions {
      position: absolute;
      top: 6px;
      ${add('right: 10px;').if(!isRtl)}
      ${add('left: 20px;').if(isRtl)}

      i {
        margin-right: 10px;
        font-size: 25px;
        color: ${theme.colors.gray.gallery};

        &:hover {
          color: red;

          &:first-of-type {
            color: ${theme.colors.yellow.sunglow};
          }
        }
      }
    }

    &.sys {
      background-color: ${theme.colors.gray.gallery};
    }

    &.hideSys {
      display: none;
    }

    .icon {
      color: ${theme.color.white};
      display: inline-block;
      border-radius: 5px;
      margin-right: 20px;

      &.String {
        background-color: ${theme.colors.green.malachite};
      }

      &.Text {
        background-color: ${theme.colors.pink.hollywoodCerise};
      }

      &.DateTime,
      &.Status {
        background-color: ${theme.color.black};
      }

      &.Media {
        background-color: ${theme.colors.blue.denim};
      }

      &.Boolean {
        background-color: ${theme.colors.gray.tuna};
      }

      &.Dropdown {
        background-color: ${theme.colors.blue.dodgerBlue};
      }

      &.Reference {
        background-color: ${theme.colors.purple.electricViolet};
      }

      i {
        padding: 16px;
        font-style: normal;

        &.id,
        &.integer,
        &.float {
          background-color: ${theme.color.black};
          color: ${theme.color.white};
          display: inline-block;
          border-radius: 5px;
          font-style: normal;
        }

        &.integer {
          background-color: ${theme.colors.blue.oxfordBlue};
        }

        &.float {
          background-color: ${theme.colors.yellow.fuelYellow};
        }
      }
    }

    .name {
      display: inline-block;
      font-weight: 500;
      margin-top: -47px;
      vertical-align: text-top;
      line-height: 80px;
      ${add('margin-right: 15px;').if(isRtl)}

      .identifier {
        margin-left: 5px;
        font-weight: 100;
        color: ${theme.colors.gray.frenchGray};
        font-size: 14px;
      }

      .information {
        display: block;
        margin-top: -24px;
        line-height: 10px;

        .tag {
          background-color: ${theme.colors.gray.alabaster};
          border-radius: 5px;
          color: ${theme.colors.gray.tuna};
          font-size: 12px;
          margin-right: 5px;
          padding: 5px;
          text-align: center;
          width: 40px;

          &.system {
            background-color: ${theme.colors.purple.logan};
            color: ${theme.colors.gray.gallery};
          }
        }
      }
    }
  }
`
