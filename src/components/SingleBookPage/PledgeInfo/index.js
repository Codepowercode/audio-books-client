import React, { useState } from 'react'
import styles from './pledgeInfo.module.css'
import ProgressBarLine from '../../Common/ProgressBar/ProgressBarLine'
import { useTranslation } from 'react-i18next'
import PopUpPledge from '../../SingleBook/SB_Projects/PopUpPledge'
import { useNavigate } from 'react-router-dom'

export default (props) => {
  const [popUpIsOpen, setPopUpIsOpen] = useState(false)
  const { t } = useTranslation()
  const popUpOpenHandler = () => {
    setPopUpIsOpen((pre) => !pre)
  }

  const token = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null
  const navigate = useNavigate()

  return (
    <div className={styles['main-container']}>
      <div className={styles['info-container']}>
        <div>
          <span className={styles['odd']}>{t('singleBook.goal')}</span>
          <span className={`${styles['even']} ${styles['goal']}`}>
            ${props.goal}
          </span>
        </div>
        <div>
          <span className={styles['odd']}>{t('singleBook.donated')}</span>
          <span className={styles['even']}>${props.donated}</span>
        </div>
        <div>
          <span className={styles['odd']}>{t('singleBook.time')}</span>
          <span className={styles['even']}>
            {props.deadline &&
              props.deadline.slice(0, props.deadline.length - 14)}
          </span>
        </div>
      </div>
      <ProgressBarLine progress={(props.donated / props.goal) * 100} />
      <button style={{ cursor: 'pointer' }} onClick={popUpOpenHandler}>
        {t('common.pledge')}
      </button>
      {popUpIsOpen && token ? (
        <PopUpPledge
          popUpHandler={popUpOpenHandler}
          data={{
            id: props.id,
            goal: props.goal,
            donated: props.donated,
            deadline: props?.deadline?.slice(0, props.deadline.length - 14),
          }}
        />
      ) : (
        !token && popUpIsOpen && navigate('/sign-up')
      )}
    </div>
  )
}
