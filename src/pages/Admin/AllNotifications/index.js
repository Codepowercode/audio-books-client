import React, { useState } from 'react'
import {
  DeleteButton,
  Datagrid,
  List,
  TextField,
  EditButton,
  BooleanField,
  NumberField,
  DateField,
  SelectInput,
  useListContext,
  SimpleForm,
} from 'react-admin'

export const FilteredComponent = (props) => {
  const { data, isLoading } = useListContext()
  const [filterKey, setFilterKey] = useState(null)

  if (isLoading) return null
  const newData = data.filter((item) => item.license === filterKey)

  return (
    <>
      <SimpleForm toolbar={false}>
        <SelectInput
          onChange={(evt) => setFilterKey(evt.target.value)}
          source="license"
          choices={[
            { id: 1, name: 'Pending' },
            { id: 2, name: 'Accepted' },
            { id: 3, name: 'Rejected' },
          ]}
        />
      </SimpleForm>
      <Datagrid data={filterKey === null ? data : newData}>
        <EditButton basepath="/getAllNotifications" />
        <DeleteButton basepath="/getAllNotifications" />
        <TextField source="id" />
        <TextField source="nameEnglish" />
        <TextField source="nameArabic" />
        <TextField source="descriptionEnglish" />
        <TextField source="descriptionArabic" />
        <TextField source="authorEnglish" />
        <TextField source="authorArabic" />
        <TextField source="imageext" />
        <BooleanField source="isImage" />
        <NumberField source="kickoffPledge" />
        <TextField source="goal" />
        <NumberField source="donated" />
        <DateField source="deadline" />
        <NumberField source="usersuggested" />
        <DateField source="audiocount" />
        <BooleanField source="isPdfAdded" />
        <TextField source="narrator" />
        <NumberField source="status" />
        <NumberField source="license" />
        <TextField source="genre" />
        <NumberField source="yearOfPublishing" />
        <TextField source="ISBN" />
        <TextField source="imageLink" />
      </Datagrid>
    </>
  )
}

export default (props) => {
  return (
    <List {...props}>
      <FilteredComponent />
    </List>
  )
}
