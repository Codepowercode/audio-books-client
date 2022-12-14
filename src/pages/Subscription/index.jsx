import React, { useState } from 'react'
import PageTitle from '../../components/Common/PageTitle'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './subscription.module.css'
import moment from 'moment'

const Subscription = () => {
  const token = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null
  const cutToken = token?.substring(1, token.length - 1)
  const [message, setMessage] = useState(false)
  const { t } = useTranslation()
  const { userSubscriptionDueTo, userSubscriptionActive } = useSelector(
    (store) => store.user.user
  )
  const { userId } = useSelector((store) => store.user.user)

  const navigate = useNavigate()

  const closeNotPopUpHandler = () => {
    setMessage(false)
  }
  const getSubscribe = (event, type) => {
    event.preventDefault()
    
    if (!userId) {
      return navigate('/sign-up')
    }
    if (userSubscriptionDueTo || userSubscriptionActive) {
      return setMessage(true)
    }

    axios
      .get(`https://www.nashir.app/api/payments/buy-subscription-${type}`, {
        headers: {
          Authorization: 'Bearer ' + cutToken,
        },
      })
      .then((res) => {
        window.location.replace(res.data)
      })
      .then((res) => console.log(res))
      .catch((e) => e.message())
  }
  return (
    <div>
      <PageTitle text={t('subscription.title')} />
      <div className={styles['subscription_container']}>
        <div>
          <h3>{t('subscription.typeMonth')}</h3>
          <p>{t('subscription.textMonth')}</p>
          <span className={styles['subscription_price']}>
            {t('subscription.priceMonth')}
          </span>
          <button onClick={(event) => getSubscribe(event, 'month')}>
            {t('subscription.subscribe')}
          </button>
        </div>
        <div>
          <h3>{t('subscription.typeAnnualy')}</h3>
          <p>{t('subscription.textAnnually')}</p>
          <span className={styles['subscription_price']}>
            {t('subscription.priceYear')}
          </span>
          <button onClick={(event) => getSubscribe(event, 'year')}>
            {t('subscription.subscribe')}
          </button>
        </div>
      </div>
      {message && (
        <>
          <div onClick={closeNotPopUpHandler} className={styles.backdrop} />
          <h3 className={styles.h3}>
            {`${t('subscription.haveSubscribtion')}
            ${moment(userSubscriptionDueTo).format('YYYY-MM-DD')}`}
          </h3>
        </>
      )}
    </div>
  )
}

export default Subscription
