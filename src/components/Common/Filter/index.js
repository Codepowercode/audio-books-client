import React from 'react'
import styles from './filter.module.css'
import filterIcon from './../../../assets/images/filterIcon.png'
import Search from './../Search'
import DropDown from './../DropDown'
import { useTranslation } from 'react-i18next'
import { SelectInput, SimpleForm } from 'react-admin'
import { libraryFilterData } from '../../DummyData'

export default (props) => {
  const { t } = useTranslation()
  const isProduction = props.isProduction
  const isLibrary = props.isLibrary

  const choices = [
    { id: 8, name: 'All' },
    // { id: 1, name: 'In queue' },
    // { id: 2, name: 'Approved by publisher' },
    { id: 3, name: 'Being crowdfunded' },
    { id: 4, name: 'Did not meet funding' },
    { id: 5, name: 'Being produced' },
    { id: 6, name: 'Complete' },
    { id: 7, name: 'Rejected' },
  ]

  const selectInput = {
    author: [
      { id: 8, name: 'All' },
      // { id: 1, name: 'In queue' },
      // { id: 2, name: 'Approved by publisher' },
      { id: 3, name: 'Author' },
      { id: 4, name: 'Did not meet funding' },
      { id: 5, name: 'Being produced' },
      { id: 6, name: 'Complete' },
      { id: 7, name: 'Rejected' },
    ],
    narrator: [
      { id: 8, name: 'All' },
      // { id: 1, name: 'In queue' },
      // { id: 2, name: 'Approved by publisher' },
      { id: 3, name: 'Narrator' },
      { id: 4, name: 'Did not meet funding' },
      { id: 5, name: 'Being produced' },
      { id: 6, name: 'Complete' },
      { id: 7, name: 'Rejected' },
    ],
    genre: [
      { id: 8, name: 'All' },
      // { id: 1, name: 'In queue' },
      // { id: 2, name: 'Approved by publisher' },
      { id: 3, name: 'Genre' },
      { id: 4, name: 'Did not meet funding' },
      { id: 5, name: 'Being produced' },
      { id: 6, name: 'Complete' },
      { id: 7, name: 'Rejected' },
    ],
    publicYear: [
      { id: 8, name: 'All' },
      // { id: 1, name: 'In queue' },
      // { id: 2, name: 'Approved by publisher' },
      { id: 3, name: 'Genre' },
      { id: 4, name: 'Did not meet funding' },
      { id: 5, name: 'Being produced' },
      { id: 6, name: 'Complete' },
      { id: 7, name: 'Rejected' },
    ],
  }

  return (
    <div className={styles['filter-main-container']}>
      <div className={styles['container']}>
        <div>
          <div className={styles['filter-by']}>
            <img src={filterIcon} alt="filter icon" />
            <span>{t('filter.filter')}</span>
          </div>

          <Search
            isLibrary={props.isLibrary}
            isProduction={isProduction}
            setSearchValue={props.setSearchValue}
          />
        </div>
        {!props.isProject && props.dd_data.map((item, index) => (
          <div className={styles['status-container']} key={index}>
            <span>{t(`filter.${item.id}`)}</span>
            {!isProduction ? (
              <>
                <DropDown
                  isLibrary={props.isLibrary}
                  setFilertStatus={props.setFilertStatus}
                  filterStatus={props.filterStatus}
                  currentName={Object.keys(selectInput).find(
                    (elem) => elem === item.id
                  )}
                  data={{
                    placeholder: item.placeholder,
                    // dropMenuItems: item.dd_menu_items,
                    dropMenuItems:
                      selectInput[
                        Object.keys(selectInput).find(
                          (elem) => elem === item.id
                        )
                      ],
                  }}
                />
              </>
            ) : (
              <DropDown
                isProduction={props.isProduction}
                setFilertStatus={props.setFilertStatus}
                data={{
                  placeholder: item.placeholder,
                  // dropMenuItems: item.dd_menu_items,
                  dropMenuItems: choices,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
