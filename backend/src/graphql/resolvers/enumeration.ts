// Interfaces
import {
  iEnumeration,
  iCreateOrEditEnumerationInput,
  iModels
} from '../../interfaces'

export default {
  Query: {
    getEnumerationsByAppId: (
      _: any,
      { appId }: { appId: string },
      { models }: { models: iModels }
    ): iEnumeration[] =>
      models.Enumeration.findAll({
        where: {
          appId
        }
      })
  },
  Mutation: {
    createEnumeration: (
      _: any,
      { input }: { input: iCreateOrEditEnumerationInput },
      { models }: { models: iModels }
    ): iEnumeration => models.Enumeration.create({ ...input })
  }
}
