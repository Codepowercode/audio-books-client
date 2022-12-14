import React from 'react'
import styles from './button.module.css'
import { useNavigate } from 'react-router-dom'

export default (props) => {
  const navigate = useNavigate()

  let buttonStyle = 'default-style'
  let type = 'button'

  switch (props.type) {
    case 'primary':
      buttonStyle = 'primary'
      type = 'submit'
      break
    case 'text':
      buttonStyle = 'text-button'
      break
    case 'link':
      buttonStyle = 'link-button'
      break
    case 'cancel':
      buttonStyle = 'cancel-button'
      break
  }

  return (
    <button
      onClick={() => props.url && navigate(props.url)}
      {...props}
      type={type}
      className={styles[buttonStyle]}
    >
      {props.children}
    </button>
  )
}
