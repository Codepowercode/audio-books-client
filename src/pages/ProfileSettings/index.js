import React, { useEffect, useState } from 'react'
import styles from './profileSettings.module.css'
import Input from './../../components/Common/UI/Input'
import Button from './../../components/Common/UI/Button'
import Checkbox from './../../components/Common/UI/Checkbox'
import userImg from './../../assets/images/userImgBig.png'
import camera from './../../assets/images/camera.png'
import useValidation from '../../hooks/use-validation'
import useInput from '../../hooks/use-input'
import { useTranslation } from 'react-i18next'
import { checkboxData } from '../../components/DummyData'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { removeToken, setToken } from '../../redux/slice/auth'
import { removeUser, setUser } from '../../redux/slice/user'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

export default () => {
  const [selectedImage, setSelectedImage] = useState()
  const [sendImage, setSendImage] = useState()

  const { t, i18n } = useTranslation()
  const { user } = useSelector((store) => store.user)
  const token = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null
  let cutToken = token.substring(1, token.length - 1)
  const [inputValue, setInputValue] = useState({
    email: user.userEmail,
    userName: user.userName,
  })
  const [checkData, setCheckData] = useState()
  const [valueBack, setValueBack] = useState()
  const [gender, setGender] = useState('Male')
  const [message, setMessage] = useState(false)

  const inputChangeHandler = (e) => {
    console.log(e.target.value, e.target.name)
    e.preventDefault()
    setValueBack({
      ...valueBack,
      [e.target.name]: e.target.value,
    })
  }
  const closeNotPopUpHandler = () => {
    setMessage(false)
  }
  const { isEmail, isPassword } = useValidation()
  let formIsValid = false
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // const {
  //   value: emailValue,
  //   isValid: emailIsValid,
  //   hasError: emailHasError,
  //   valueChangeHandler: emailChangeHandler,
  //   inputBlurHandler: emailBlurHandler,
  //   reset: emailReset,
  //   disabled: emailIsDisabled,
  // } = useInput(isEmail)

  // const {
  //   value: nameValue,
  //   isValid: nameIsValid,
  //   hasError: nameHasError,
  //   valueChangeHandler: nameChangeHandler,
  //   inputBlurHandler: nameBlurHandler,
  //   reset: nameReset,
  //   disabled: nameIsDisabled,
  // } = useInput(isEmail)

  const {
    value: countryValue,
    isValid: countryIsValid,
    hasError: countryHasError,
    valueChangeHandler: countryChangeHandler,
    inputBlurHandler: countryBlurHandler,
    reset: countryReset,
    disabled: countryIsDisabled,
  } = useInput(isEmail)

  const {
    value: birthdayValue,
    isValid: birthdayIsValid,
    hasError: birthdayHasError,
    valueChangeHandler: birthdayChangeHandler,
    inputBlurHandler: birthdayBlurHandler,
    reset: birthdayReset,
    disabled: birthdayIsDisabled,
  } = useInput(isEmail)

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(isPassword)

  useEffect(() => {
    const formData = new FormData()
    formData.append('image', sendImage)

    axios({
      method: 'post',
      url: 'https://www.nashir.app/api/users/changePersonalAvatar',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + cutToken,
      },
    })
      .then((res) => {
        dispatch(setToken({ token: res.data['access_token'] }))
        dispatch(setUser({ user: jwtDecode(res.data['access_token']) }))
      })
      .catch((e) => console.log(e.message))
  }, [sendImage])

  useEffect(() => {
    axios
      .get(`https://www.nashir.app/api/users/getPersonalInfo`, {
        headers: {
          Authorization: 'Bearer ' + cutToken,
        },
      })
      .then((res) => {
        setValueBack(res.data)
        setSelectedImage(res.data.imagePath)
        const isGender = res.data.gender ? 'Male' : 'Female'
        const isGender1 = isGender === 'Male' ? 'Female' : 'Male'

        setGender(isGender)
        setCheckData([
          {
            text: isGender,
          },
          {
            text: isGender1,
          },
        ])
      })
      .catch((e) => console.log(e.message))
  }, [])

  const imageChangeHandler = (evt) => {
    const [file] = evt.target.files
    setSelectedImage(URL.createObjectURL(file))
    setSendImage(file)
  }
  if (passwordIsValid) {
    formIsValid = true
  }

  const checkboxHandler = (val) => {
    setGender(val)
  }

  const submitHandler = (evt) => {
    evt.preventDefault()
    if (formIsValid && passwordValue) {
      const genderItem = gender === 'male' ? true : false
      const birthday = moment(valueBack.birthday).format('YYYY-MM-DD')
      axios
        .post(
          `https://www.nashir.app/api/users/changePersonalInfo`,
          {
            email: valueBack.email,
            password: passwordValue,
            name: valueBack.name,
            birthday: birthday,
            gender: genderItem,
            country: valueBack.country,
          },
          {
            headers: {
              Authorization: 'Bearer ' + cutToken,
            },
          }
        )
        .then((res) => {
          dispatch(removeToken()) && dispatch(removeUser())
          navigate('/sign-in')
        })
    } else {
      const genderItem = gender === 'male' ? true : false
      const birthday = moment(valueBack.birthday).format('YYYY-MM-DD')
      axios
        .post(
          `https://www.nashir.app/api/users/changePersonalInfo`,
          {
            email: valueBack.email,
            // password: passwordValue,
            name: valueBack.name,
            birthday: birthday,
            gender: genderItem,
            country: valueBack.country,
          },
          {
            headers: {
              Authorization: 'Bearer ' + cutToken,
            },
          }
        )
        .then((res) => {
          dispatch(setToken({ token: res.data['access_token'] }))
          dispatch(setUser({ user: jwtDecode(res.data['access_token']) }))
          setMessage(true)
        })
    }
  }

  return (
    <div className={styles['main-container']}>
      <section className={styles['container']} dir={i18n.dir()}>
        <div className={styles['dir']} dir="ltr">
          <span dir="ltr">{t('profileSettings.account')} </span>
          <span dir="ltr"> {t('profileSettings.title')}</span>
        </div>
        <div className={styles['middle-area']}>
          <span className={styles['title']}>{t('profileSettings.title')}</span>
          <div className={styles['form-container']}>
            <div className={styles['image-box']}>
              <img src={selectedImage} alt="user image" />
              <label
                className={styles['camera-icon']}
                htmlFor={'camera-icon-id'}
              >
                <input
                  id="camera-icon-id"
                  type={'file'}
                  onChange={imageChangeHandler}
                />
                <img src={camera} alt="camera icon" />
              </label>
            </div>
            {valueBack && (
              <form className={styles['from']} onSubmit={submitHandler}>
                {/* <Input
                label={t('common.email')}
                // hasError={emailHasError}
                // errorMessage='Email address is invalid.'

                input={{
                  id: 'email',
                  type: 'email',
                  value: inputValue.email,
                  onChange: emailChangeHandler,
                  onBlur: emailBlurHandler,
                }}
              /> */}
                {/* <label className={styles['inputLabel']}>
                {t('common.email')}
              </label>
              <input
                className={styles['inputMain']}
                type="email"
                value={inputValue.email}
                defaultValue={inputValue.email}
                name="email"
                onChange={(e) => inputChangeHandler(e)}
              /> */}
                <label className={styles['inputLabel']}>
                  {t('common.name')}
                </label>
                <input
                  className={styles['inputMain']}
                  type="text"
                  value={valueBack.name}
                  name="name"
                  onChange={(e) => inputChangeHandler(e)}
                />
                {/* <Input
                label={t('common.name')}
                // hasError={emailHasError}
                // errorMessage='Email address is invalid.'

                input={{
                  id: 'name',
                  value: nameIsDisabled ? `${inputValue.userName}` : nameValue,
                  onChange: nameChangeHandler,
                  onBlur: nameBlurHandler,
                }}
              /> */}
                <Checkbox
                  title={t('profileSettings.gender')}
                  data={checkboxData}
                  onChangeGender={checkboxHandler}
                  checkData={checkData}
                />
                {/* <Input
                label={t('profileSettings.country')}
                // hasError={emailHasError}
                // errorMessage='Email address is invalid.'

                input={{
                  id: 'country',
                  value: countryIsDisabled ? 'Dubai' : countryValue,
                  onChange: countryChangeHandler,
                  onBlur: countryBlurHandler,
                }}
              /> */}
                {/* <Input
                  label={t('profileSettings.bDay')}
                  // hasError={emailHasError}
                  // errorMessage='Email address is invalid.'

                  input={{
                    type: 'date',
                    id: 'date-of-birthday',
                    value: birthdayIsDisabled ? '21 apr 1999' : birthdayValue,
                    onChange: birthdayChangeHandler,
                    onBlur: birthdayBlurHandler,
                  }}
                /> */}
                <label className={styles['inputLabel']}>
                  {t('profileSettings.bDay')}
                </label>
                <input
                  className={styles['inputMain']}
                  type={'date'}
                  name="birthday"
                  defaultValue={moment(valueBack.birthday).format('YYYY-MM-DD')}
                  onChange={(e) => inputChangeHandler(e)}
                />
                <label className={styles['inputLabel']}>
                  {t('profileSettings.country')}
                </label>
                <input
                  className={styles['inputMain']}
                  type={'text'}
                  name="country"
                  value={valueBack.country}
                  onChange={(e) => inputChangeHandler(e)}
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
                <div className={styles['button-container']}>
                  <Button type="cancel">{t('common.cancel')}</Button>
                  <Button type="primary">{t('common.save')}</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      {message && (
        <>
          <div onClick={closeNotPopUpHandler} className={styles.backdrop} />
          <h3 className={styles.h3}>Changes are done</h3>
        </>
      )}
    </div>
  )
}
