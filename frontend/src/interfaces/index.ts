import { App, User } from './types'

// App
export interface iApp extends App {
  id: string
  createdAt: Date
  updatedAt: Date
}

// User
export interface iUser extends User {
  id?: string
  token?: string
  createdAt?: Date
  updatedAt?: Date
}
