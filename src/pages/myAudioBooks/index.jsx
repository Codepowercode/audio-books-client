import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import PledgedUsers from '../../components/donatedAudioBooks'
import styles from '../../components/SingleBookPage/singleBookPage.module.css'

const MyAudioBooks = () => {
  const [pledgedBook, setPledgedBook] = useState()
  const token = localStorage.getItem('accessToken')
    ? localStorage.getItem('accessToken')
    : null
  const cutToken = token.substring(1, token.length - 1)

  const [data, setData] = useState()

  useEffect(() => {
    axios
      .get(`https://www.nashir.app/api/payments/getBookDonations/${1}`)
      .then((res) => setPledgedBook(res.data))
  }, [])

  useEffect(() => {
    axios
      .get('https://www.nashir.app/api/books/donated', {
        headers: {
          Authorization: 'Bearer ' + cutToken,
        },
      })
      .then((res) => setData(res.data))
  }, [])

  return (
    <div className={styles['bottom-area']}>
      <div className={styles['container']}>
        <section className={styles['pledge-book-section']}>
          <div>
            {pledgedBook && (
              <PledgedUsers
                data={pledgedBook}
                isMyProjects={true}
                item={data}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default MyAudioBooks
