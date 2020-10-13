// Interface
import { iContent, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iContent => {
  const Content = sequelize.define('Content', {
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

  return Content
}
