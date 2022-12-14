import React from 'react'
import styles from './progressBarLine.module.css'

export default (props) => {
  return (
    <div className={styles['container']}>
      <span>{Number.parseInt(props.progress)}%</span>
      <div className={styles['container-styles']}>
        <div
          className={styles['filler-styles']}
          style={{ width: `${props.progress}%` }}
        >
          <span className={styles['label-styles']} />
        </div>
      </div>
    </div>
  )
}
