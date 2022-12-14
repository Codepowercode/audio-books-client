import React, { useState, useEffect, useRef } from 'react'
import styles from './listenRead.module.css'
import headphoneIcon from '../../../assets/images/headphones.png'
import openBookIcon from '../../../assets/images/open-book.png'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// import AudioPlayer from '../playerAudio/AudioPlayer'
// import tracks from '../playerAudio/tracks'
import imgSrc from '../playerAudio/assets/artwork.jpg'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import Player from '../customPlayer'
import { useSelector } from 'react-redux/es/exports'

export default ({ id }) => {
  const { t, i18n } = useTranslation()
  const [audioBooks, setAudioBooks] = useState()
  const [isShow, setIsShow] = useState(false)

  const [isBlock, setIsBlock] = useState()
  const [isPdf, setIsPdf] = useState(false)
  const navigate = useNavigate()
  const [musicTracks, setMusicTracks] = useState([])
  const {
    userSubscriptionDueTo,
    userDonationsToBooks,
    userDonations,
    userSubscriptionActive,
  } = useSelector((store) => store.user.user)
  const { accessToken } = useSelector((store) => store.auth)

  useEffect(() => {
    axios
      .get(`https://www.nashir.app/api/books/getBookAudiosById/${id}`)
      .then((res) => setAudioBooks(res.data))
  }, [])
  const audioRef = useRef()
  const arr = []
  useEffect(() => {
    if (audioBooks?.audioBooks) {
      audioBooks.audioBooks.map((element) => {
        arr.push({
          src: element.fileName,
          // title: 'Cali',
          // artist: 'Wataboi',
          name: element.originalName || 'name',
        })
      })
      setMusicTracks(arr)
    }
  }, [audioBooks])

  const pdfHandler = () => {
    if (audioBooks.pdf) {
      if (!accessToken) {
        console.log('accessToken')
        return navigate('/sign-up')
      }
      if (userSubscriptionDueTo) {
        return (window.location.href = audioBooks.pdf)
      }
      if (userSubscriptionActive) {
        return (window.location.href = audioBooks.pdf)
      }
      if (userDonations > 50) {
        return (window.location.href = audioBooks.pdf)
      }
      if (Object.keys(userDonationsToBooks).length !== 0) {
        let donated = Object.keys(userDonationsToBooks).filter(
          (elem) => elem === id
        )
        // const donatedBook = userDonationsToBooks.filter((elem) => id === elem.id)
        if (donated.length) {
          return (window.location.href = audioBooks.pdf)
        } else {
          return navigate('/subscription')
        }
      }
      return navigate('/subscription')
    }
  }
  let local_stream

  const ref = useRef()

  useEffect(() => {
    if (isShow && ref.current) {
      ref.current.controlsList.value = 'nodownload'

      //   return (ref.current.controlsList = 'nodownload')
    }
  }, [ref, isShow])

  const off = function () {
    //toggle state
    local_stream.getAudioTracks()[0].enabled =
      !local_stream.getAudioTracks()[0].enabled
  }

  const showhandler = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(function (stream) {
        alert(
          'Please Block Your Microphone or block it in your Browser Settings'
        )
        // navigator.mediaDevices.getUserMedia({ audio: true })
      })
      .catch(function (stream) {
        setIsBlock(stream)
        setIsShow((pre) => !pre)
      })
  }

  const handlePlayer = () => {
    if (!accessToken) {
      console.log('accessToken')
      return navigate('/sign-up')
    }
    if (userSubscriptionDueTo) {
      console.log('userSubscriptionDueTo')
      return <Player musicTracks={musicTracks} />
    }
    if (userSubscriptionActive) {
      return <Player musicTracks={musicTracks} />
    }
    if (userDonations > 50) {
      return <Player musicTracks={musicTracks} />
    }
    if (Object.keys(userDonationsToBooks).length !== 0) {
      let donated = Object.keys(userDonationsToBooks).filter(
        (elem) => elem === id
      )
      console.log(donated)
      // const donatedBook = userDonationsToBooks.filter((elem) => id === elem.id)
      if (donated.length) {
        return <Player musicTracks={musicTracks} />
      } else {
        return navigate('/subscription')
      }
    }

    return navigate('/subscription')
  }

  return (
    <>
      <div className={styles['main-container']} dir="ltr">
        <div
          className={styles['listen-book']}
          onClick={() => audioBooks?.audioBooks && showhandler()}
        >
          <span>{t('listenRead.listen')}</span>
          <img src={headphoneIcon} alt="headphone icon" />
        </div>
        {/* {isShow && audioBooks?.audioBooks
          ? audioBooks.audioBooks.map((elem, index) => (
              <React.Fragment key={index}>
                
              </React.Fragment>
            ))
          : null} */}
        {/* {isShow && tracks.length ? <AudioPlayer tracks={tracks} /> : null} */}
        {isShow && musicTracks.length && handlePlayer()}
        <div
          onClick={() => pdfHandler()}
          className={`${styles['listen-book']} ${styles['read-text']}`}
        >
          <span>{t('listenRead.read')}</span>
          <img src={openBookIcon} alt="book icon" />
        </div>

        <span
          className={styles['start-project']}
          onClick={() => navigate('/create-book')}
        >
          {t('common.startYourProject')}
        </span>
      </div>
    </>
  )
}
