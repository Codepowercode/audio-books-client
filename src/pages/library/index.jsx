import React, { useEffect, useState } from 'react'
import styles from './library.module.css'
import libTopImg from '../../assets/images/library-top-img.png'
import PaginatedItems from './../../components/paginate/index'
import { libraryBooksData, libraryFilterData } from '../../components/DummyData'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'

const Library = () => {
  const { userSubscriptionDueTo, userDonationsToBooks, userDonations } =
    useSelector((store) => store.user.user)
  const { t, i18n } = useTranslation()
  const { accessToken } = useSelector((store) => store.auth)
  const [request, setRequest] = useState()
  const { language } = i18n
  console.log(language)
  const [filterStatus, setFilertStatus] = useState({
    author: '',
    narrator: '',
    genre: '',
    publicYear: '',
  })

  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${6}`)
      .then((response) => setRequest(response.data.books))
  }, [])

  const statusFlter = request?.filter((item) => item.status === filterStatus)
  const [searchValue, setSearchValue] = useState(null)
  const [filterSearch, setFilterSearch] = useState([])
  console.log(request, 'tttt')
  useEffect(() => {
    let lang = language === 'en' ? 'nameEnglish' : 'nameArabic'
    let filterSearchh = request?.filter((item) =>
      item[lang].toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    setFilterSearch(filterSearchh)
  }, [searchValue])

  // const getBooks = () => {
  //   if (!accessToken) {
  //     return (
  //       <PaginatedItems
  //         data={request}
  //         itemsPerPage={8}
  //         type="library"
  //         isLibrary={true}
  //         filterData={libraryFilterData}
  //         setSearchValue={setSearchValue}
  //       />
  //     )
  //   }
  //   if (userSubscriptionDueTo) {
  //     return (
  //       <PaginatedItems
  //         data={
  //           filterStatus === null
  //             ? request
  //             : filterSearch
  //             ? filterSearch
  //             : request
  //         }
  //         itemsPerPage={8}
  //         type="library"
  //         isLibrary={true}
  //         filterData={libraryFilterData}
  //         filterStatus={filterStatus}
  //         setFilertStatus={setFilertStatus}
  //         setSearchValue={setSearchValue}
  //       />
  //     )
  //   }
  //   if (Object.keys(userDonationsToBooks).length !== 0) {
  //     const donatedBook = request.filter(
  //       (elem) => elem.id === userDonationsToBooks.id
  //     )
  //     return (
  //       <PaginatedItems
  //         data={donatedBook}
  //         itemsPerPage={8}
  //         type="library"
  //         isLibrary={true}
  //         filterData={libraryFilterData}
  //         setSearchValue={setSearchValue}
  //       />
  //     )
  //   }
  //   if (userDonations > 50) {
  //     return (
  //       <PaginatedItems
  //         data={request}
  //         itemsPerPage={8}
  //         type="library"
  //         isLibrary={true}
  //         filterData={libraryFilterData}
  //         setSearchValue={setSearchValue}
  //       />
  //     )
  //   }
  //   return (
  //     <div className={styles['main-library-subscribe']}>
  //       <p> {t('libraryPage.emptyBook')}</p>
  //       <button onClick={() => navigate('/subscription')}>
  //         {t('subscription.subscribe')}
  //       </button>
  //     </div>
  //   )
  // }

  return (
    <div className={styles['main-library-container']}>
      <img src={libTopImg} alt="lib-text" className={styles['top-img']} />
      {request && (
        <PaginatedItems
          data={
            filterStatus === null
              ? request
              : filterSearch
              ? filterSearch
              : request
          }
          itemsPerPage={8}
          type="library"
          isLibrary={true}
          filterData={libraryFilterData}
          filterStatus={filterStatus}
          setFilertStatus={setFilertStatus}
          setSearchValue={setSearchValue}
        />
      )}
    </div>
  )
}

export default Library
