import React, { useState, useEffect } from 'react'
import styles from './singleBookPage.module.css'
import { useLocation, useParams } from 'react-router-dom'
import PledgedUsers from './PledgedUsers'
import ListenRead from './ListenRead'
import PledgeInfo from './PledgeInfo'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import ShareIcon from '../share'
import { useMediaQuery } from '@mui/material'

export default (props) => {
  const location = useLocation()
  const { id } = useParams()
  // const book = location.state.selectedBook
  // const name = location.state.name

  const { t, i18n } = useTranslation()

  const [data, setData] = useState()
  let authorMain =
    i18n.language === 'en' ? data?.authorEnglish : data?.authorArabic
  let bookName = i18n.language === 'en' ? data?.nameEnglish : data?.nameArabic
  let bookDescription =
    i18n.language === 'en' ? data?.descriptionEnglish : data?.descriptionArabic
  let bookNarrator = i18n.language === 'en' ? data?.narrator : data?.narrator
  let type = data?.status === 3 ? 'project' : 'library'

  const [pledgedBook, setPledgedBook] = useState()
  const isMobile = useMediaQuery('(max-width:1024px)')

  useEffect(() => {
    axios
      .get(`https://www.nashir.app/api/payments/getBookDonations/${id}`)
      .then((res) => setPledgedBook(res.data))
  }, [])

  useEffect(() => {
    axios
      .get(`https://www.nashir.app/api/books/${id}`)
      .then((res) => setData(res.data))
  }, [])
  return (
    <div className={styles['main-container']} dir={i18n.dir()}>
      <div className={styles['top-area']}>
        <div className={styles['container']}>
          <div className={styles['page-dir']}>
            <span>{t(`bookList.${type}Title`)} /</span>
            <span>{bookName}</span>
          </div>
          <section className={styles['book-info-section']}>
            <div className={styles['imgBox']}>
              <img
                src={`https://www.nashir.app/api/${data?.imageLink}`}
                alt="book"
                className={styles['book-img']}
              />
              <div className={styles['book-share']}>
                {data && <ShareIcon id={data.id} title={bookName}/>}
              </div>
            </div>
            <div className={styles['book-info-middle-area']}>
              <div className={styles[isMobile && 'book-info-title']}>
                <span className={styles['book-name']}>{bookName}</span>
                <div className={styles['author-container']}>
                  <span>{t('singleBook.author')}</span>
                  <span>{authorMain}</span>
                </div>
              </div>
              <p className={styles['description']}>{bookDescription}</p>
              <div className={styles['info-details']}>
                {bookNarrator && (
                  <div>
                    <span>{t('singleBook.narrator')}</span>
                    <span>{bookNarrator}</span>
                  </div>
                )}
                {data?.genre && (
                  <div>
                    <span>{t('singleBook.genre')}</span>
                    <span>{data?.genre}</span>
                  </div>
                )}
                {data?.yearOfPublishing && (
                  <div>
                    <span>{t('singleBook.publicYear')}</span>
                    <span>{data?.yearOfPublishing}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles['book-info-right-area']}>
              {type === 'library' && data && <ListenRead id={data.id} />}
              {type === 'project' && data && (
                <PledgeInfo
                  id={data.id}
                  goal={data.goal}
                  donated={data.donated}
                  deadline={data.deadline}
                  name={bookName}
                />
              )}
              <div className={styles['book-info-right-area-content']}>
                <h3>{t('pledgeInfo.title')}</h3>
                <p>{t('pledgeInfo.10')}</p>
                <p>{t('pledgeInfo.50')}</p>
                <p>{t('pledgeInfo.100')}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className={styles['bottom-area']}>
        <div className={styles['container']}>
          <section className={styles['pledge-book-section']}>
            <div>{pledgedBook && <PledgedUsers data={pledgedBook} />}</div>
          </section>
        </div>
      </div>
    </div>
  )
}
