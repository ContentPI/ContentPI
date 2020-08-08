// Interfaces
import { iModel, iCreateModelInput, iModels } from '../../interfaces'

export default {
  Query: {
    getModels: (
      _: any,
      _args: any,
      { models }: { models: iModels }
    ): iModel[] =>
      models.Model.findAll({
        include: [
          {
            model: models.Field,
            as: 'fields'
          }
        ]
      }),
    getModel: async (
      _: any,
      { identifier, appId }: { identifier: string; appId: string },
      { models }: { models: iModels }
    ): Promise<iModel> => {
      const data = await models.Model.findAll({
        where: {
          identifier,
          appId
        },
        include: [
          {
            model: models.Field,
            as: 'fields'
          }
        ]
      })

      // Sorting by creation date
      data[0].fields.sort((a: any, b: any) => (a.order > b.order ? 1 : -1))

      return data[0]
    }
  },
  Mutation: {
    createModel: (
      _: any,
      { input }: { input: iCreateModelInput },
      { models }: { models: iModels }
    ): iModel => models.Model.create({ ...input }),
    deleteModel: async (
      _: any,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const modelToRemove = await models.Model.findByPk(id)

      if (modelToRemove) {
        await modelToRemove.destroy({ where: { id } })
        return modelToRemove
      }

      return null
    }
  }
}
