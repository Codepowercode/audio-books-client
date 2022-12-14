import React, { useState, useEffect } from 'react'
import styles from './contactUs.module.css'
import PageTitle from './../../components/Common/PageTitle'
import Input from '../../components/Common/UI/Input'
import Button from '../../components/Common/UI/Button'
import DropDown from '../../components/Common/DropDown'
// import { prodStatus } from '../../components/DummyData'
import { useTranslation } from 'react-i18next'
import useValidation from '../../hooks/use-validation'
import useHttp from '../../hooks/use-http'
import useInput from '../../hooks/use-input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default () => {
  const { t, i18n } = useTranslation()
  const [messageSend, setMessageSend] = useState(false)
  const { isEmail, isName, isNumber, isText } = useValidation()
  const [inquiry, setInquiry] = useState()
  const prodStatus = [
    {
      title: 'chose 1',
    },
    {
      title: 'chose 2',
    },
    {
      title: 'chose 3',
    },
  ]
  useEffect(() => {
    axios
      .get('https://www.nashir.app/api/contact-us/getOptions')
      .then((res) => setInquiry(res.data))
      .catch((e) => console.log(e.message))
  }, [])

  const closeNotPopUpHandler = () => {
    setMessageSend(false)
  }
  const navigate = useNavigate()

  const [choice, setChoice] = useState('')
 
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isText)

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail)

  const {
    value: message,
    isValid: messageIsValid,
    hasError: messageHasError,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: messageReset,
  } = useInput(isText)

  const submitHandler = (event) => {
    event.preventDefault()

    axios
      .post('https://www.nashir.app/api/contact-us/createmessage', {
        name,
        email,
        message,
        option: choice || 1,
      })
      .then((res) => {
        setMessageSend((pre) => !pre)
        setTimeout(() => {
          navigate('/')
        }, 3000)
      })
      .catch((e) => console.log(e.message))

    // if (!formIsValid) {
    //   return
    // }
  
  }

 

  return (
    <div className={styles['main-container']} dir={i18n.dir()}>
      <div className={styles['container']}>
        <PageTitle text={t('contactUs.title')} />
        <form
          className={styles['from']}
          onSubmit={(event) => submitHandler(event)}
        >
          <Input
            label={t('common.name')}
            // hasError={emailHasError}
            // errorMessage='Email address is invalid.'
            input={{
              value: name,
              id: 'name',
              type: 'text',
              onChange: nameChangeHandler,
              // onBlur:emailBlurHandler,
            }}
          />
          <Input
            label={t('common.email')}
            // hasError={emailHasError}
            // errorMessage='Email address is invalid.'
            input={{
              name: email,
              id: 'email',
              type: 'email',
              onChange: emailChangeHandler,
              // onBlur:emailBlurHandler,
            }}
          />
          {inquiry && (
            <DropDown
              title={t('contactUs.inquiry')}
              type="sample-one"
              data={{
                dropMenuItems: inquiry,
                setChoice,
              }}
              isContact={true}
            />
          )}

          <Input
            label={t('contactUs.message')}
            // hasError={emailHasError}
            // errorMessage='Email address is invalid.'
            input={{
              type: 'textarea',
              name: message,
              id: 'Message',
              type: 'text',
              onChange: messageChangeHandler,
              // onBlur:emailBlurHandler,
            }}
          />
          <div
            className={styles['btn-container']}
            onClick={(event) => submitHandler(event)}
          >
            <Button type="primary">{t('contactUs.submit')}</Button>
          </div>
        </form>
      </div>
      {messageSend && (
        <>
          <div onClick={closeNotPopUpHandler} className={styles.backdrop} />
          <h3 className={styles.h3}>Your message has been sent</h3>
        </>
      )}
    </div>
  )
}
