import React, { useState, useEffect } from 'react'
import styles from './app.module.css'
import { useLocation } from 'react-router-dom'
import Header from './components/main/header'
import Footer from './components/main/footer'
import axios from 'axios'
import { LocationHandler } from './hellperFunctions/LocationHandler'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from './redux/slice/auth'
import { setUser } from './redux/slice/user'
import Routes from './routes'
import jwtDecode from 'jwt-decode'

const App = () => {
  const location = useLocation()
  const token = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null
  const dispatch = useDispatch()
  let cutToken

  useEffect(() => {
    if (token) {
      cutToken = token.substring(1, token.length - 1)
    }
    axios
      .get('https://www.nashir.app/api/payments/get-user-subscription', {
        headers: {
          Authorization: 'Bearer ' + cutToken,
        },
      })
      .then((res) => {
        dispatch(setToken({ token: res.data['access_token'] }))
        dispatch(setUser({ user: jwtDecode(res.data['access_token']) }))
      })
  }, [token])
  return (
    <div className={styles['app-main']}>
      {!location.pathname.includes('/admin/') && <Header />}
      <LocationHandler />
      <Routes />
      {!(
        location.pathname === '/sign-up' ||
        location.pathname === '/sign-in' ||
        location.pathname === '/card-details' ||
        location.pathname === '/email-verify' ||
        location.pathname.includes('/admin/')
      ) && <Footer />}
    </div>
  )
}

export default App
