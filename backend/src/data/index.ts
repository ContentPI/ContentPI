// Dependencies
import { forEach } from '@contentpi/utils'

// Data
import ar from './i18n/ar.json'
import deDE from './i18n/de-DE.json'
import esMX from './i18n/es-MX.json'
import itIT from './i18n/it-IT.json'
import jaJP from './i18n/ja-JP.json'
import ptBR from './i18n/pt-BR.json'
import frFR from './i18n/fr-FR.json'
import ruRU from './i18n/ru-RU.json'

// Models
import models from '../models'

// Content
const translations: any = {
  ar,
  'de-DE': deDE,
  'es-MX': esMX,
  'it-IT': itIT,
  'ja-JP': jaJP,
  'pt-BR': ptBR,
  'fr-FR': frFR,
  'ru-RU': ruRU
}

async function createInitialContent(): Promise<any> {
  const existingContent = await models.I18n.findAll()
  const content: any = []

  if (existingContent.length === 0) {
    forEach(translations, (language: string) => {
      forEach(translations[language], (key: string) => {
        content.push({
          key,
          value: translations[language][key],
          language
        })
      })
    })

    await models.I18n.bulkCreate(content)
  }

  return null
}

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
  createInitialContent()
}
