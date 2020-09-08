// Interface
import { iValue, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iValue => {
  const Reference = sequelize.define('Reference', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    parentModel: {
      type: DataTypes.UUID,
      allowNull: false
    },
    targetModel: {
      type: DataTypes.UUID,
      allowNull: false
    }
  })

  return Reference
}
