import React, {useState} from "react";
import styles from './switchLang.module.css';

export default (props) => {


    const [activeLang, setActiveLang] = useState(0);


    const activeUsersChangeHandler = (index) => {
        setActiveLang(index);
        props.onChangeHandler(index)
    };

    const userCategories = props.data.map((item, index) =>
        <span
            onClick={() => activeUsersChangeHandler(index)}
            key={index}
            className={`${activeLang === index && styles['active-lang']}`}
        >{item.title}</span>);


    return (
        <div className={styles['main-container']}>
            <div>
                {userCategories}
            </div>
        </div>
    )

}