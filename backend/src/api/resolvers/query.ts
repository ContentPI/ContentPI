import { Console } from 'console'

export default {
  Query: {
    getQuery: async (
      _: any,
      {
        input: { model, operation, params = {} }
      }: { input: { model: string; operation: string; params: any } },
      { models }: { models: any }
    ) => {
      const Model = await models.Model.findAll({
        where: {
          modelName: model
        }
      })
      console.log('MDOEL INSTANCE', Model)
      if (Model.length === 1) {
        const modelData = Model[0].dataValues
        const modelId = modelData.id
        console.log('MODEL ID===>>>', modelId)
        const Fields = await models.Field.findAll({
          where: {
            modelName: model
          }
        })
        const promises: any = []

        if (Fields.length > 0) {
          Fields.forEach((field: any) => {
            const { id: fieldId } = field.dataValues

            const Value = models.Value.findAll({
              where: {
                fieldId
              }
            })
            console.log('VALUE===>>>>>>>', Value)

            promises.push(
              new Promise(resolve => {
                resolve(Value)
              })
            )
          })

          const data = await Promise.all(promises)
            .then((valuesBulk: any) => {
              const entries: any = []
              console.log('VALUES BULK', valuesBulk)
              valuesBulk.forEach((valuesEntry: any, index: number) => {
                const fieldsValues: any = []
                valuesEntry.forEach((v: any) => {
                  const entry: any = {}
                  const { fieldIdentifier, value } = v.dataValues

                  entry[fieldIdentifier] = value

                  fieldsValues.push({
                    ...entry
                  })
                })
                entries.push(fieldsValues)
                console.log('FIELDS VALUES', fieldsValues)
              })

              return entries
            })
            .then((response: any) => {
              return {
                data: response
              }
            })
          console.log('DATA XXX>>', data)
          return data
        }
      }

      return {
        data: {}
      }
    }
  }
}
