// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { Badge, Icon, Input, TextArea } from 'fogg-ui'
import { cx } from 'fogg-utils'

// Constants
import { CONTENT_LINK } from '@constants/links'

// Shared components
import Link from '@ui/Link'

// Styles
import styles from './CustomFields.scss'

interface iProps {
  action: string
  active: string
  customFields: any
  getModel: any
  handleActive: any
  onChange: any
  required: any
  router: any
  values: any
  setValues: any
}

const CustomFields: FC<iProps> = ({
  active,
  customFields,
  getModel,
  handleActive,
  onChange,
  required,
  router,
  values
}): ReactElement => {
  return (
    <div className={styles.customFields}>
      <div className={styles.fields}>
        <div className={styles.goBack}>
          <Link href={CONTENT_LINK(router).as} title={`Go back to ${getModel.modelName}`}>
            <Icon type="fas fa-chevron-left" />
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Badge className={styles.badge}>{getModel.modelName}</Badge>
          <div className={styles.entryTitle}>{values.title || <>New {getModel.modelName}</>}</div>
        </div>

        {customFields.map((field: any) => (
          <div
            key={field.id}
            className={cx(
              styles.field,
              active === field.identifier ? styles.active : '',
              required[field.identifier] ? styles.red : ''
            )}
            onClick={(): void => handleActive(field.identifier)}
          >
            <div>
              <label>
                {field.fieldName}{' '}
                {field.isRequired && (
                  <span className={cx(styles.tag, required[field.identifier] ? styles.red : '')}>
                    Required
                  </span>
                )}
              </label>
            </div>

            {field.type === 'String' && (
              <div className={styles[field.type.toLowerCase()]}>
                <Input
                  type="text"
                  hasError={required[field.identifier]}
                  name={field.identifier}
                  onChange={onChange}
                  placeholder={field.fieldName}
                  value={values[field.identifier]}
                />
              </div>
            )}

            {field.type === 'Text' && (
              <div className={styles[field.type.toLowerCase()]}>
                <TextArea
                  name={field.identifier}
                  hasError={required[field.identifier]}
                  placeholder={field.fieldName}
                  onChange={onChange}
                  value={values[field.identifier]}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(CustomFields)
