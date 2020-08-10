// Dependencies
import React, { FC, ReactElement, memo } from 'react'
import { cx } from 'fogg-utils'
import { Icon } from 'fogg-ui'

// Styles
import styles from './Fields.scss'

interface iProps {
  fields: any
  showSystem: boolean
}

const Fields: FC<iProps> = ({ fields, showSystem }): ReactElement => {
  return (
    <>
      <div className={styles.fields}>
        {fields.map((field: any) => (
          <div
            key={field.id}
            className={cx(
              styles.field,
              field.isSystem ? styles.sys : styles[field.type],
              field.isSystem && !showSystem ? styles.hideSys : ''
            )}
          >
            <div className={cx(styles.icon, styles[field.type])}>
              {field.type === 'ID' && (
                <Icon title={field.description} className={styles.id}>
                  ID
                </Icon>
              )}
              {field.type === 'Integer' && (
                <Icon title={field.description} className={styles.integer}>
                  10
                </Icon>
              )}
              {field.type === 'Float' && (
                <Icon title={field.description} className={styles.float}>
                  1.0
                </Icon>
              )}
              {field.type === 'DateTime' && <Icon title={field.description} type="fas fa-clock" />}
              {field.type === 'Status' && (
                <Icon title={field.description} type="fas fa-low-vision" />
              )}
              {field.type === 'String' && <Icon title={field.description} type="fas fa-font" />}
              {field.type === 'Text' && (
                <Icon title={field.description} type="fas fa-quote-right" />
              )}
              {field.type === 'Media' && <Icon title={field.description} type="fas fa-image" />}
              {field.type === 'Boolean' && (
                <Icon title={field.description} type="fas fa-toggle-on" />
              )}
              {field.type === 'Dropdown' && (
                <Icon title={field.description} type="fas fa-caret-square-down" />
              )}
            </div>

            <div className={styles.name}>
              {field.fieldName}
              <span className={styles.identifier}>#{field.identifier}</span>

              <div className={styles.information}>
                {field.type !== 'Media' && (
                  <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                    {field.type}
                  </span>
                )}
                {field.isPrimaryKey && (
                  <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                    Primary Key
                  </span>
                )}
                {field.isRequired && (
                  <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                    Required
                  </span>
                )}
                {field.isUnique && (
                  <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                    Unique
                  </span>
                )}
                {field.isMedia && (
                  <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>Media</span>
                )}
                {field.isHide && (
                  <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>Hide</span>
                )}
                {field.isSystem && (
                  <span className={cx(styles.tag, field.isSystem ? styles.system : '')}>
                    System Field
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default memo(Fields)
