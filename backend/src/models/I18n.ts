// Interface
import { iI18n, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iI18n => {
  const I18n = sequelize.define('I18n', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return I18n
}
