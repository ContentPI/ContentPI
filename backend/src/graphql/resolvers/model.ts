// Interfaces
import {
  iModel,
  iCreateModelInput,
  iEditModelInput,
  iModels
} from '../../interfaces'

// Data
import systemFields from '../../data/systemFields'

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
    createModel: async (
      _: any,
      { input }: { input: iCreateModelInput },
      { models }: { models: iModels }
    ): Promise<iModel> => {
      const newModel = await models.Model.create({ ...input })

      // Creating system fields
      await models.Field.bulkCreate(systemFields(newModel))

      return newModel
    },
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
    },
    editModel: async (
      _: any,
      { id, input }: { id: string; input: iEditModelInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      const modelToEdit = await models.Model.findByPk(id)

      if (modelToEdit) {
        const updatedModel = await modelToEdit.update(
          { ...input },
          { where: { id } }
        )

        return updatedModel
      }

      return null
    }
  }
}
