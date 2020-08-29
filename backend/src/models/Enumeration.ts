// Interface
import { iModel, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iModel => {
  const Enumeration = sequelize.define('Enumeration', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    enumerationName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    values: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })

  return Enumeration
}
