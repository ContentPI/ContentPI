// Dependencies
import { encrypt } from 'fogg-utils'

// Interface
import { iUser, iModels, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iUser => {
  const User = sequelize.define(
    'User',
    {
      id: {
        primaryKey: true,
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4()
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'The user just accepts alphanumeric characters'
          },
          len: {
            args: [4, 20],
            msg: 'The username must be from 4 to 20 characters'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email'
          }
        }
      },
      privilege: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user'
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      hooks: {
        beforeCreate: (user: iUser): void => {
          user.password = encrypt(user.password)
        }
      }
    }
  )

  User.associate = (models: iModels): void => {
    User.hasMany(models.App, {
      foreignKey: {
        name: 'userId',
        field: 'user_id'
      },
      as: 'apps'
    })
  }

  return User
}
