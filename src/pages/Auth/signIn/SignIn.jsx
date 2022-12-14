import { Link, useNavigate } from 'react-router-dom'
import './style.signIn.css'
import Input from './../../../components/Common/UI/Input'
import Button from './../../../components/Common/UI/Button'
import PageTitle from './../../../components/Common/PageTitle'
import SignInImg from '../../../assets/images/signIn-photo.svg'
import Google from '../../../assets/images/icons/google.png'
import Facebook from '../../../assets/images/icons/facebook.png'
import useValidation from '../../../hooks/use-validation'
import useHttp from '../../../hooks/use-http'
import useInput from '../../../hooks/use-input'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { setToken } from '../../../redux/slice/auth'
import { setUser } from '../../../redux/slice/user'
import { useDispatch } from 'react-redux'
import jwtDecode from 'jwt-decode'
import { useLocation } from 'react-router-dom'

const SignIn = () => {
  const { isEmail, isPassword } = useValidation()
  const { error, sendRequest: sendUserData } = useHttp()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail)
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(isPassword)

  let formIsValid = false

  if (emailIsValid && passwordIsValid) {
    formIsValid = true
  }

  const fetchedData = (data) => {
    console.log(data)
    dispatch(setToken({ token: data.data['access_token'] }))
    dispatch(setUser({ user: jwtDecode(data.data['access_token']) }))

    if (location.state) {
      return navigate('/admin')
    } else {
      navigate('/')
    }
  }

  const submitHandler = (event) => {
    event.preventDefault()
    if (!formIsValid) {
      return
    }
    sendUserData(
      {
        method: 'POST',
        url: 'https://www.nashir.app/api/auth',
        data: {
          email: emailValue,
          password: passwordValue,
        },
      },
      fetchedData
    )

    emailReset()
    passwordReset()
  }

  return (
    <div className="main-signIn">
      <div className="sign-up-form row" dir={i18n.dir()}>
        <PageTitle text={t('common.signIn')} />
        <form className="w-100" onSubmit={(evt) => submitHandler(evt)}>
          <div className="input-container-sign-up">
            <Input
              label={t('common.email')}
              hasError={emailHasError}
              errorMessage="Email address is invalid."
              input={{
                value: emailValue,
                id: 'email-phone',
                type: 'email',
                onChange: emailChangeHandler,
                onBlur: emailBlurHandler,
              }}
            />
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
          </div>
          <span
            onClick={() => navigate('/forgot-password')}
            className="sign-in-forgot"
          >
            {t('signIn.frgPass')}
          </span>
          <div className="btn-container-signIn">
            <Button type="primary">{t('common.signIn')}</Button>
          </div>
        </form>
        {/* <p className="or-signIn">
          <span>{t('common.or')}</span>
        </p> */}
        {/* <div className="social_reg" dir="ltr">
          <button className="btn mb-2 w-100">
            <img src={Google} alt="Google" />
            <span className="ml-2">{t('common.wGoogle')}</span>
          </button>
          <button className="btn mb-2 w-100">
            <img src={Facebook} alt="Facebook" />
            <span className="ml-2">{t('common.wFacebook')}</span>
          </button>
        </div> */}
        <div className="col-12 text-center">
          <p>
            {t('signIn.haveAccount')}{' '}
            <Link to={'/sign-up'}>{t('common.signUp')}</Link>
          </p>
        </div>
      </div>
      <div className="sign-in-photo">
        <img src={SignInImg} alt="sign-in" />
        <p>{t('signIn.title')}</p>
      </div>
    </div>
  )
}

export default SignIn
