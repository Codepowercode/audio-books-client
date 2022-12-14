import React, { useState, useRef } from 'react'
import styles from './createBook.module.css'
import PageTitle from './../../components/Common/PageTitle'
import Input from '../../components/Common/UI/Input'
import Button from '../../components/Common/UI/Button'
import useInput from '../../hooks/use-input'
import useValidation from '../../hooks/use-validation'
import useHttp from '../../hooks/use-http'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default () => {
  const [message, setMessage] = useState(false)
  const { isEmail, isName, isNumber, isText } = useValidation()
  const { error, sendRequest: sendUserData } = useHttp()
  const auth = useSelector((state) => state.auth)
  const { t, i18n } = useTranslation()

  const { language } = i18n

  const navigate = useNavigate()

  const {
    value: bookValue,
    isValid: bookIsValid,
    hasError: bookHasError,
    valueChangeHandler: bookChangeHandler,
    inputBlurHandler: bookBlurHandler,
    reset: bookReset,
  } = useInput(isText)
  const {
    value: bookArValue,
    isValid: bookArIsValid,
    hasError: bookArHasError,
    valueChangeHandler: bookArChangeHandler,
    inputBlurHandler: bookArBlurHandler,
    reset: bookArReset,
  } = useInput(isText)
  const {
    value: authorArValue,
    isValid: authorArIsValid,
    hasError: authorArHasError,
    valueChangeHandler: authorArChangeHandler,
    inputBlurHandler: authorArBlurHandler,
    reset: authorArReset,
  } = useInput(isText)
  const {
    value: authorValue,
    isValid: authorIsValid,
    hasError: authorHasError,
    valueChangeHandler: authorChangeHandler,
    inputBlurHandler: authorBlurHandler,
    reset: authorReset,
  } = useInput(isText)
  const {
    value: yearValue,
    isValid: yearIsValid,
    hasError: yearHasError,
    valueChangeHandler: yearChangeHandler,
    inputBlurHandler: yearBlurHandler,
    reset: yearReset,
  } = useInput(isNumber)
  const {
    value: ISBNValue,
    isValid: ISBNIsValid,
    hasError: ISBNHasError,
    valueChangeHandler: ISBNChangeHandler,
    inputBlurHandler: ISBNBlurHandler,
    reset: ISBNReset,
  } = useInput(isNumber)
  const {
    value: pledgeValue,
    isValid: pledgeIsValid,
    hasError: pledgeHasError,
    valueChangeHandler: pledgeChangeHandler,
    inputBlurHandler: pledgeBlurHandler,
    reset: pledgeReset,
  } = useInput(isNumber)

  let formIsValid = false

  // if (
  //   bookIsValid &&
  //   authorIsValid &&
  //   yearIsValid &&
  //   ISBNIsValid &&
  //   pledgeIsValid &&
  //   authorArIsValid &&
  //   bookArIsValid
  // ) {
  //   formIsValid = true
  // }
  if (language === 'en') {
    if (
      bookIsValid &&
      authorIsValid &&
      yearIsValid &&
      ISBNIsValid &&
      pledgeIsValid
    ) {
      formIsValid = true
    }
  }
  if (language === 'ar') {
    if (
      bookArIsValid &&
      authorArIsValid &&
      yearIsValid &&
      ISBNIsValid &&
      pledgeIsValid
    ) {
      formIsValid = true
    }
  }

  const fetchedData = (data) => {
    setMessage((pre) => !pre)
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const closeNotPopUpHandler = () => {
    setMessage(false)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    // navigate('/email-verify', {
    //     state: {
    //         ...location.state,
    //         emailToVerify: emailValue,
    //     }
    // });
    if (!formIsValid) {
      return
    }

    sendUserData(
      {
        method: 'POST',
        url: 'https://www.nashir.app/api/books/createNotification',
        data: {
          nameEnglish: bookValue,
          nameArabic: bookArValue,
          authorEnglish: authorValue,
          authorArabic: authorArValue,
          yearOfPublishing: +yearValue,
          ISBN: +ISBNValue,
          kickoffPledge: +pledgeValue,
        },
        headers: { Authorization: `Bearer ${auth.accessToken}` },
      },
      fetchedData
    )
  }
  return (
    <div className={styles['main-container']}>
      <div className={styles['container']}>
        <PageTitle text={t('createProject.pageTitle')} />
        <p className={styles['description']}>{t('createProject.subTitle')}</p>

        <form className={styles['form']} onSubmit={submitHandler}>
          <Input
            label={t('createProject.bookTitleArabic')}
            dir={i18n.dir()}
            hasError={language === 'en' ? null : bookArHasError}
            errorMessage={
              language === 'en' ? null : t('createProject.required')
            }
            input={{
              value: bookArValue,
              id: 'book-name-ar',
              type: 'text',
              onChange: bookArChangeHandler,
              onBlur: language === 'en' ? null : bookArBlurHandler,
            }}
          />
          <Input
            label={t('createProject.title')}
            hasError={bookHasError}
            dir={i18n.dir()}
            // errorMessage="Book name is invalid."
            errorMessage={
              language === 'ar' ? null : t('createProject.required')
            }
            input={{
              value: bookValue,
              id: 'book-name',
              type: 'text',
              onChange: bookChangeHandler,
              onBlur: language === 'ar' ? null : bookBlurHandler,
            }}
          />

          <Input
            label={t('createProject.authorNameArabic')}
            dir={i18n.dir()}
            hasError={language === 'en' ? null : authorArHasError}
            errorMessage={
              language === 'en' ? null : t('createProject.required')
            }
            input={{
              value: authorArValue,
              id: 'author-ar',
              onChange: authorArChangeHandler,
              onBlur: language === 'en' ? null : authorArBlurHandler,
            }}
          />
          <Input
            dir={i18n.dir()}
            label={t('createProject.author')}
            hasError={authorHasError}
            // errorMessage="Author name must have one uppercase character."
            errorMessage={
              language === 'ar' ? null : t('createProject.required')
            }
            input={{
              value: authorValue,
              id: 'author',
              onChange: authorChangeHandler,
              onBlur: language === 'ar' ? null : authorBlurHandler,
            }}
          />
          <Input
            dir={i18n.dir()}
            label={t('createProject.yearOfProduction')}
            hasError={yearHasError}
            // errorMessage="Year of production must be 4 characters , numbers."
            errorMessage={t('createProject.required')}
            input={{
              value: yearValue,
              id: 'year-of-production',
              onChange: yearChangeHandler,
              onBlur: yearBlurHandler,
            }}
          />
          <Input
            dir={i18n.dir()}
            label={t('createProject.isbn')}
            hasError={ISBNHasError}
            // errorMessage="ISBN must be numbers."
            errorMessage={t('createProject.required')}
            input={{
              value: ISBNValue,
              id: 'ISBN',
              onChange: ISBNChangeHandler,
              onBlur: ISBNBlurHandler,
            }}
          />
          <div>
            <Input
              dir={i18n.dir()}
              label={t('createProject.pledge')}
              hasError={pledgeHasError}
              // errorMessage="Kickoff pledge must be numbers."
              errorMessage={t('createProject.required')}
              input={{
                // type="number"
                value: pledgeValue,
                id: 'your-kickoff-pledge',
                placeholder: '$',
                onChange: pledgeChangeHandler,
                onBlur: pledgeBlurHandler,
              }}
            />
            <span style={{ display: 'block' }} dir={i18n.dir()}>
              {t('createProject.amount')}
            </span>
          </div>
          <div className={styles['btn-container']}>
            <Button type="primary">{t('createProject.submit')}</Button>
          </div>
        </form>
      </div>
      {message && (
        <>
          <div onClick={closeNotPopUpHandler} className={styles.backdrop} />
          <h3 className={styles.h3}>
            After confirmation we will send you message to your email
          </h3>
        </>
      )}
    </div>
  )
}
