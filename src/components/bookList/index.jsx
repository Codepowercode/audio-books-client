import SingleBookComponent from '../SingleBook'
import PageTitle from './../Common/PageTitle'
import { Link, useLocation } from 'react-router-dom'
import styles from './bookList.module.css'
import React from 'react'
import Filter from '../Common/Filter'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from '@mui/material'
import { SelectInput } from 'react-admin'

const BookList = ({
  data,
  type,
  filterData,
  isProduction,
  setFilertStatus,
  setSearchValue,
  isLibrary,
  filterStatus,
  isProject
}) => {
  const location = useLocation()
  const { t, i18n } = useTranslation()
  let text = ''
  const isMobile = useMediaQuery('(max-width:1024px)')
  const indexOfLastPost = 4
  const indexOfFirstPost = indexOfLastPost - 4
  const { language } = i18n

  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost)


  switch (type) {
    case 'project':
      text = 'bookList.projectTitle'
      break
    case 'successfulProject':
      text = 'bookList.successfulTitle'
      break
    case 'production':
      text = 'bookList.productionTitle'
      break
    case 'library':
      text = 'bookList.libraryTitle'
      break
    default:
      text = 'bookList.projectTitle'
  }

  return (
    <div className={styles['main-book-list']}>
      {/*<div className={styles['audio-header-photo']}>*/}
      <div className={styles['book-list-head']}>
        <PageTitle text={t(text)} />
        {type === 'project' && <p>{t('bookList.subTitle')}</p>}
      </div>
      {/*</div>*/}
      {filterData && (
        <div className={styles['filter-container']} dir={i18n.dir()}>
          <Filter
            isLibrary={isLibrary}
            isProduction={isProduction}
            dd_data={filterData}
            setFilertStatus={setFilertStatus}
            setSearchValue={setSearchValue}
            filterStatus={filterStatus}
            isProject={isProject}
          />
        </div>
      )}
      <div
        className={
          styles[`${language === 'ar' ? 'book-list_ar' : 'book-list'}`]
        }
      >
        {location.pathname === '/'
          ? currentPosts.map((item) => (
              <SingleBookComponent key={item.id} {...item} type={type} />
            ))
          : data.map((item) => (
              <SingleBookComponent key={item.id} {...item} type={type} />
            ))}
        {!isMobile && (
          <Link
            to="/create-book"
            className={styles[`${language === 'ar' ? 'start-project' : ''}`]}
            id={styles['start-project']}
          >
            {t('common.startYourProject')}
          </Link>
        )}
      </div>
      {location.pathname === '/' &&
        (type === 'project' || type === 'production' || type === 'library') && (
          <Link
            to={
              (type === 'project' && '/projects') ||
              (type === 'production' && '/production') ||
              (type === 'library' && '/library')
            }
            className={styles['view-btn']}
            children={t('bookList.viewAll')}
          />
        )}
    </div>
  )
}

export default BookList
