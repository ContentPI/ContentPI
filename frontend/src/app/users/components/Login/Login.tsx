// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Alert, DarkButton, PrimaryButton, Input, RenderIf } from 'fogg-ui'
import { redirectTo } from 'fogg-utils'

// Contexts
import { FormContext } from '@contexts/form'

// Components
import Logo from '@shared/components/layouts/main/Logo'

// Interfaces
import { iUser } from '@interfaces'

// Styles
import styles from './Login.scss'

interface iProps {
  login(input: any): any
  currentUrl: string
}

const Login: FC<iProps> = ({ login, currentUrl }): ReactElement => {
  // States
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [invalidLogin, setInvalidLogin] = useState(false)

  // Contexts
  const { onChange } = useContext(FormContext)

  // Methods
  const _onChange = (e: any): any => {
    onChange(e, setValues)
  }

  const handleSubmit = async (user: iUser): Promise<void> => {
    const response = await login(user)

    if (response.error) {
      setInvalidLogin(true)
      setErrorMessage(response.message)
    } else {
      redirectTo(currentUrl || '/')
    }
  }

  return (
    <>
      <RenderIf isTrue={invalidLogin}>
        <Alert danger center flat>
          {errorMessage}
        </Alert>
      </RenderIf>

      <div className={styles.login}>
        <div className={styles.wrapper}>
          <div className={styles.form}>
            <div className={styles.logo}>
              <Logo />
            </div>

            <Input
              autoComplete="off"
              type="email"
              className={styles.email}
              name="email"
              placeholder="Email"
              onChange={_onChange}
              value={values.email}
            />

            <Input
              autoComplete="off"
              type="password"
              className={styles.password}
              name="password"
              placeholder="Password"
              onChange={_onChange}
              value={values.password}
            />

            <div className={styles.actions}>
              <div className={styles.left}>
                <DarkButton name="login" onClick={(): Promise<void> => handleSubmit(values)}>
                  Login
                </DarkButton>
                &nbsp;
                <PrimaryButton name="register">Register</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(Login)
