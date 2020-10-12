import { styled, theme } from '@styles/theme'

export const StyledHeader = styled.div`
  background: ${theme.color.white};
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  box-shadow: 0 3px 10px rgba(62, 85, 120, 0.07);
  z-index: 1;

  h1 {
    margin: 0;
    padding: 20px;
    font-size: 18px;
    font-weight: 500;
  }
`
