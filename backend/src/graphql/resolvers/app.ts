// Interfaces
import { iApp, iCreateAppInput, iModels } from '../../interfaces'

export default {
  Query: {
    getApps: (
      _: object,
      _args: object,
      { models }: { models: iModels }
    ): iApp[] => models.App.findAll(),
    getAppById: async (
      _: any,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<iApp> => {
      const data = await models.App.findAll({
        where: {
          id
        }
      })

      return data[0]
    }
  },
  Mutation: {
    createApp: (
      _: object,
      { input }: { input: iCreateAppInput },
      { models }: { models: iModels }
    ): iApp => models.App.create({ ...input })
  }
}
