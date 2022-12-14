import React from "react";
import styles from './howItWorks.module.css';
import PageTitle from './../../components/Common/PageTitle';
import SingleStep from './SingleStep';
import {howItWorksStepData} from "../../components/DummyData";
import {useTranslation} from "react-i18next";

export default () => {

    const {t, i18n} = useTranslation();


    return (
        <div className={styles['main-container']} dir={i18n.dir()}>
            <PageTitle text={t('howItWorksPage.title')}/>
            <div className={styles['container']}>
                <div className={styles['steps-container']}>
                    {howItWorksStepData.map((item, index) =>
                        <SingleStep
                            index={index}
                            data={item}
                            key={index}/>
                    )}
                </div>
            </div>
        </div>
    )
}