// Interface
import { iDeclaration, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iDeclaration => {
  const Declaration = sequelize.define('Declaration', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    declaration: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  return Declaration
}
