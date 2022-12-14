import React, { useEffect } from 'react'
import styles from './singleBook.module.css'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import SB_Library from './SB_Library'
import SB_Production from './SB_Production'
import SB_Projects from './SB_Projects'
import PlayOrPauseAudio from '../playOrPauseAudio/index'
import { useTranslation } from 'react-i18next'
import ShareComponent from '../share'

const SingleBookComponent = (props) => {
  let {
    id,
    name,
    description,
    author,
    content,
    status,
    narrator,
    genre,
    publicYear,
    goal,
    donated,
    deadline,
    imageLink,

    type,
    playAudio,
    license,
    authorEnglish,
    authorArabic,
    yearOfPublishing,
    descriptionArabic,
    descriptionEnglish,
    nameArabic,
    nameEnglish,
  } = props

  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  let authorMain = i18n.language === 'en' ? authorEnglish : authorArabic

  let bookName = i18n.language === 'en' ? nameEnglish : nameArabic

  let bookDescription =
    i18n.language === 'en' ? descriptionEnglish : descriptionArabic
  let bookNarrator = i18n.language === 'en' ? narrator : narrator

  const bookPageOpenHandler = () => {
    if (type !== 'production' && type) {
      navigate(`/single-book-page/${id}`)
      // navigate(`/single-book-page/${id}`, {
      //   state: {
      //     selectedBook: props,
      //   },
      // })
    }
  }

  return (
    <div className={styles['single-book']} dir={i18n.dir()}>
      <div className={styles['img-container']} onClick={bookPageOpenHandler}>
        <img src={`https://www.nashir.app/api/${imageLink}`} alt="book" />
      </div>
      <div className={styles['hr']} dir={i18n.dir()} />
      {authorMain && type === 'production' && (
        <p className={styles['author']}>
          {t('singleBook.author')}
          <span className={styles['author-name']}>{authorMain}</span>
        </p>
      )}
      {authorMain && type === 'project' && (
        <>
          <p className={styles['author']}>
            {t('singleBook.author')}
            <span className={styles['author-name']}>{authorMain}</span>
          </p>
          <ShareComponent title={bookName} />
        </>
      )}
      {type === 'production' && (
        <>
          <span className={styles['book-name']}>{bookName}</span>
          <ShareComponent title={bookName} />
        </>
      )}
      {type === 'project' && (
        <span style={{ marginBottom: '20px' }} className={styles['book-name']}>
          {bookName}
        </span>
      )}
      {type === 'library' && (
        <>
          <span
            style={{ marginBottom: '20px' }}
            className={styles['book-name']}
          >
            {bookName}
          </span>
          <ShareComponent title={bookName} />
        </>
      )}
      <p className={styles['description']}>
        {bookDescription ? bookDescription.slice(0, 85) : content}
      </p>
      {type === 'project' && (
        <SB_Projects
          item={{ goal, donated, deadline, name, status, license, id }}
        />
      )}
      {type === 'production' && <SB_Production item={{ status, deadline }} />}
      {type === 'library' && (
        <SB_Library item={{ bookNarrator, genre, yearOfPublishing }} />
      )}
      {playAudio && !type && <PlayOrPauseAudio playAudio={playAudio} />}
    </div>
  )
}

export default SingleBookComponent
