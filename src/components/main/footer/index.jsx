import mailIcon from '../../../assets/images/icons/mail.svg'
import phoneIcon from '../../../assets/images/icons/phone.svg'
import locationIcon from '../../../assets/images/icons/map-pin.svg'
import clockIcon from '../../../assets/images/icons/clock.svg'
import Ellipse from '../../../assets/images/icons/Ellipse24.svg'
import fbFooter from '../../../assets/images/icons/fb-footer.svg'
import instaFooter from '../../../assets/images/icons/instagram-footer.svg'
import tweetFooter from '../../../assets/images/icons/tweeter-footer.svg'
import './style.footer.css'
import { useTranslation } from 'react-i18next'
import Share from '../../share'
const Footer = () => {
  const { t, i18n } = useTranslation()

  return (
    <div className="main-footer">
      <footer>
        <div className="first">
          <div>
            <img src={mailIcon} alt="mail" />
            <a href="#">{t('footer.email')}</a>
          </div>
          {/* {i18n.language === 'en' && (
            <div>
              <img src={phoneIcon} alt="mail" />
              <a href="tel:+881289-400-3760">(+881)289-400-3760</a>
            </div>
          )} */}
        </div>
        <div className="middle">
          <Share isFooter={true} />
          {/* <a href="#">
            <img src={fbFooter} alt="fb" />
          </a>
          <a href="#" className="inst">
            <img src={instaFooter} alt="insta" />
          </a>
          <a href="#">
            <img src={tweetFooter} alt="tweet" />
          </a> */}
        </div>
        <div className="last">
          <div>
            <img src={locationIcon} alt="mail" />
            <p href="#">{t('footer.location')}</p>
          </div>
          {/* {i18n.language === 'en' && (
            <div>
              <img src={clockIcon} alt="mail" />
              <p>10:00AM - 20:00PM</p>
            </div>
          )} */}
        </div>
      </footer>
      <div className="foot-end">
        <div className="line" />
        <span className={'footer-info'}>{t('footer.info')}</span>
      </div>
    </div>
  )
}

export default Footer
