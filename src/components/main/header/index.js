import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styles from './header.module.css'
import Search from './../../Common/Search'
import Button from './../../Common/UI/Button'
import NavBar from './NavBar'
import LangDropDown from './LangDropDown'
import UserInfo from './UserInfo'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { i18n } from 'i18next'
import { useMediaQuery } from '@mui/material'
import Logo from '../../../assets/images/mainLogo.png'

export default () => {
  const { t, i18n } = useTranslation()
  const auth = useSelector((state) => state.auth)
  const isMobile = useMediaQuery('(max-width:1024px)')
  return (
    <header className={styles['header']} dir={i18n.dir()}>
      <div className={styles['container']}>
        <Link to={'/'}>
          <div className={styles['logo']}>
            <img src={Logo} />
          </div>
        </Link>
        {/*<button className="navbar-toggler" type="button" data-toggle="collapse"*/}
        {/*        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"*/}
        {/*        aria-expanded="false" aria-label="Toggle navigation">*/}
        {/*    <span className="navbar-toggler-icon"/>*/}
        {/*</button>*/}

        {/*<div className={styles["navbar_collapse"]} id="navbarSupportedContent">*/}
        <NavBar />
        {!isMobile && (
          <div className={styles['search-sign-container']}>
            <div className={styles['search-side']}>
              {/* {!isMobile && <Search />} */}
              {!isMobile }
            </div>
            {!isMobile && (
              <>
                {auth.accessToken === null && (
                  <div className={styles['header-button-container']}>
                    <Button type="text" url={'/sign-up'}>
                      {t('common.signUp')}
                    </Button>
                    <Button type="primary" url={'/sign-in'}>
                      {t('common.signIn')}
                    </Button>
                  </div>
                )}
                {auth.accessToken && <UserInfo />}
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
