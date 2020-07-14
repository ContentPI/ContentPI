import Sequelize from 'sequelize-mock'
import App from '../App'

const sequelize = new Sequelize()
const DataTypes = sequelize.Sequelize
const model = App(sequelize, DataTypes)
const schema = model._defaults
const modelName = 'App'

describe('#App', () => {
  it('should have correct model name', () => {
    expect(model.name).toBe(modelName)
  })

  it('should match the schema', () => {
    expect(schema).toEqual({
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4()
      },
      appName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    })
  })
})
