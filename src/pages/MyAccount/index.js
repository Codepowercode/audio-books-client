import React from 'react'
import styles from './myAccount.module.css'
import PageTitle from './../../components/Common/PageTitle'
import { myAccountData, myAccountDataArabic } from '../../components/DummyData'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default () => {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { language } = i18n

  return (
    <div className={styles['main-container']}>
      <PageTitle text={t('myAccount.title')} />
      <div className={styles['categories-container']}>
        {language === 'en'
          ? myAccountData.map((item, index) => (
              <div
                key={index}
                className={styles['category']}
                onClick={() => navigate(item.url)}
              >
                <span>{item.title}</span>
                {/* <p>{item.description}</p> */}
              </div>
            ))
          : myAccountDataArabic.map((item, index) => (
              <div
                key={index}
                className={styles['category']}
                onClick={() => navigate(item.url)}
              >
                <span>{item.title}</span>
                {/* <p>{item.description}</p> */}
              </div>
            ))}
      </div>
    </div>
  )
}
