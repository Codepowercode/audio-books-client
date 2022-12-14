import React, { useState } from 'react'
import styles from './userInfo.module.css'
import userImg from './../../../../assets/images/userImage.png'
import arrowDown from './../../../../assets/images/arrowDownTwo.png'
import { ddItemsUser } from '../../../DummyData'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { removeToken } from '../../../../redux/slice/auth'
import { removeUser } from '../../../../redux/slice/user'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from '@mui/material'

export default ({ state, setState }) => {
  const isMobile = useMediaQuery('(max-width:1024px)')
  const [ddIsOpen, setDDIsOpen] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const ddOpenHandler = () => {
    setDDIsOpen((pre) => !pre)
  }
  const { userName } = useSelector((store) => store?.user?.user)
  const { avatar } = useSelector((store) => store?.user?.user)

  const ddItems = ddItemsUser.map((item, index) => (
    <li key={index} className={styles['dd-item']}>
      <Link
        className={styles['link']}
        to={item.url}
        onClick={(e) => {
          //   e.preventDefault()
          ddItemsUser.length - 1 === index &&
            dispatch(removeToken()) &&
            dispatch(removeUser())
          isMobile && setState({ ...state, ['left']: false })
          setDDIsOpen((pre) => !pre)
        }}
      >
        {t(`profile.${item.title}`)}
      </Link>
    </li>
  ))

  return (
    <div className={styles['main-container']}>
      <div style={{
        width:'100%',
        maxWidth:'60px',
        height:'60px',
        borderRadius:'50%',

      }}>
        <img
          src={avatar ? 'https://www.nashir.app/api/' + avatar : userImg}
          alt="user image"
          className={styles['user-img']}
          onClick={() => navigate('/my-account')}
        />
      </div>
      <span>{userName ? userName : 'User Name'}</span>
      <img
        src={arrowDown}
        alt="arrow down"
        onClick={ddOpenHandler}
        className={styles['arrow-icon']}
      />
      {ddIsOpen && (
        <>
          <div className={styles['backdrop']} onClick={ddOpenHandler} />
          <ul className={styles['dd-items-container']}>{ddItems}</ul>
        </>
      )}
    </div>
  )
}
