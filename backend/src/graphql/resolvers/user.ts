// Lib
import { getUserData } from '../../lib/jwt'

// Interfaces
import {
  iUser,
  iCreateUserInput,
  iModels,
  iLoginInput,
  iAuthPayload
} from '../../interfaces'

// Utils
import { doLogin, getUserBy } from '../../lib/auth'

export default {
  Query: {
    getUsers: (
      _: object,
      _args: object,
      { models }: { models: iModels }
    ): iUser[] => {
      return models.User.findAll({
        include: [
          {
            model: models.App,
            as: 'apps'
          }
        ]
      })
    },
    getUserData: async (
      _: any,
      { at }: { at: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      // Current connected user
      const connectedUser = await getUserData(at)

      if (connectedUser) {
        // Validating if the user is still valid
        const user = await getUserBy(
          {
            id: connectedUser.id,
            email: connectedUser.email,
            privilege: connectedUser.privilege,
            active: connectedUser.active
          },
          models
        )

        if (user) {
          return {
            ...connectedUser
          }
        }
      }

      return {
        id: '',
        username: '',
        password: '',
        email: '',
        privilege: '',
        active: false,
        _DEBUG: JSON.stringify({
          hasCookie: Boolean(at)
        })
      }
    }
  },
  Mutation: {
    createUser: (
      _: object,
      { input }: { input: iCreateUserInput },
      { models }: { models: iModels }
    ): iUser => models.User.create({ ...input }),
    login: (
      _: object,
      { input }: { input: iLoginInput },
      { models }: { models: iModels }
    ): Promise<iAuthPayload> => doLogin(input.email, input.password, models)
  }
}
