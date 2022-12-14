import React from "react";
import {
    BooleanInput,
    DateInput,
    Edit,
    NumberInput, SelectInput,
    SimpleForm,
    TextInput
} from 'react-admin';

export default (props) => {
    const styleInput = {maxWidth: "1000px", width: "100%"};

    return <Edit title="Edit projects" {...props}>
        <SimpleForm>
            <TextInput
                disabled
                source="id"
                style={styleInput}
            />
            <TextInput
                defaultValue="Name English"
                source="nameEnglish"
                style={styleInput}
            />
            <TextInput
                defaultValue="Name Arabic"
                source="nameArabic"
                style={styleInput}
            />
            <TextInput
                defaultValue="Description English"
                source="descriptionEnglish"
                style={styleInput}
            />
            <TextInput
                defaultValue="Description Arabic"
                source="descriptionArabic"
                style={styleInput}
            />
            <TextInput
                defaultValue="Author English"
                source="authorEnglish"
                style={styleInput}
            />
            <TextInput
                defaultValue="Author Arabic"
                source="authorArabic"
                style={styleInput}
            />
            <NumberInput
                // defaultValue="500"
                source="usersuggested"
                style={styleInput}
            />
            <NumberInput
                // defaultValue="500"
                source="goal"
                style={styleInput}
            />
            <SelectInput
                source="status"
                choices={[
                    {id: 1, name: 'In queue'},
                    {id: 2, name: 'Approved by publisher'},
                    {id: 3, name: 'Being crowdfunded'},
                    {id: 4, name: 'Did not meet funding'},
                    {id: 5, name: 'Being produced'},
                    {id: 6, name: 'Complete'},
                    {id: 7, name: 'Rejected'},
                ]}
                style={styleInput}
            />
            <SelectInput
                source="license"
                choices={[
                    {id: 1, name: 'Pending'},
                    {id: 2, name: 'Accepted'},
                    {id: 3, name: 'Rejected'},
                ]}
                style={styleInput}
            />

            <DateInput
                // defaultValue="Deadline"
                source="deadline"
                style={styleInput}
            />
            <NumberInput
                // defaultValue=""
                source="narrator"
                style={styleInput}
            />
            <NumberInput
                // defaultValue=""
                source="genre"
                style={styleInput}
            />
            <NumberInput
                // defaultValue='1995'
                source="yearOfPublishing"
                style={styleInput}
            />
            <TextInput
                // defaultValue="1111"
                source="ISBN"
                style={styleInput}
            />
            {/* <TextInput source="imageLink" style={{"maxWidth": "1000px", "width": "100%"}}/> */}
        </SimpleForm>
    </Edit>
};