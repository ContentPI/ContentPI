// Interfaces
import { iValue, iCreateOrUpdateValueInput, iModels } from '../../interfaces'

export default {
  Mutation: {
    createValues: async (
      _: any,
      { input }: { input: iCreateOrUpdateValueInput[] },
      { models }: { models: iModels }
    ): Promise<iValue[]> => {
      const insertedValues = await models.Value.bulkCreate(input)

      return insertedValues
    }
  }
}
