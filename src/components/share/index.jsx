import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { useTranslation } from 'react-i18next'
import styles from './share.module.css'

export default ({ title, isFooter, id }) => {
  const { t, i18n } = useTranslation()
  const shareUrl = id
    ? `https://www.nashir.app/single-book-page/${id}`
    : 'https://www.nashir.app'

  console.log(title)

  return (
    <div
      dir={i18n.dir()}
      className={
        !isFooter ? styles.shareContainer : styles.shareContainerFooter
      }
    >
      {!isFooter && <span>{t('share.title')}</span>}
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl}>
        <TwitterIcon size={40} round={true} quote={title} />
      </TwitterShareButton>
    </div>
  )
}
