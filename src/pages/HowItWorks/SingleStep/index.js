import React from "react";
import styles from './singleStep.module.css';
import stepImg from "../../../assets/images/howItworks/leftToRight.png";
import stepImg1 from "../../../assets/images/howItworks/leftToRight1.png";
import stepImg2 from "../../../assets/images/howItworks/leftToRight2.png";
import {useTranslation} from "react-i18next";

export default (props) => {

    const {t, i18n} = useTranslation();

    let stepImage = '';
    let rtlImgStyle = '';
    let textStyle = '';

    if (props.index === 3) {
        stepImage = stepImg;
    } else if (props.index % 2 === 0) {
        stepImage = stepImg1;
        textStyle = styles['text-ltr'];
        i18n.dir() === "rtl" && (rtlImgStyle = styles['rtl']) && (textStyle = styles['text-rtl']);
    } else {
        stepImage = stepImg2;
        textStyle = styles['text-ltr'];
        i18n.dir() === "rtl" && (rtlImgStyle = styles['rtl']) && (textStyle = styles['text-rtl']);
    }


    return (
        <div className={styles['step-box']}>
            <div className={styles['border-area']}>
                <div className={styles['step']}>
                    <img src={stepImage} className={`${styles['img-style']} ${rtlImgStyle}`}/>
                    <p className={`${styles['text']} ${textStyle}`}>{t(`howItWorksPage.${props.data.text}`)}</p>
                </div>
            </div>
        </div>
    )
}