// Dependencies
import { Op } from 'sequelize'
import { getEntries } from '@contentpi/core'

// Interfaces
import {
  iValue,
  iCreateOrUpdateValueInput,
  iValueInput,
  iModels
} from '../../interfaces'

export default {
  Query: {
    getValuesByEntry: async (
      _: any,
      { entry }: { entry: string },
      { models }: { models: iModels }
    ): Promise<iValue[]> => {
      const values = await models.Value.findAll({
        where: {
          entry
        }
      })

      return values
    },
    getEntriesByModelId: async (
      _: any,
      { modelId }: { modelId: string },
      { models }: { models: iModels }
    ): Promise<any> => {
      const allEntriesPromises: any[] = []

      const references = await models.Reference.findAll({
        where: {
          parentModel: modelId
        }
      })

      if (references.length > 0) {
        references.forEach((reference: any) => {
          const promise = new Promise((resolve: any) => {
            models.Field.findAll({
              where: {
                model_id: reference.targetModel
              },
              include: [
                {
                  model: models.Value,
                  as: 'values'
                }
              ]
            }).then((fields: any) => {
              const [{ modelName }] = fields
              const { entries } = getEntries({ fields })

              resolve({
                modelId: reference.targetModel,
                modelName,
                entries
              })
            })
          })

          allEntriesPromises.push(promise)
        })
      }

      const entries = await Promise.all(allEntriesPromises)

      return {
        entries: JSON.stringify(entries)
      }
    }
  },
  Mutation: {
    createValues: async (
      _: any,
      { input }: { input: iCreateOrUpdateValueInput[] },
      { models }: { models: iModels }
    ): Promise<iValue[]> => {
      const insertedValues = await models.Value.bulkCreate(input)

      return insertedValues
    },
    findUniqueValues: async (
      _: any,
      { input }: { input: iValueInput[] },
      { models }: { models: iModels }
    ): Promise<any> => {
      const data = await models.Value.findAll({
        where: {
          [Op.or]: input
        }
      })

      return data
    },
    updateValues: async (
      _: any,
      { entry, input }: { entry: string; input: iCreateOrUpdateValueInput[] },
      { models }: { models: iModels }
    ): Promise<any> => {
      const updatedValuesPromises: any = []

      if (input) {
        input.forEach((item: any) => {
          const updateValuePromise = new Promise((resolve: any) => {
            models.Value.findAll({
              where: {
                entry,
                fieldId: item.fieldId
              }
            }).then((valueToEdit: any) => {
              if (valueToEdit[0]) {
                valueToEdit[0]
                  .update(
                    { ...item },
                    {
                      where: {
                        entry,
                        fieldId: item.fieldId
                      },
                      returning: true,
                      plain: true
                    }
                  )
                  .then((updatedValue: any) => resolve(updatedValue))
              } else if (item.entry && item.fieldId) {
                // Creating values that did not exists before...
                models.Value.create(item).then((createdValue: any) =>
                  resolve(createdValue)
                )
              }
            })
          })

          updatedValuesPromises.push(updateValuePromise)
        })
      }

      const newValues = await Promise.all(updatedValuesPromises)

      return newValues
    },
    deleteValues: async (
      _: any,
      { entries }: { entries: any[] },
      { models }: { models: iModels }
    ): Promise<any> => {
      const deletedValuesPromises: any = []

      entries.forEach((entry: any) => {
        const deleteValuePromise = new Promise((resolve: any) => {
          models.Value.destroy({
            where: {
              entry: entry.id
            }
          }).then(() => {
            return resolve({ entryId: entry.id })
          })
        })

        deletedValuesPromises.push(deleteValuePromise)
      })

      const deletedValues = await Promise.all(deletedValuesPromises)

      return deletedValues
    },
    publishOrUnpublishEntries: async (
      _: any,
      { entries, action }: { entries: any[]; action: 'publish' | 'unpublish' },
      { models }: { models: iModels }
    ): Promise<any> => {
      const publishedOrUnpublishedValuesPromises: any = []
      let newEntries = entries

      if (action === 'unpublish') {
        newEntries = entries.filter(
          (entry: any) => entry.status === 'Published'
        )
      }

      newEntries.forEach((entry: any) => {
        const publishedOrUnpublishedValuePromise = new Promise(
          (resolve: any) => {
            models.Value.update(
              { value: action === 'publish' ? 'Published' : 'Draft' },
              {
                where: {
                  entry: entry.id,
                  value: action === 'publish' ? 'Draft' : 'Published'
                }
              }
            ).then(() => resolve({ entryId: entry.id }))
          }
        )

        publishedOrUnpublishedValuesPromises.push(
          publishedOrUnpublishedValuePromise
        )
      })

      const publishedOrUnpublishedValues = await Promise.all(
        publishedOrUnpublishedValuesPromises
      )

      return publishedOrUnpublishedValues
    }
  }
}
