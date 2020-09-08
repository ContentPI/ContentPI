import models from '../models'

async function createFirstUser(): Promise<any> {
  const existingUsers = await models.User.findAll()

  if (existingUsers.length === 0) {
    const newUser: any = await models.User.create({
      username: 'admin',
      password: '12345678',
      email: 'carlos.santana@dev.education',
      privilege: 'god',
      active: true
    })

    return newUser
  }

  return null
}

async function createDeclarations(): Promise<any> {
  const existingDeclarations = await models.Declaration.findAll()

  if (existingDeclarations.length === 0) {
    const declarations = [
      {
        declaration: 'String',
        icon: 'fas fa-font',
        description: 'String',
        color: '#1bb935'
      },
      {
        declaration: 'Text',
        icon: 'fas fa-quote-right',
        description: 'Text',
        color: '#ff0098'
      },
      {
        declaration: 'Dropdown',
        icon: 'fas fa-caret-square-down',
        description: 'Dropdown',
        color: '#00b1ff'
      },
      {
        declaration: 'Integer',
        icon: 'fas fa-dice-five',
        description: 'Integer',
        color: '#3b4058'
      },
      {
        declaration: 'Float',
        icon: 'fas fa-dice-one',
        description: 'Float',
        color: '#e9aa28'
      },
      {
        declaration: 'Boolean',
        icon: 'fas fa-toggle-on',
        description: 'Boolean',
        color: '#000'
      },
      {
        declaration: 'Reference',
        icon: 'fas fa-link',
        description: 'Reference',
        color: '#760aff'
      }
    ]

    await models.Declaration.bulkCreate(declarations)
  }

  return null
}

export function setInitialData(): void {
  createFirstUser()
  createDeclarations()
}
