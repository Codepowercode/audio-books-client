import './style.fund-component.css'
import { useTranslation } from 'react-i18next'

const FundComponent = ({ src, jsonKey }, props) => {
  const { t } = useTranslation()
  return (
    <div className="fund-main-component">
      <img className="fund-img" src={src} alt="fund-img" />
      <button className="fund-btn">{t(`howItWorks.${jsonKey}`)}</button>
    </div>
  )
}

export default FundComponent
