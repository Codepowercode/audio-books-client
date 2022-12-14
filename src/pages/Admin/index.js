import * as React from 'react'
import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from 'react-admin'
import AllNotifications from './AllNotifications'
import EditAllNotifications from './AllNotifications/Edit'
import LastNotification from './LastNotification'
import EditLastNotification from './LastNotification/Edit'
import Projects from './Projects'
import ProjectsEdit from './Projects/Edit'
import Production from './Production'
import ProductionEdit from './Production/Edit'
import FullDonatedBooks from './FullDonatedBooks'
import EditFullDonateBooks from './FullDonatedBooks/Edit'
import UserList from './Users'
import EditUserList from './Users/Edit'
import UploadFile from './Uploads'
import { useEffect } from 'react'
import useHttp from '../../hooks/use-http'
import simpleRestProvider from 'ra-data-simple-rest'

const appdataProvider = simpleRestProvider('https://www.nashir.app/api/books')

export default () => {
  const { error, sendRequest: sendUserData } = useHttp()

  useEffect(() => {
    const fetchedData = (data) => {
      console.log(data)
    }

    sendUserData(
      {
        method: 'GET',
        url: 'https://www.nashir.app/api/books/getAllNotifications',
        // data: {
        //     "email": emailValue,
        //     "password": passwordValue,
        // }
      },
      fetchedData
    )
  }, [])

  return (
    <Admin basename="/admin" dataProvider={appdataProvider}>
      <Resource
        name="getAllNotifications"
        options={{ label: 'All notifications' }}
        list={AllNotifications}
        edit={EditAllNotifications}
      />
      <Resource
        name="getLastNotification"
        options={{ label: 'Latest notification' }}
        list={LastNotification}
        edit={EditLastNotification}
      />
      {/* <Resource
        name="getByStatus/1"
        options={{ label: 'Projects' }}
        list={Projects}
        edit={ProjectsEdit}
        // https://www.nashir.app/api/books/getByStatus/1
      /> */}
      <Resource
        name="getAll"
        options={{ label: 'Under production' }}
        list={Production}
        edit={ProductionEdit}
      />
      {/* <Resource
        name="UploadFile"
        list={UploadFile}
        // edit={EditAllNotifications}
      /> */}
      <Resource
        name="getFullDonatedBooks"
        options={{ label: 'Library books' }}
        list={FullDonatedBooks}
        edit={EditFullDonateBooks}
      />
      <Resource
        name="users"
        options={{ label: 'userList' }}
        list={UserList}
        edit={EditUserList}
        // edit={EditFullDonateBooks}
      />
    </Admin>
  )
}
