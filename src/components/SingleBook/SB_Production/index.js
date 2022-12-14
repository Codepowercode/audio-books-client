import React from 'react'
import styles from './SB_Production.module.css'

export default ({ item }) => {
  const statusHandler = (status) => {
    switch (status) {
      case 3:
        return 'Being crowdfunded'
      case 4:
        return 'Did not meet funding'
      case 5:
        return 'Being produced'
      case 6:
        return 'Complete'
      case 7:
        return 'Rejected'
    }
  }
  return (
    <div className={styles['production-area']}>
      <div>
        <span className={styles['status']}>Status</span>
        <span className={styles['status-value']}>
          {statusHandler(item.status)}
        </span>
      </div>
      <div>
        <span className={styles['ready-in']}>Audio book ready in</span>
        <span className={styles['ready-in-value']}>
          {item.deadline && item.deadline.slice(0, item.deadline.length - 14)}
        </span>
      </div>
    </div>
  )
}
