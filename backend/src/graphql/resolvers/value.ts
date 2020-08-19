// Dependencies
import { Op } from 'sequelize'

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
              if (valueToEdit) {
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
              }
            })
          })

          updatedValuesPromises.push(updateValuePromise)
        })
      }

      const newValues = await Promise.all(updatedValuesPromises)

      return newValues
    }
  }
}
