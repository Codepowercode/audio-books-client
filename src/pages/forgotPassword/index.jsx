import React, { useState, useEffect } from 'react'
import useInput from '../../hooks/use-input'
import useValidation from '../../hooks/use-validation'
import { useTranslation } from 'react-i18next'
import PageTitle from '../../components/Common/PageTitle'
import Input from '../../components/Common/UI/Input'
import styles from './forgotPassword.module.css'
import Button from '../../components/Common/UI/Button'
import axios from 'axios'
import useHttp from '../../hooks/use-http'
import { useSearchParams } from 'react-router-dom'

const ForgotPassword = () => {
  const { isEmail, isPassword } = useValidation()
  const [isUser, setIsUser] = useState(false)
  const { t, i18n } = useTranslation()
  const [message, setMessage] = useState(false)
  const [seearchEmail, setSearchEmail] = useSearchParams()
  const { error, isUserExist, sendRequest: sendUserData } = useHttp()
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail)

  const closeNotPopUpHandler = () => {
    setMessage(false)
  }
  useEffect(() => {
    if (isUserExist) {
      setIsUser(true)
      setTimeout(() => {
        setIsUser(false)
      }, 4000)
    }
  }, [isUserExist])

  const submitHandler = (e) => {
    e.preventDefault()
    if (!emailIsValid) {
      return
    }
    console.log('insideBlock')
    axios
      .post('https://www.nashir.app/api/auth/forgot-password', {
        email: emailValue,
      })
      .then((res) => setMessage(true))
    // sendUserData({
    //   method: 'POST',
    //   url: 'https://www.nashir.app/api/auth/forgot-password',
    //   data: {
    //     email: emailValue,
    //   },
    // })
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e.message))
  }

  return (
    <>
      <PageTitle text={t('forgotPassword.title')} />
      <div className={styles['forgotPassContainer']}>
        <form
          className={styles['forgotPassContainer_input']}
          onSubmit={(e) => submitHandler(e)}
        >
          <Input
            label={t('common.email')}
            hasError={emailHasError}
            isExistUser={isUser}
            errorMessage="Email address is invalid."
            input={{
              value: emailValue,
              id: 'email-phone',
              type: 'email',
              onChange: emailChangeHandler,
              onBlur: emailBlurHandler,
            }}
          />
          {isUser && (
            <span style={{ color: 'red' }}>
              User with this email already registered
            </span>
          )}
          <Button type="primary">{t('contactUs.submit')}</Button>
        </form>
        {message && (
          <>
            <div onClick={closeNotPopUpHandler} className={styles.backdrop} />
            <h3 className={styles.h3}>{t('forgotPassword.message')}</h3>
          </>
        )}
      </div>
    </>
  )
}

export default ForgotPassword
