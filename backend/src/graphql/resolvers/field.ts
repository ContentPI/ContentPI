// Interfaces
import { iField, iCreateFieldInput, iModels } from '../../interfaces'

export default {
  Mutation: {
    createField: (
      _: any,
      { input }: { input: iCreateFieldInput },
      { models }: { models: iModels }
    ): iField => models.Field.create({ ...input })
  }
}
