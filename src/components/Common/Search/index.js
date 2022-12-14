import React from 'react'
import styles from './search.module.css'
import searchIcon from '../../../assets/images/searchIcon.png'
import { useTranslation } from 'react-i18next'

export default ({
  state,
  setState,
  isProduction,
  setSearchValue,
  isLibrary,
}) => {
  const { t } = useTranslation()
  const search = (e) => {
    e.prevntDefault()
    setState({ ...state, ['left']: false })
  }
  const onChangeHandler = (event) => {
    setSearchValue(event.target.value)
  }
  return (
    <div className={styles['search-container']}>
      <input
        placeholder={t('header.searchPl')}
        name={'search'}
        onChange={onChangeHandler}
        id="searchId"
      />
      <label className={styles['img-container']} htmlFor="">
        <img src={searchIcon} alt="search icon" />
      </label>
    </div>
  )
}
