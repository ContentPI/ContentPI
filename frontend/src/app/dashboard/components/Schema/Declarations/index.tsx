// Dependencies
import React, { FC, ReactElement, useState, memo } from 'react'

// Modals
import CreateFieldModal from '@modals/CreateFieldModal'

// Styles
import { StyledDeclarations } from './Declarations.styled'

interface iProps {
  declarations: any
  model: any
  enumerations: any[]
  models: any[]
}

const Declarations: FC<iProps> = ({ declarations, model, enumerations, models }): ReactElement => {
  // Local state
  const [isOpen, setIsOpen] = useState(false)
  const [fieldType, setFieldType] = useState('')

  // Method to open modal
  const handleModal = (): void => setIsOpen(!isOpen)

  if (model.identifier === 'asset') {
    return <div />
  }

  return (
    <>
      {fieldType && (
        <CreateFieldModal
          label={`Create new ${fieldType} Field`}
          isOpen={isOpen}
          onClose={handleModal}
          options={{
            data: {
              fieldsCount: model.fields.length - 4,
              type: fieldType,
              modelIdentifier: model.identifier,
              appId: model.appId,
              enumerations,
              modelName: model.modelName,
              models
            },
            position: 'top',
            height: fieldType === 'Dropdown' || fieldType === 'Reference' ? '790px' : '700px',
            width: '600px'
          }}
        />
      )}

      <StyledDeclarations>
        <h3>Fields</h3>

        <ul>
          {declarations.map((field: any) => {
            // Only displaying Dropdown declaration when we have enumerations
            if (field.declaration === 'Dropdown' && enumerations.length === 0) {
              return <li key={field.id} />
            }

            // Only displaying Reference declaration if we have at least 2 custom models.
            if (field.declaration === 'Reference' && models.length - 1 <= 1) {
              return <li key={field.id} />
            }

            return (
              <li key={field.id}>
                <div>
                  <p>{field.declaration}</p>

                  <div
                    className="widgetOption"
                    title={field.description}
                    onClick={(): void => {
                      setFieldType(field.declaration)
                      handleModal()
                    }}
                  >
                    <i className={field.icon} style={{ color: field.color }} />
                    <span>{field.declaration}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </StyledDeclarations>
    </>
  )
}

export default memo(Declarations)
