import React, { useState } from 'react'
import styles from './SB_Projects.module.css'
import ProgressBarLine from '../../Common/ProgressBar/ProgressBarLine'
import Button from '../../Common/UI/Button'
import PopUpPledge from './PopUpPledge'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addList } from '../../../redux/slice/wishList'

export default ({ item }) => {
  const [popUpIsOpen, setPopUpIsOpen] = useState(false)
  const { t } = useTranslation()
  const popUpOpenHandler = () => {
    setPopUpIsOpen((pre) => !pre)
  }
  const token = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const add = (item) => {
    dispatch(addList(item))
  }

  return (
    <div className={styles['projects-area']} onClick={() => add(item)}>
      <div className={styles['book-info']}>
        <div>
          <span className={`${styles['book-info-values']} ${styles['goal']}`}>
            ${item.goal}
          </span>
          <span className={styles['book-info-titles']}>
            {t('singleBook.goal')}
          </span>
        </div>
        <div>
          <span className={styles['book-info-values']}>${item.donated}</span>
          <span className={styles['book-info-titles']}>
            {t('singleBook.donated')}
          </span>
        </div>
        <div>
          <span className={styles['book-info-values']}>
            {item.deadline && item.deadline.slice(0, item.deadline.length - 14)}
          </span>
          <span className={styles['book-info-titles']}>
            {t('singleBook.time')}
          </span>
        </div>
      </div>
      <ProgressBarLine progress={(item.donated / item.goal) * 100} />
      <Button type="link" onClick={popUpOpenHandler}>
        {item.status === 4 || item.license === 3 ? '' : t('common.pledge')}
      </Button>
      {popUpIsOpen && token ? (
        <PopUpPledge
          popUpHandler={popUpOpenHandler}
          data={{
            id: item.id,
            goal: item.goal,
            donated: item.donated,
            deadline: item?.deadline?.slice(0, item.deadline.length - 14),
            name: item.name,
          }}
        />
      ) : (
        !token && popUpIsOpen && navigate('/sign-up')
      )}
    </div>
  )
}
