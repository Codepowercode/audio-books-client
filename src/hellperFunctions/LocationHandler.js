import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Registration from '../components/registration/Registration'
import SignUp from '../pages/Auth/signUp/SignUp'
import SignIn from '../pages/Auth/signIn/SignIn'

export function LocationHandler() {
  const { pathname } = useLocation()
  if (pathname === '/sign-up' || pathname === '/sign-in') {
    return (
      <>
        {/* <Registration />
                <Routes>
                    <Route path="sign-up" element={<SignUp />} />
                    <Route path="sign-in" element={<SignIn />} />
                </Routes> */}
      </>
    )
  }
}
