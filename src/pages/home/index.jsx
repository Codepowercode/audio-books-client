import React, { useState, useEffect } from 'react'
import BookList from '../../components/bookList'
import FundingInfo from '../../components/funding'
import styles from './home.module.css'
import {
  productionBooksData,
  projectsBooksData,
  libraryBooksData,
} from '../../components/DummyData'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const Home = () => {
  const { t } = useTranslation()
  const [projectData, setProjectData] = useState()
  const [libraryData, setLibraryData] = useState()
  const [productionData, setProductionData] = useState()

  useEffect(() => {
    // axios
    //   .get('https://www.nashir.app/api/books/getonlyapproved')
    //   .then((response) => setProjectData(response.data.books))

    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${6}`)
      .then((response) => setLibraryData(response.data.books))

    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${3}`)
      .then((response) => {
        setProjectData(response.data.books)
        // setProductionData((pre) => {
        //   if (pre) {
        //     return [...pre, ...response.data.books]
        //   } else {
        //     return response.data.books
        //   }
        // })
      })

    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${5}`)
      .then((response) =>
        setProductionData((pre) => {
          if (pre) {
            return [...pre, ...response.data.books]
          } else {
            return response.data.books
          }
        })
      )

    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${2}`)
      .then((response) =>
        setProductionData((pre) => {
          if (pre) {
            return [...pre, ...response.data.books]
          } else {
            return response.data.books
          }
        })
      )

    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${4}`)
      .then((response) =>
        setProductionData((pre) => {
          if (pre) {
            return [...pre, ...response.data.books]
          } else {
            return response.data.books
          }
        })
      )
    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${7}`)
      .then((response) =>
        setProductionData((pre) => {
          if (pre) {
            return [...pre, ...response.data.books]
          } else {
            return response.data.books
          }
        })
      )

    // axios
    //   .get(`https://www.nashir.app/api/books/getAll`)
    //   .then((response) => setProductionData(response.data.books))
  }, [])

  return (
    <div className={styles['home-container']}>
      <div className={styles['top-area']}>
        <h1>{t('homePage.title')}</h1>
      </div>
      {projectData && <BookList data={projectData} type="project" />}
      <FundingInfo />
      {/* {libraryData && <BookList data={libraryData} type="successfulProject" />} */}
      {libraryData && <BookList data={libraryData} type="library" />}
      {productionData?.length && (
        <BookList data={productionData} type="production" />
      )}
    </div>
  )
}

export default Home
