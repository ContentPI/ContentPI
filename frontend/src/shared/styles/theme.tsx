import baseStyled, { ThemedStyledInterface, css, createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: white;
    font-family: BlinkMacSystemFont, Helvetica, sans-serif;
    height: 100%;
    margin: 0;
    overflow-x: hidden;
    padding: 0;
    touch-action: none;
  }

  input {
    appearance: none;
    background-clip: padding-box;
    outline: none;
    border: none;
  }

  a {
    text-decoration: none;
  }
`

export const breakpoints: any = {
  xs: '640px',
  sm: '768px',
  md: '992px',
  lg: '1280px',
  xl: '1400px'
}

export const theme = {
  color: {
    black: '#000',
    facebook: '#3b5998',
    gray: '#888',
    linkedin: '#0077b5',
    red: '#ff0000',
    rss: '#ff6600',
    twitter: '#1da1f2',
    white: '#fff'
  },
  colors: {
    blue: {
      bondiBlue: '#0083b7',
      cerulean: '#00bde5',
      denim: '#1565c0',
      dodgerBlue: '#2ea1f8',
      oxfordBlue: '#3b4058',
      pacificBlue: '#0099CC',
      pictonBlue: '#4bc0f3'
    },
    gray: {
      codGray: '#111',
      mineShaft: '#222',
      tuna: '#333',
      tundora: '#444',
      emperor: '#555',
      doveGray: '#666',
      boulder: '#777',
      gray: '#888',
      regentGray: '#8290a3',
      dustyGray: '#999',
      silverChalice: '#aaa',
      silver: '#bbb',
      frenchGray: '#ccc',
      alto: '#ddd',
      gallery: '#eee',
      mercury: '#e9e9e9',
      alabaster: '#f7f7f7',
      almostWhite: '#fafafa',
      steelGray: '#1e1e2e',
      storGray: '#6c6e86',
      shark: '#21262d',
      darkShark: '#1c1e25',
      manatee: '#878c9c',
      athensGray: '#f1f2f7',
      wildSand: '#f4f4f4',
      whisper: '#fafafc'
    },
    green: {
      malachite: '#1bb935',
      mountainMeadow: '#0eb87f'
    },
    pink: {
      hollywoodCerise: '#ff0098',
      fairPink: '#ffe9e9'
    },
    purple: {
      electricViolet: '#760aff',
      logan: '#9ea7c7'
    },
    yellow: {
      fuelYellow: '#e9aa28',
      mySin: '#ffb914',
      sunglow: '#ffbb33'
    }
  },
  font: {
    size: {
      xxxLarge: '48px',
      xxLarge: '32px',
      xLarge: '24px',
      larger: '19px',
      large: '18px',
      big: '17px',
      regular: '16px',
      medium: '14px',
      small: '13px',
      smaller: '12px',
      xSmall: '10px',
      xxSmall: '9px',
      xxxSmall: '8px'
    },
    weight: {
      light: 100,
      normal: 400,
      semibold: 500,
      bold: 700,
      heavy: 900
    }
  },
  mixins: {
    breakpoint: Object.keys(breakpoints).reduce((acc, label) => {
      acc[label] = (literals: TemplateStringsArray, ...placeholders: any[]) =>
        css`
          @media (max-width: ${breakpoints[label]}) {
            ${css(literals, ...placeholders)};
          }
        `.join('')
      return acc
    }, {} as Record<keyof typeof breakpoints, (l: TemplateStringsArray, ...p: any[]) => string>),
    placeholder: (color: string) => css`
      ::-webkit-input-placeholder {
        color: ${color};
      }

      :-moz-placeholder {
        color: ${color};
        opacity: 1;
      }

      ::-moz-placeholder {
        color: ${color};
        opacity: 1;
      }

      ::-ms-input-placeholder {
        color: ${color};
      }
    `
  }
}

export type Theme = typeof theme
export const styled = baseStyled as ThemedStyledInterface<Theme>
