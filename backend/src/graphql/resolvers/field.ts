// Interfaces
import { iField, iCreateFieldInput, iModels } from '../../interfaces'

export default {
  Mutation: {
    createField: (
      _: any,
      { input }: { input: iCreateFieldInput },
      { models }: { models: iModels }
    ): iField => models.Field.create({ ...input }),
    deleteField: async (
      _: any,
      { id }: { id: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const fieldToRemove = await models.Field.findByPk(id)

      if (fieldToRemove) {
        await fieldToRemove.destroy({ where: { id } })
        return fieldToRemove
      }

      return null
    }
  }
}
