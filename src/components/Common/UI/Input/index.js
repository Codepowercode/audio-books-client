import styles from './Input.module.css'
import React, { useState } from 'react'
import showHideIcon from './../../../../assets/images/showHide.png'
import editIcon from './../../../../assets/images/editIcon.png'

export default ({
  dir,
  input,
  isMatch = true,
  label,
  errorMessage,
  hasError,
  isTouched,
  type,
  disabled = false,
  isExistUser,
}) => {
  const [inputShow, setInputShow] = useState(input.type || 'text')
  const [isDisabled, setIsDisabled] = useState(disabled)
  console.log(dir, 'dir')
  const changeEditable = () => {
    setIsDisabled((pre) => !pre)
  }

  const showHideChangeHandler = () => {
    setInputShow((pre) => (pre === 'password' ? 'text' : 'password'))
  }

  return (
    <div className={styles['main-container']} dir={dir}>
      {label && (
        <label htmlFor={input.id} className={styles.label}>
          {label}
        </label>
      )}
      {type !== 'textarea' ? (
        <div className={styles['input-container']}>
          <input
            style={
              isExistUser ? { border: '1px solid red' } : { border: 'none' }
            }
            {...input}
            type={inputShow}
            // className={
            //   dir === 'rtl' && input.type !== 'number'
            //     ? styles['rtl-style']
            //     : ''
            // }
            // dir="ltr"
            disabled={isDisabled}
          />

          {input.type === 'password' && !isDisabled && (
            <img
              src={showHideIcon}
              alt="show hide"
              className={
                styles[`${dir === 'rtl' ? 'rtl-hide-icon' : 'show-hide-icon'}`]
              }
              onClick={showHideChangeHandler}
            />
          )}

          {isDisabled && (
            <img
              src={editIcon}
              alt="edit icon"
              className={`${
                dir === 'rtl' ? 'rtl-hide-icon' : 'show-hide-icon'
              }`}
              onClick={changeEditable}
            />
          )}
        </div>
      ) : (
        <textarea className={styles['textarea']} />
      )}
      {hasError && (
        <p
          className={styles['errorAlert']}
          style={
            dir === 'rtl'
              ? {
                  textAlign: 'right',
                }
              : null
          }
        >
          {errorMessage}
        </p>
      )}
      {!hasError && !isMatch && isTouched && (
        <p className={styles['errorAlert']}>Password is not match!</p>
      )}
    </div>
  )
}
