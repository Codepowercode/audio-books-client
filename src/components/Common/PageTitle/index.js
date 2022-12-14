import React from 'react'
import styles from './pageTitle.module.css'

export default (props) => {
  return (
    <div className={styles['page-title']}>
      <span>{props.text}</span>
      <span>{props.text}</span>
    </div>
  )
}
