// Dependencies
import React, { FC } from 'react'
import { DarkButton, PrimaryButton, Input } from 'fogg-ui'
import { cx } from 'fogg-utils'

// Components
import Logo from '@shared/components/layouts/main/Logo'

// Styles
import styles from './Login.scss'

const Login: FC = () => {
  return (
    <>
      <div className={styles.login}>
        <div className={cx(styles.wrapper)}>
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
            />

            <Input
              autoComplete="off"
              type="password"
              className={styles.password}
              name="password"
              placeholder="Password"
            />

            <div className={styles.actions}>
              <div className={styles.left}>
                <DarkButton name="login">Login</DarkButton>
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

export default Login
