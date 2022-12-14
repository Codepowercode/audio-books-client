import React, { useState, useRef } from 'react'
import styles from './dropDownField.module.css'
import arrowDown from './../../../assets/images/arrowDown.png'
import arrowDownTwo from './../../../assets/images/arrowDownTwo.png'
import { useTranslation } from 'react-i18next'
export default (props) => {
  const { i18n } = useTranslation()
  const [dropMenuIsOpen, setDropMenuIsOpen] = useState(false)
  const [filedTitle, setFiledTitle] = useState('')

  let dropdown
  let image
  let ddContainer

  switch (props.type) {
    case 'sample-one':
      dropdown = 'sample-one'
      image = arrowDownTwo
      ddContainer = 'dd-sample-one'
      break
    default:
      dropdown = 'default-style'
      image = arrowDown
      ddContainer = 'dd-default'
  }

  const { language } = i18n
  const dropdownRef = useRef()

  const dropMenuChangeHandler = () => {
    setDropMenuIsOpen((prevState) => !prevState)
  }

  const menuItemHandler = (val, id) => {
    setDropMenuIsOpen((prevState) => !prevState)
    if (props.data.setChoice) {
      props.data.setChoice(id)
    } else {
      props.setFilertStatus(id)
    }
    setFiledTitle(val)
    // props.onValueChange(val)
  }

  const menuItemHandlerLibrary = (val, id) => {
    setDropMenuIsOpen((prevState) => !prevState)
    if (props.data.setChoice) {
      props.data.setChoice(id)
    } else {
      props.setFilertStatus({
        ...props.filterStatus,
        [props.currentName]: val,
      })
    }
    setFiledTitle(val)
    // props.onValueChange(val)
  }

  const dropMenuItems = props.data.dropMenuItems.map((item, index) =>
    props.isProduction ? (
      <li
        onClick={() => menuItemHandler(item.name, item.id)}
        className={styles['dd-menu-item']}
        key={index}
      >
        {item.name}
      </li>
    ) : props.isContact ? (
      <>
        <li
          onClick={() =>
            menuItemHandler(
              language === 'en' ? item.nameEnglish : item.nameArabic,
              item.id
            )
          }
          className={styles['dd-menu-item']}
          key={index}
        >
          {language === 'en' ? item.nameEnglish : item.nameArabic}
        </li>
      </>
    ) : props.isLibrary ? (
      <>
        <li
          ref={dropdownRef}
          onClick={() => menuItemHandlerLibrary(item.name, item.id)}
          className={styles['dd-menu-item']}
          key={index}
        >
          {item.name}
        </li>
      </>
    ) : (
      <li
        onClick={() => menuItemHandler(item.title)}
        className={styles['dd-menu-item']}
        key={index}
      >
        {item.title}
      </li>
    )
  )

  return (
    <div className={styles['main-container']}>
      {props.isProduction ? (
        <span className={styles['title']}>{props.name}</span>
      ) : props.isContact ? (
        <span className={styles['title']}>{props.title}</span>
      ) : props.isLibrary ? (
        <span className={styles['title']}>{props.name}</span>
      ) : (
        <span className={styles['title']}>{props.title}</span>
      )}

      <div className={styles[dropdown]} dir={i18n.dir()}>
        <div
          className={`${props.style || styles[ddContainer]}`}
          onClick={dropMenuChangeHandler}
        >
          <span>{filedTitle ? filedTitle : props.data.placeholder}</span>
          <img src={image} alt="arrow down" />
        </div>
        {dropMenuIsOpen && (
          <ul className={styles['dd-menu-items']}>{dropMenuItems}</ul>
        )}
      </div>
    </div>
  )
}
