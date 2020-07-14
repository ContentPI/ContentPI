import typeDefs from '../index'

describe('#typeDefs', () => {
  it('should match the GraphQL schema', () => {
    expect(typeDefs).toMatchSnapshot()
  })
})
