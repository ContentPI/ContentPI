// Interfaces
import { iApp, iCreateAppInput, iModels } from '../../interfaces'

export default {
  Query: {
    getApps: (
      _: object,
      _args: object,
      { models }: { models: iModels }
    ): iApp[] => models.App.findAll()
  },
  Mutation: {
    createApp: (
      _: object,
      { input }: { input: iCreateAppInput },
      { models }: { models: iModels }
    ): iApp => models.App.create({ ...input })
  }
}
