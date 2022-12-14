import React, { useState } from 'react'
import styles from './checkbox.module.css'
import checkedIcon from './../../../../assets/images/checked.png'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export default ({ title, data, onChangeGender, checkData }) => {
  const [active, setActive] = useState()
  const [activeBack, setActiveBack] = useState()
  const { t } = useTranslation()

  const [backEndCheck, setBackEndCheck] = useState()

  const checkedToggle = (val) => {
    setActive((pre) => val)
    onChangeGender(data[val].text)
  }

  useEffect(() => {
    let value = checkData[0].text === 'Male' ? 0 : 1
    setActive(value)
  }, [checkData])

  return (
    <div className={styles['main-container']}>
      <span className={styles['title']}>{title}</span>
      <div className={styles['check-boxes-container']}>
        {checkData
          ? data.map((item, index) => {
              return (
                <div key={index} className={styles['check-box-container']}>
                  <div
                    className={`${styles['check-box']} ${
                      index === active && styles['checked']
                    }`}
                    onClick={() => checkedToggle(index)}
                  >
                    {index === active && (
                      <img src={checkedIcon} alt="checked icon" />
                    )}
                  </div>
                  <span>{t(`profileSettings.${item.text}`)}</span>
                </div>
              )
            })
          : data.map((item, index) => {
              return (
                <div key={index} className={styles['check-box-container']}>
                  <div
                    className={`${styles['check-box']} ${
                      index === active && styles['checked']
                    }`}
                    onClick={() => checkedToggle(index)}
                  >
                    {index === active && (
                      <img src={checkedIcon} alt="checked icon" />
                    )}
                  </div>
                  <span>{t(`profileSettings.${item.text}`)}</span>
                </div>
              )
            })}
      </div>
    </div>
  )
}
