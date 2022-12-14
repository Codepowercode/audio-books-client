import React, { useState } from 'react'
import audioVector from '../../assets/images/icons/audio-vector.svg'
import styles from './playPause.module.css'
import { useTranslation } from 'react-i18next'

const audio = new Audio()
const PlayOrPauseAudio = ({ playAudio }) => {
  const [play, setPlay] = useState(false)
  const { t, i18n } = useTranslation()
  const playAudioPause = () => setPlay((pre) => !pre)

  audio.src = playAudio
  play ? audio.play() : audio.pause()

  return (
    <button onClick={playAudioPause} className={styles['play-btn']} dir="ltr">
      <img src={audioVector} />
      <span>{t('singleBook.play')}</span>
    </button>
  )
}

export default PlayOrPauseAudio
