// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'

// Contexts
import { I18nContext } from '@contexts/i18n'

// Modals
import CreateFieldModal from '@modals/CreateFieldModal'

// Styles
import { StyledDeclarations } from './Declarations.styled'

interface iProps {
  declarations: any
  model: any
  enumerations: any[]
  models: any[]
  language: string
}

const Declarations: FC<iProps> = ({
  declarations,
  model,
  enumerations,
  models,
  language
}): ReactElement => {
  // Contexts
  const { t } = useContext(I18nContext)

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
          label={t(`Create new ${fieldType} Field`)}
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
            height:
              fieldType === 'Dropdown' || fieldType === 'Reference'
                ? language === 'ja-JP' || language === 'ar'
                  ? '720px'
                  : '700px'
                : language === 'ja-JP' || language === 'ar'
                ? '635px'
                : '610px',
            width: '600px'
          }}
        />
      )}

      <StyledDeclarations>
        <h3>{t('Fields')}</h3>

        <ul>
          {declarations.map((field: any) => {
            const disableDropdown = field.declaration === 'Dropdown' && enumerations.length === 0
            const disableReference = field.declaration === 'Reference' && models.length - 1 <= 1
            let disabledMessage = field.description

            if (disableDropdown) {
              disabledMessage = t('You should create at least 1 enumeration')
            }

            if (disableReference) {
              disabledMessage = t('You should have at least 2 models to create a Reference')
            }

            return (
              <li key={field.id}>
                <div>
                  <p>{t(field.declaration)}</p>

                  <div
                    className={`widgetOption ${
                      disableDropdown || disableReference ? 'disabled' : ''
                    }`}
                    title={disabledMessage}
                    onClick={(): void => {
                      if (!disableDropdown && !disableReference) {
                        setFieldType(field.declaration)
                        handleModal()
                      }
                    }}
                  >
                    <i
                      className={field.icon}
                      style={{ color: disableDropdown || disableReference ? 'gray' : field.color }}
                    />
                    &nbsp;
                    <span>{t(field.declaration)}</span>
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
