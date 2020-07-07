// Interfaces
import { iUser, iCreateUserInput, iModels } from '../../interfaces'

export default {
  Query: {
    getUsers: (
      _: object,
      _args: object,
      { models }: { models: iModels }
    ): iUser[] => models.User.findAll()
  },
  Mutation: {
    createUser: (
      _: object,
      { input }: { input: iCreateUserInput },
      { models }: { models: iModels }
    ): iUser => models.User.create({ ...input })
  }
}
