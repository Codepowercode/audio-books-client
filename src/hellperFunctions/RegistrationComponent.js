import React from 'react'
import { useLocation } from 'react-router-dom'
import SignIn from '../pages/Auth/signIn/SignIn'
import SignUp from '../pages/Auth/signUp/SignUp'

export const RegistrationComponent = () => {
  const { pathname } = useLocation()

  switch (pathname) {
    case pathname === 'sign-in':
      return <SignIn />
    case pathname === 'sign-up':
      return <SignUp />
  }
}
