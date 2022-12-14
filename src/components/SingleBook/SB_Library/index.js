import React from 'react'
import styles from './SB_Library.module.css'
import { useTranslation } from 'react-i18next'

export default ({ item }) => {
  const { t } = useTranslation()

  return (
    <div className={styles['container']}>
      <div>
        <span>{t('singleBook.narrator')}</span>
        <span>{item.bookNarrator}</span>
      </div>
      <div>
        <span>{t('singleBook.genre')}</span>
        <span>{item.genre}</span>
      </div>
      <div>
        <span>{t('singleBook.publicYear')}</span>
        <span>{item.yearOfPublishing}</span>
      </div>
    </div>
  )
}
