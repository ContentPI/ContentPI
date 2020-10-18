// Dependencies
import React, { FC, ReactElement, useState, useContext, memo } from 'react'
import { Alert, DarkButton, PrimaryButton, Input, RenderIf } from 'fogg-ui'
import { redirectTo } from 'fogg-utils'

// Contexts
import { FormContext } from '@contexts/form'
import { ContentContext } from '@contexts/content'

// Components
import Logo from '@shared/components/layouts/main/Logo'

// Interfaces
import { iUser } from '@interfaces'

// Styles
import { StyledLogin } from './Login.styled'

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
  const { t, language } = useContext(ContentContext)

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
      redirectTo(currentUrl || '/', true)
    }
  }

  return (
    <>
      <RenderIf isTrue={invalidLogin}>
        <Alert danger center flat>
          {errorMessage}
        </Alert>
      </RenderIf>

      <StyledLogin>
        <div className="wrapper">
          <div className="form">
            <div className="logo">
              <Logo language={language} />
            </div>

            <Input
              autoComplete="off"
              type="email"
              className="email"
              name="email"
              placeholder={t('Email')}
              onChange={_onChange}
              value={values.email}
            />

            <Input
              autoComplete="off"
              type="password"
              className="password"
              name="password"
              placeholder={t('Password')}
              onChange={_onChange}
              value={values.password}
            />

            <div className="actions">
              <div className="left">
                <DarkButton name="login" onClick={(): Promise<void> => handleSubmit(values)}>
                  {t('Login')}
                </DarkButton>
                &nbsp;
                <PrimaryButton name="register">{t('Register')}</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </StyledLogin>
    </>
  )
}

export default memo(Login)
