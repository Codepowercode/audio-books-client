import React, { useState } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import PageTitle from '../../components/Common/PageTitle'
import Input from '../../components/Common/UI/Input'
import useInput from '../../hooks/use-input'
import styles from './resetPassword.module.css'
import Button from '../../components/Common/UI/Button'
import useValidation from '../../hooks/use-validation'
import { useSearchParams, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
  const { isPassword } = useValidation()
  const { t, i18n } = useTranslation()
  const [message, setMessage] = useState(false)
  const [token, setToken] = useSearchParams()
  const navigate = useNavigate()
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(isPassword)

  const closeNotPopUpHandler = () => {
    setMessage(false)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (!passwordIsValid) {
      return
    }
    axios
      .post('https://www.nashir.app/api/auth/reset-password', {
        token: token.get('token'),
        password: passwordValue,
      })
      .then((res) => navigate('/sign-in'))
      .catch((e) => console.log(e.message))
  }

  return (
    <>
      <PageTitle text={t('resetPassword.title')} />
      <div className={styles['ressetPassContainer']}>
        <form
          className={styles['ressetPassContainer_input']}
          onSubmit={(e) => submitHandler(e)}
        >
          <Input
            label={t('common.password')}
            hasError={passwordHasError}
            errorMessage="Password must be 8 characters or more, have upper and lower case letters, numbers, and special characters."
            input={{
              value: passwordValue,
              id: 'password',
              type: 'password',
              onChange: passwordChangeHandler,
              onBlur: passwordBlurHandler,
            }}
          />
          <Button type="primary">{t('contactUs.submit')}</Button>
        </form>
        {message && (
          <>
            <div onClick={closeNotPopUpHandler} className={styles.backdrop} />
            <h3 className={styles.h3}>We sent a message to your email</h3>
          </>
        )}
      </div>
    </>
  )
}

export default ResetPassword
