import React from 'react'
import styles from '../SingleBookPage/PledgedUsers/pledged.module.css'
import { useTranslation } from 'react-i18next'
import DefaultBookImg from '../../assets/images/defaultBook.png'

export default (props) => {
  const { t, i18n } = useTranslation()
  const total = props.data?.length
  let totalSum = 0

  return (
    <div className={styles['main-container']} dir={i18n.dir()}>
      <span className={styles['title']}>{t('donatedAudioBooks.title')}</span>
      {props.item
        ? props.item.map((item, index) => {
            totalSum += item.userDonated

            return (
              <div key={index} className={styles['pledged-container']}>
                <div className={styles['user-container']}>
                  {/* <img src={item.image} alt="User image" /> */}
                  {/* <span>{item.name}</span> */}
                  <img src={DefaultBookImg} alt="" />
                  <span>Book Name</span>
                </div>
                <span className={styles['pledged-size']}>
                  ${item.userDonated}
                </span>
                {/* <span className={styles['pledged-date']}>{item.date}</span> */}
              </div>
            )
          })
        : props.data.pledgers.map((item, index) => {
            totalSum += item.amount

            return (
              <div key={index} className={styles['pledged-container']}>
                <div className={styles['user-container']}>
                  {/* <img src={item.image} alt="User image" /> */}
                  {/* <span>{item.name}</span> */}
                  <img src={DefaultBookImg} alt="" />
                  <span>Book Name</span>
                </div>
                <span className={styles['pledged-size']}>${item.amount}</span>
                <span className={styles['pledged-date']}>{item.date}</span>
              </div>
            )
          })}

      <div className={styles['total-container']}>
        <div className={styles['total']}>
          {t('pledgedUser.total')}:
          <span className={styles['pledged-size']}>
            {' '}
            {total} {t('pledgedUser.users')}
          </span>
        </div>
        <span className={styles['pledged-size']}>${totalSum}</span>
      </div>
    </div>
  )
}
