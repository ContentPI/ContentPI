import { createToken } from '../auth'

describe('#createToken', () => {
  it('should create a token', async () => {
    const user = {
      id: '1',
      username: 'foo',
      password: 'bar',
      email: 'foo@bar.com',
      privilege: 'user',
      active: true
    }

    const [token] = await createToken(user)

    expect(token.length).toBe(413)
  })
})
