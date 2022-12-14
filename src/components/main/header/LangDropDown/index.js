import React, { useState } from 'react'
import styles from './langDropDown.module.css'
import globeIcon from './../../../../assets/images/globe.png'
import ddIcon from './../../../../assets/images/arrowDown.png'
import { useTranslation, Trans } from 'react-i18next'

export default ({ state, setState }) => {
  const [ddIsOpen, setDDIsOpen] = useState(false)
  const [ddItem, setDDItem] = useState(
    JSON.parse(localStorage.getItem('lang')) || 'ع'
  )
  const { i18n } = useTranslation()

  const ddOpenHandler = () => {
    setDDIsOpen((pre) => !pre)
  }

  const ddItemChangeHandler = (evt) => {
    setDDItem(evt.target.innerText)
    i18n.changeLanguage(evt.target.dataset.value)
    localStorage.setItem('lang', JSON.stringify(evt.target.innerText))
    //state
    // setState({ ...state, ['left']: false })
  }

  return (
    <div className={styles['main-container']} onClick={ddOpenHandler}>
      <img src={globeIcon} alt="globe icon" className={styles['globe-icon']} />
      <span>{ddItem}</span>
      <img src={ddIcon} alt="arrow down" className={styles['arrow-icon']} />
      {ddIsOpen && (
        <ul className={styles['dd-items']}>
          <li data-value="en" onClick={(evt) => ddItemChangeHandler(evt)}>
            En
          </li>
          <li data-value="ar" onClick={(evt) => ddItemChangeHandler(evt)}>
            ع
          </li>
        </ul>
      )}
    </div>
  )
}
