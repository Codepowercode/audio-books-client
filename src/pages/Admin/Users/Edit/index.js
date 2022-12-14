import React from 'react'
import {
  Edit,
  BooleanField,
  SimpleForm,
  DateInput,
  NumberField,
  NumberInput,
  TextInput,
  ReferenceInput,
  SelectInput,
  ImageInput,
  ImageField,
} from 'react-admin'

export default (props) => (
  <Edit title="Edit post" {...props}>
    <SimpleForm>
      <TextInput
        disabled
        source="id"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      {/* <TextInput
        defaultValue="avatar"
        source="avatar"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <TextInput
        defaultValue="birthday"
        source="birthday"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <TextInput
        defaultValue="country"
        source="country"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <TextInput
        defaultValue="donated"
        source="donated"
        style={{ maxWidth: '1000px', width: '100%' }}
      /> */}
      <TextInput
        defaultValue="email"
        source="email"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <TextInput
        defaultValue="name"
        source="name"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <TextInput
        disabled
        defaultValue="subscriptionStatus"
        source="subscriptionStatus"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <TextInput
        disabled
        defaultValue="start_date"
        source="start_date"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <TextInput
        disabled
        defaultValue="end_date"
        source="end_date"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      {/* <TextInput
        defaultValue="gender"
        source="gender"
        style={{ maxWidth: '1000px', width: '100%' }}
      />
      <NumberInput
        defaultValue="role"
        source="role"
        style={{ maxWidth: '1000px', width: '100%' }}
      /> */}
    </SimpleForm>
  </Edit>
)
