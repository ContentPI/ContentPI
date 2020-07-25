export type App = {
  appName: string
  identifier: string
  icon: string
  description: string
}

export type User = {
  username?: string
  password: string
  email: string
  privilege?: string
  active?: boolean
}
