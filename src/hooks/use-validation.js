import React from 'react'

const regExpName = /([A-Z][a-z]*)([\\s\\\'-][A-Z][a-z]*)*/
const regExpEmail = /\w+(\.|-|_)?\w+@\w+\.\w{2,3}/
const regExpPass =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
const regExpCardNumber = /^[0-9]{13,16}$/
const regExpCvv = /^[0-9]{3,4}$/
const regExpDate = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/
const regNumber = /^\d+$/

const isName = (value) => regExpName.test(value)
const isEmail = (value) => regExpEmail.test(value)
const isPassword = (value) => regExpPass.test(value)
const isCardNumber = (value) => regExpCardNumber.test(value)
const isCvv = (value) => regExpCvv.test(value)
const isExpDate = (value) => regExpDate.test(value)
const isNumber = (value) => regNumber.test(value)
const isText = (value) => value

const useValidation = () => {
  return {
    isName,
    isEmail,
    isPassword,
    isCardNumber,
    isCvv,
    isExpDate,
    isNumber,
    isText,
  }
}

export default useValidation
