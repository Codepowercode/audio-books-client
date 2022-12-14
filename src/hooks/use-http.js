import React from 'react'
import { useState, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isUserExist, setIsUserExist] = useState(false)
  const navigate = useNavigate()

  const sendRequest = useCallback(async (requestConfig, applyData, state) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios({
        method: requestConfig.method ? requestConfig.method : 'GET',
        url: requestConfig.url,
        data: requestConfig.data ? requestConfig.data : null,
        headers: requestConfig.headers ? requestConfig.headers : {},
      })

      applyData(response)
      if (state) {
        return navigate('/email-verify', {
          state: state,
        })
      }
    } catch (err) {
      const isError = (await err.response?.data?.status) === 403
      if (isError) {
        setIsUserExist(true)
      } else {
        setError('Something went wrong!')
      }
    }
    setIsLoading(false)
  }, [])

  return {
    isLoading,
    error,
    isUserExist,
    sendRequest,
  }
}

export default useHttp

// const submitHandler = (event) => {
//     event.preventDefault();
//     if (!formIsValid) {
//         return
//     }
//     sendUserData({
//         method: 'POST',
//         url: 'https://lilies.herokuapp.com/auth/registration',
//         data: {
//             "name": firstNameValue,
//             "email": emailValue,
//             "password": passwordValue,
//         }
//     }, fetchedData);
//
//     firstNameReset();
//     emailReset();
//     passwordReset();
// };

// const {isName, isEmail, isPassword} = useValidation();
// const {error, sendRequest: sendUserData} = useHttp();
//
// const {
//     value: firstNameValue,
//     isValid: firstNameIsValid,
//     hasError: firstNameHasError,
//     valueChangeHandler: firstNameChangeHandler,
//     inputBlurHandler: firstNameBlurHandler,
//     reset: firstNameReset,
// } = useInput(isName);
