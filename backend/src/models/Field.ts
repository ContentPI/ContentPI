// Interface
import { iField, iModels, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iField => {
  const Field = sequelize.define('Field', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    defaultValue: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    isMedia: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isUnique: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isHide: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isSystem: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isPrimaryKey: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  })

  Field.associate = (models: iModels): void => {
    Field.hasMany(models.Value, {
      foreignKey: {
        name: 'fieldId',
        field: 'field_id'
      },
      as: 'values',
      onDelete: 'CASCADE'
    })
  }

  return Field
}
