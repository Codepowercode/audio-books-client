import React from 'react'
import styles from './navBar.module.css'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button, IconButton, useMediaQuery } from '@mui/material'
import NavbarBurger from './NavbarBurger'
import MenuIcon from '@mui/icons-material/Menu'
import LangDropDown from '../LangDropDown'
export default () => {
  const { t } = useTranslation()
  const isMobile = useMediaQuery('(max-width:1024px)')
  const location = useLocation()
  const [state, setState] = React.useState({
    left: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  return (
    <nav className={styles['nav-container']}>
      <NavbarBurger
        toggleDrawer={toggleDrawer}
        state={state}
        setState={setState}
      />
      {isMobile ? (
        <IconButton onClick={toggleDrawer('left', true)}>
          <MenuIcon />
        </IconButton>
      ) : (
        <ul className={styles['nav-bar']}>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/about-us' && styles['active']
            }`}
          >
            <Link to={'/about-us'}>{t('header.aboutUs')}</Link>
          </li>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/how-it-works' && styles['active']
            }`}
          >
            <Link to={'/how-it-works'}>{t('header.howItWorks')}</Link>
          </li>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/projects' && styles['active']
            }`}
          >
            <Link to={'/projects'}>{t('header.projects')}</Link>
          </li>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/production' && styles['active']
            }`}
          >
            <Link to={'/production'}>{t('header.production')}</Link>
          </li>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/create-book' && styles['active']
            }`}
          >
            <Link to={'/create-book'}>{t('header.startProject')}</Link>
          </li>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/subscription' && styles['active']
            }`}
          >
            <Link to={'/subscription'}>{t('header.subscription')}</Link>
          </li>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/library' && styles['active']
            }`}
          >
            <Link to="/library">{t('header.library')}</Link>
          </li>
          <li
            className={` ${styles['nav-link']} ${
              location.pathname === '/contact-us' && styles['active']
            }`}
          >
            <Link to={'/contact-us'}>{t('header.contactUs')}</Link>
          </li>
          <li>
            <LangDropDown />
          </li>
        </ul>
      )}
    </nav>
  )
}
