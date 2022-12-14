import React, { useEffect, useState } from 'react'
import styles from './production.module.css'
import productionImg from './../../assets/images/production.png'
import PaginatedItems from '../../components/paginate'
import axios from 'axios'
import {
  productionBooksData,
  productionFilterData,
} from '../../components/DummyData'
import { useTranslation } from 'react-i18next'
import { useListContext } from 'react-admin'

export default () => {
  const [request, setRequest] = useState()
  
  const [filterKey, setFilterKey] = useState(null)
  const [filterStatus, setFilertStatus] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const { isLoading } = useListContext()
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const [filterSearch, setFilterSearch] = useState([])

  useEffect(() => {
    // axios
    //   .get(`https://www.nashir.app/api/books/getByStatus/${5}`)
    //   .then((response) => setRequest(response.data.books))

    // axios
    //   .get(`https://www.nashir.app/api/books/getAll`)
    //   .then((response) => setRequest(response.data))

    axios
    .get(`https://www.nashir.app/api/books/getByStatus/${5}`)
    .then((response) =>
      setRequest((pre) => {
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
      setRequest((pre) => {
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
      setRequest((pre) => {
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
      setRequest((pre) => {
        if (pre) {
          return [...pre, ...response.data.books]
        } else {
          return response.data.books
        }
      })
    )
  }, [])
  useEffect(() => {
    let lang = language === 'en' ? 'nameEnglish' : 'nameArabic'
    let filterSearchh = request?.filter((item) =>
      item[lang]
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    )
    setFilterSearch(filterSearchh)
  }, [searchValue])
  // const newData = request?.filter((item) => item.license === filterKey)
  const statusFlter = request?.filter((item) => item.status === filterStatus)


  // const searchValue = request?.filter(itme => itme.na)

  if (isLoading) return null
  // filterStatus === null ? data : statusFlter

  return (
    <div className={styles['production-main-container']}>
      <img
        src={productionImg}
        alt="production image"
        className={styles['top-img']}
      />
      {request && filterSearch  ? (
        <PaginatedItems
          // items={request}
          data={
            filterStatus === null
              ? filterSearch
              : filterStatus === 8
              ? filterSearch
              : statusFlter
          }
          itemsPerPage={8}
          type="production"
          filterData={productionFilterData}
          setSearchValue={setSearchValue}
          setFilertStatus={setFilertStatus}
          isProduction={true}
        />
      ) : request ? (
        <PaginatedItems
          // items={request}
          data={
            filterStatus === null
              ? request
              : filterStatus === 8
              ? request
              : statusFlter
          }
          itemsPerPage={8}
          type="production"
          filterData={productionFilterData}
          setSearchValue={setSearchValue}
          setFilertStatus={setFilertStatus}
          isProduction={true}
        />
      ) : null}
    </div>
  )
}
