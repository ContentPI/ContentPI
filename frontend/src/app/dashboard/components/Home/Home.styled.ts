import { styled, theme } from '@styles/theme'

export const StyledHome = styled.div`
  margin: 0 auto;
  max-width: 792px;
  box-sizing: border-box;
  min-width: 0px;
  background-color: white;
  padding-top: 24px;
  padding-bottom: 24px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid ${theme.colors.gray.almostWhite};
  box-shadow: rgba(0, 0, 0, 0.08) 0px 2px 6px;

  .watch {
    display: flex;
    justify-content: space-between;

    a {
      color: ${theme.colors.blue.dodgerBlue};
      font-size: 14px;
      margin-right: 40px;
      display: inline-block;
      width: 120px;
      padding: 10px;
      border-radius: 10px;
      text-align: center;

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
    line-height: 20px;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .StepProgress {
    position: relative;
    padding-left: 45px;
    list-style: none;
    color: #6e6299;
    font-size: 14px;
    line-height: 23px;

    strong {
      color: #444;
    }

    span {
      display: block;
    }

    &::before {
      display: inline-block;
      content: '';
      position: absolute;
      top: 0;
      left: 23px;
      width: 10px;
      height: 90%;
      border-left: 1px solid ${theme.colors.blue.dodgerBlue};
    }

    &-item {
      position: relative;
      counter-increment: list;

      &:not(:last-child) {
        padding-bottom: 20px;
      }

      &::before {
        display: inline-block;
        content: '';
        position: absolute;
        left: -22px;
        height: 90%;
        width: 10px;
      }

      &::after {
        content: counter(list);
        color: ${theme.colors.blue.dodgerBlue};
        display: inline-block;
        position: absolute;
        top: 0;
        left: -37px;
        width: 30px;
        line-height: 30px;
        text-align: center;
        height: 30px;
        border: 1px solid ${theme.colors.blue.dodgerBlue};
        border-radius: 50%;
        background-color: #fff;
      }

      &.is-done {
        &::before {
          border-left: 1px solid ${theme.colors.blue.dodgerBlue};
        }

        &::after {
          font-family: 'Font Awesome 5 Free';
          font-weight: 900;
          content: '\f00c';
          font-size: 15px;
          color: #fff;
          line-height: 32px;
          text-align: center;
          border: 1px solid ${theme.colors.blue.dodgerBlue};
          background-color: ${theme.colors.blue.dodgerBlue};
        }
      }

      &.last {
        &::before {
          border-left: 1px solid transparent;
        }
      }
    }

    strong {
      display: block;
    }
  }
`
