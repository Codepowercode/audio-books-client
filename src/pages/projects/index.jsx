import styles from './projects.module.css'
import PaginatedItems from '../../components/paginate'
import { projectsBooksData } from '../../components/DummyData'
import projectTopImg from '../../assets/images/project.png'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { libraryFilterData } from '../../components/DummyData'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

const ProjectsPage = () => {
  // const { books } = GlobalContext()
  const { t, i18n } = useTranslation()
  const { language } = i18n
  const [request, setRequest] = useState()
  const [filterSearch, setFilterSearch] = useState([])
  const [searchValue, setSearchValue] = useState(null)
  const [filterStatus, setFilertStatus] = useState(null)
  useEffect(() => {
    // axios
    //   .get('https://www.nashir.app/api/books/getonlyapproved')
    //   .then((response) => setRequest(response.data.books))

    axios
      .get(`https://www.nashir.app/api/books/getByStatus/${3}`)
      .then((response) => setRequest(response.data.books))
  }, [])
  useEffect(() => {
    let lang = language === 'en' ? 'nameEnglish' : 'nameArabic'
    let filterSearchh = request?.filter((item) =>
      item[lang].toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    )
    setFilterSearch(filterSearchh)
  }, [searchValue])

  return (
    <div className={styles['main-container']}>
      <img src={projectTopImg} alt="project" className={styles['top-img']} />
      {request && (
        <PaginatedItems
          data={filterSearch ? filterSearch : request}
          itemsPerPage={8}
          type="project"
          setSearchValue={setSearchValue}
          isProject={true}
          filterData={libraryFilterData}
        />
      )}
      {/* <Link to="/create-book" id={styles["start-project"]}>start your project</Link> */}
    </div>
  )
}

export default ProjectsPage
