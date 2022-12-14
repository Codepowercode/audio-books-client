import React, { useState } from 'react'
import styles from './popUpPledge.module.css'
import closeIcon from './../../../../assets/images/closeIcon.png'
import ProgressBarLine from '../../../Common/ProgressBar/ProgressBarLine'
import Card from './Card'
import Input from './../../../Common/UI/Input'
import Button from './../../../Common/UI/Button'
import { useNavigate } from 'react-router-dom'
import useInput from '../../../../hooks/use-input'
import axios from 'axios'
import moment from 'moment'
import { useTranslation } from 'react-i18next'

export default (props) => {
  const [selectedCard, setSelectedCard] = useState(true)
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const token = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null
  const bookId = props.data.id
  const cutToken = token.substring(1, token.length - 1)
  
  const {
    isValid: amountIsValid,
    hasError: amountHasError,
    valueChangeHandler: amountChangeHandler,
    inputBlurHandler: amountBlurHandler,
    reset: amountReset,
    value: value,
  } = useInput((val) => val >= 10)

  let formIsValid = false

  if (amountIsValid) {
    formIsValid = true
  }

  const cardDetailsOpenHandler = () => {
    navigate('/card-details')
  }

  const submitHandler = (evt) => {
    evt.preventDefault()

    if (!formIsValid) {
      return
    }

    const data = {
      bookId,
      amount: +value,
    }
    axios
      .post('https://www.nashir.app/api/payments/pay', data, {
        headers: {
          Authorization: 'Bearer ' + cutToken,
        },
      })
      .then((res) => window.location.replace(res.data))
  }

  return (
    <>
      <div className={styles['backdrop']} onClick={props.popUpHandler} />
      <div className={styles['main-container']}>
        <img
          src={closeIcon}
          alt="close icon"
          className={styles['close-icon']}
          onClick={props.popUpHandler}
        />
        <div className={styles['name-container']}>
          <span>pledge for this book</span>
          <span>{props.data.name}</span>
        </div>
        <div className={styles['donate-container']}>
          <div className={styles['goal-donate-deadline']}>
            <div>
              <span className={`${styles['odd']} ${styles['goal']}`}>
                ${props.data.goal}
              </span>
              <span className={styles['even']}>The goal</span>
            </div>
            <div>
              <span className={styles['odd']}>${props.data.donated}</span>
              <span className={styles['even']}>Donated</span>
            </div>
            <div>
              <span className={styles['odd']}>{props.data.deadline}</span>
              <span className={styles['even']}>Time ends in</span>
            </div>
          </div>
          <ProgressBarLine
            progress={(props.data.donated / props.data.goal) * 100}
          />
        </div>
        <form className={styles['form']} onSubmit={(evt) => submitHandler(evt)}>
          <Input
            dir={i18n.dir()}
            label="Amount"
            hasError={amountHasError}
            errorMessage={t('pledgeBook.amount')}
            input={{
              placeholder: '$',
              id: 'amount',
              onChange: amountChangeHandler,
              onBlur: amountBlurHandler,
            }}
          />
          <Card
            cardNumber="4561 **** **56"
            cardName="Mahtamun Hoque"
            // title="Remembered card"
            selected={selectedCard}
          />
          <div className={styles['line']} />
          {/* <Card selected={!selectedCard} onClick={cardDetailsOpenHandler} /> */}
          <Button type="primary" disabled={!formIsValid}>
            Pledge for this book
          </Button>
        </form>
      </div>
    </>
  )
}
