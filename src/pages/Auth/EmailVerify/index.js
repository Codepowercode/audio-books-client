import React from "react";
import styles from './emailVerify.module.css';
import emailIcon from './../../../assets/images/emailIcon.png';
import PageTitle from './../../../components/Common/PageTitle';
import Button from './../../../components/Common/UI/Button';
import {useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default () => {

    const location = useLocation();
    const state = location.state;
    const {t, i18n} = useTranslation();

    return (
        <div className={styles['main-container']} dir={i18n.dir()}>
            <div className={styles['container']}>
                <div className={styles['img-container']}>
                    <img src={emailIcon} alt='email icon'/>
                </div>
                <div className={styles['title-container']}>
                    <PageTitle text={t('emailVerifyPage.title')}/>
                </div>
                <p className={styles['verify-text']}>
                    {t('emailVerifyPage.sent1')} {state.emailToVerify || 'sjdug6596@gmail.com'} {t('emailVerifyPage.sent2')}
                </p>
                <p className={styles['verify-text']}>
                    <Button type='link'>
                        {t('emailVerifyPage.click')}
                    </Button>
                    {t('emailVerifyPage.clickText')}
                </p>
            </div>
        </div>
    )
}