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

      if (Model.length === 1) {
        const Fields = await models.Field.findAll({
          where: {
            modelName: model
          }
        })

        const promises: any = []
        const fields: any = []
        const fieldsData: any = {}

        if (Fields.length > 0) {
          Fields.forEach((field: any) => {
            const { id: fieldId, identifier: fieldName } = field.dataValues
            fields.push(fieldName)

            const Value = models.Value.findAll({
              where: {
                fieldId
              }
            })

            promises.push(
              new Promise(resolve => {
                resolve(Value)
              })
            )
          })

          console.log('FIELDS====>>>', fields)

          const promiseData = await Promise.all(promises)
            .then(resolvedValues => {
              resolvedValues.forEach((fieldValues, index) => {
                const values = fieldValues.map((value: any) => {
                  const { entry, value: fieldValue } = value.dataValues
                  return {
                    entry,
                    fieldValue
                  }
                })

                fieldsData[fields[index]] = values
              })

              return fieldsData
            })
            .then((response: any) => {
              console.log('RESPONSE====>>>', response)
              const entries: any = {}

              Object.keys(response).forEach(field => {
                response[field].forEach((value: any) => {
                  const { entry, fieldValue } = value
                  if (entries[entry]) {
                    entries[entry][field] = fieldValue
                  } else {
                    entries[entry] = {
                      [field]: fieldValue
                    }
                  }
                })
              })

              const data: any = []

              Object.keys(entries).forEach(entry => {
                data.push(entries[entry])
              })

              return {
                data
              }
            })

          return promiseData
        }
      }

      return {
        data: {}
      }
    }
  }
}
