import React from "react";
import styles from './cardDetails.module.css';
import cardIcon from './../../assets/images/cardIconBig.png';
import PageTitle from './../../components/Common/PageTitle';
import Input from "../../components/Common/UI/Input";
import Button from "../../components/Common/UI/Button";
import {useTranslation} from "react-i18next";

export default () => {

    const {t, i18n} = useTranslation();


    return(
        <div className={styles['main-container']}>
            <div className={styles['container']}>
                <div className={styles['left-area']}>
                    <img src={cardIcon} alt='card icon'/>
                </div>
                <div className={styles['right-area']}>
                    <PageTitle text={t('cardPage.title')}/>
                    <form className={styles['form']} dir={i18n.dir()}>
                        <Input
                            label={t('cardPage.cardName')}
                            // hasError={emailHasError}
                            // errorMessage='Email address is invalid.'
                            input={{
                                id: 'cardholder-name',
                                // onChange: emailChangeHandler,
                                // onBlur:emailBlurHandler,
                            }}
                        />
                        <Input
                            label={t('cardPage.cardNumber')}
                            // hasError={emailHasError}
                            // errorMessage='Email address is invalid.'
                            input={{
                                id: 'card-number',
                                type: 'number',
                                placeholder:'**** **** **** ****',
                                // onChange: emailChangeHandler,
                                // onBlur:emailBlurHandler,
                            }}
                        />
                        <div className={styles['cvv-expiration-container']}>
                            <Input
                                label={t('cardPage.expiryDate')}
                                // hasError={emailHasError}
                                // errorMessage='Email address is invalid.'
                                input={{
                                    id: 'expiration-date',
                                    type: 'number',
                                    placeholder:'mm/yy',
                                    // onChange: emailChangeHandler,
                                    // onBlur:emailBlurHandler,
                                }}
                            />
                            <Input
                                label={t('cardPage.cvv')}
                                // hasError={emailHasError}
                                // errorMessage='Email address is invalid.'
                                input={{
                                    id: 'cvv',
                                    type: 'number',
                                    placeholder:'***',
                                    // onChange: emailChangeHandler,
                                    // onBlur:emailBlurHandler,
                                }}
                            />
                        </div>
                        <div className={styles['btn-container']}>
                            <Button type='primary'>{t('cardPage.save')}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}