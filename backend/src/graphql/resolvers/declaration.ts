// Interfaces
import {
  iDeclaration,
  iCreateDeclarationInput,
  iModels
} from '../../interfaces'

export default {
  Query: {
    getDeclarations: (
      _: any,
      _args: any,
      { models }: { models: iModels }
    ): iDeclaration[] => models.Declaration.findAll()
  },
  Mutation: {
    createDeclaration: (
      _: any,
      { input }: { input: iCreateDeclarationInput },
      { models }: { models: iModels }
    ): iDeclaration => models.Declaration.create({ ...input })
  }
}
