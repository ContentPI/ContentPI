export default {
  Query: {
    getQuery: (
      _: any,
      {
        input: { model, operation, params = {} }
      }: { input: { model: string; operation: string; params: any } },
      { models }: { models: any }
    ) => {
      console.log('MODEL===>>>', model)
      const Model = models[model]
      console.log('Model Instance===>>>', Model)
      console.log('Operation===>>>', operation)
      if (operation === 'findAll') {
        const data = Model.findAll(params)

        return {
          data
        }
      }

      return {
        data: {}
      }
    }
  }
}
