// Interface
import { iValue, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iValue => {
  const Value = sequelize.define('Value', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    entry: {
      type: DataTypes.UUID,
      allowNull: false
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fieldIdentifier: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  return Value
}
