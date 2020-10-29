// Interfaces
import { iI18n, iModels } from '../../interfaces'

export default {
  Query: {
    getI18n: (_: any, _args: any, { models }: { models: iModels }): iI18n[] => {
      return models.I18n.findAll()
    }
  }
}
