declare module '*.json' {
  const value: any
  export default value
}

declare module '*.scss' {
  export const content: { [className: string]: string }
  export default content
}
