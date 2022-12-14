import React from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

const EmailVerification = () => {
  const navigate = useNavigate()
  const [seearchEmail, setSearchEmail] = useSearchParams()
  const [verification, setVerification] = useSearchParams()

  axios
    .post(`https://www.nashir.app/api/users/confirmEmail`, {
      email: seearchEmail.get('email'),
      verificationCode: verification.get('verification'),
    })
    .then((res) => navigate('/sign-in'))
    .catch((e) => console.log(e.message))
}

export default EmailVerification
