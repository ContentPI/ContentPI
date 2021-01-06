// Interfaces
import {
  iField,
  iCreateFieldInput,
  iModels,
  iReorderFieldInput
} from '../../interfaces'

const editField = async (models: any, id: string, input: iCreateFieldInput) => {
  const fieldToEdit = await models.Field.findByPk(id)

  if (fieldToEdit) {
    const updatedField = await fieldToEdit.update(
      { ...input },
      { where: { id } }
    )

    return updatedField
  }

  return null
}

export default {
  Mutation: {
    createField: async (
      _: any,
      { input }: { input: iCreateFieldInput },
      { models }: { models: iModels }
    ): Promise<iField> => {
      const { defaultValue: targetModel, modelId: parentModel, type } = input

      if (type === 'Reference') {
        const hasReference = await models.Reference.findAll({
          where: {
            parentModel,
            targetModel
          }
        })

        if (!hasReference[0]) {
          await models.Reference.create({
            parentModel,
            targetModel
          })
        }
      }

      const newField = await models.Field.create({ ...input })

      return newField
    },
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
    },
    editField: async (
      _: any,
      { id, input }: { id: string; input: iCreateFieldInput },
      { models }: { models: iModels }
    ): Promise<any> => {
      return editField(models, id, input)
    },
    reorderFields: async (
      _: any,
      { fieldsToUpdate }: { fieldsToUpdate: iReorderFieldInput[] },
      { models }: { models: iModels }
    ): Promise<any> => {
      const reorderFieldsPromises: any = []

      fieldsToUpdate.forEach((fieldToUpdate: any) => {
        const reorderFieldsPromise = new Promise((resolve: any) => {
          models.Field.update(
            { order: fieldToUpdate.order },
            {
              where: {
                id: fieldToUpdate.id
              }
            }
          ).then(() => resolve(fieldToUpdate))
        })

        reorderFieldsPromises.push(reorderFieldsPromise)
      })

      const reorderFieldsValues = await Promise.all(reorderFieldsPromises)

      return reorderFieldsValues
    }
  }
}
