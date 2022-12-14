import React from 'react'

import {
  BooleanField,
  Datagrid,
  DateField,
  List,
  EditButton,
  NumberField,
  TextField,
  DeleteButton,
} from 'react-admin'

export default () => (
  <List style={{ overflowX: 'scroll' }}>
    <Datagrid>
      <EditButton basepath="/users" />
      <DeleteButton basepath="/users" />
      <TextField source="id" />
      <TextField source="name" />
      {/* <TextField source="avatar" /> */}
      <TextField source="birthday" />
      <TextField source="country" />
      <TextField source="donated" />
      <TextField source="email" />
      <TextField source="gender" />
      {/* <TextField source="role" /> */}
      <TextField source="subscribtionStatus" />
      <TextField source="start_date" />
      <TextField source="end_date" />
      {/* <BooleanField source="isImage" />
            <NumberField source="kickoffPledge" />
            <TextField source="goal" />
            <NumberField source="donated" />
            <DateField source="deadline" />
            <NumberField source="usersuggested" />
            <DateField source="audiocount" />
            <BooleanField source="isPdfAdded" />
            <TextField source="narrator" />
            <NumberField source="status" />
            <TextField source="genre" />
            <NumberField source="yearOfPublishing" />
            <TextField source="ISBN" />
            <TextField source="imageLink" /> */}
    </Datagrid>
  </List>
)
