import React, { useState, useEffect } from 'react'
import styles from '../../../ProfileSettings/profileSettings.module.css'
import camera from '../../../../assets/images/camera.png'
import { useParams } from 'react-router-dom'
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
import axios from 'axios'

export default (props) => {
  const [selectedImage, setSelectedImage] = useState()
  const [sendImage, setSendImage] = useState()
  const [savedImg, setSavedImg] = useState()
  const { id } = useParams()

  const imageChangeHandler = (evt) => {
    const [file] = evt.target.files
    setSelectedImage(URL.createObjectURL(file))
    setSendImage(file)
  }
  useEffect(() => {
    const formData = new FormData()
    formData.append('image', sendImage)

    axios({
      method: 'post',
      url: `https://www.nashir.app/api/books/${id}/add-image`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: 'Bearer ' + cutToken,
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => console.log(e.message))
  }, [sendImage])

  useEffect(() => {
    axios({
      method: 'get',
      url: `https://www.nashir.app/api/books/getAll/${id}`,
    })
      .then((res) => {
        setSavedImg(`https://www.nashir.app/api/${res.data.imageLink}`)
      })
      .catch((e) => console.log(e.message))
  }, [])
  return (
    <>
      <Edit title="Edit post" {...props}>
        <SimpleForm>
          <TextInput
            disabled
            source="id"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <div className={styles['form-container']}>
            <div className={styles['image-box']}>
            <img
                src={selectedImage ? selectedImage : savedImg}
                alt="Upload Photo"
              />
              <label
                className={styles['camera-icon']}
                htmlFor={'camera-icon-id'}
              >
                <input
                  id="camera-icon-id"
                  type={'file'}
                  onChange={imageChangeHandler}
                />
                <img src={camera} alt="camera icon" />
              </label>
            </div>
          </div>
          <TextInput
            defaultValue="Name English"
            source="nameEnglish"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            defaultValue="Name Arabic"
            source="nameArabic"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            defaultValue="Description English"
            source="descriptionEnglish"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            defaultValue="Description Arabic"
            source="descriptionArabic"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            defaultValue="Author English"
            source="authorEnglish"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            defaultValue="Author Arabic"
            source="authorArabic"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <NumberInput
            // defaultValue="500"
            source="usersuggested"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <NumberInput
            // defaultValue="500"
            source="goal"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <SelectInput
            source="status"
            choices={[
              { id: 1, name: 'In queue' },
              { id: 2, name: 'Approved by publisher' },
              { id: 3, name: 'Being crowdfunded' },
              { id: 4, name: 'Did not meet funding' },
              { id: 5, name: 'Being produced' },
              { id: 6, name: 'Complete' },
              { id: 7, name: 'Rejected' },
            ]}
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <SelectInput
            source="license"
            choices={[
              { id: 1, name: 'Pending' },
              { id: 2, name: 'Accepted' },
              { id: 3, name: 'Rejected' },
            ]}
            style={{ maxWidth: '1000px', width: '100%' }}
          />

          <DateInput
            // defaultValue="Deadline"
            source="deadline"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue=""
            required
            source="narrator"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue=""
            required
            source="genre"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <NumberInput
            // defaultValue='1995'
            source="yearOfPublishing"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue="1111"
            source="ISBN"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          {/* <TextInput source="imageLink" style={{"maxWidth": "1000px", "width": "100%"}}/> */}
        </SimpleForm>
      </Edit>
    </>
  )
}

// import { stringify } from "query-string";
// import {fetchUtils,GET_LIST,GET_ONE,GET_MANY, GET_MANY_REFERENCE,CREATE,UPDATE,UPDATE_MANY,DELETE,DELETE_MANY
// } from "react-admin";
//
// export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
//     const convertDataRequestToHTTP = (type, resource, params) => {
//         let url = "";
//         const options = {};
//         switch (type) {
//             case GET_LIST: {
//                 const { page, perPage } = params.pagination;
//                 const { field, order } = params.sort;
//                 const query = {
//                     sort: JSON.stringify([field, order]),
//                     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//                     filter: JSON.stringify(params.filter)
//                 };
//                 url = `${apiUrl}/${resource}?${stringify(query)}`;
//                 break;
//             }
//             case GET_ONE:
//                 url = `${apiUrl}/${resource}/${params.id}`;
//                 break;
//             case GET_MANY: {
//                 const query = {
//                     filter: JSON.stringify({ id: params.ids })
//                 };
//                 url = `${apiUrl}/${resource}?${stringify(query)}`;
//                 break;
//             }
//             case GET_MANY_REFERENCE: {
//                 const { page, perPage } = params.pagination;
//                 const { field, order } = params.sort;
//                 const query = {
//                     sort: JSON.stringify([field, order]),
//                     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//                     filter: JSON.stringify({
//                         ...params.filter,
//                         [params.target]: params.id
//                     })
//                 };
//                 url = `${apiUrl}/${resource}?${stringify(query)}`;
//                 break;
//             }
//             case UPDATE:
//                 url = `${apiUrl}/${resource}/${params.id}`;
//                 options.method = "PUT";
//                 options.body = JSON.stringify(params.data);
//                 break;
//             case CREATE:
//                 url = `${apiUrl}/${resource}`;
//                 options.method = "POST";
//                 options.body = JSON.stringify(params.data);
//                 break;
//             case DELETE:
//                 url = `${apiUrl}/${resource}/${params.id}`;
//                 options.method = "DELETE";
//                 break;
//             default:
//                 throw new Error(`Unsupported fetch action type ${type}`);
//         }
//         return { url, options };
//     };
//
//
//     const convertHTTPResponse = (response, type, resource, params) => {
//         const { headers, json } = response;
//         switch (type) {
//             case GET_LIST:
//             case GET_MANY_REFERENCE:
//                 if (!headers.has("X-Total-Count")) {
//                     throw new Error(
//                         "The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?"
//                     );
//                 }
//                 return {
//                     data: json,
//                     total: parseInt(
//                         headers
//                             .get("X-Total-Count")
//                             .split("/")
//                             .pop(),
//                         10
//                     )
//                 };
//             case CREATE:
//                 return { data: { ...params.data, id: json.id } };
//             default:
//                 return { data: json };
//         }
//     };
//     return (type, resource, params) => {
//         // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
//         if (type === UPDATE_MANY) {
//             return Promise.all(
//                 params.ids.map(id =>
//                     httpClient(`${apiUrl}/${resource}/${id}`, {
//                         method: "PUT",
//                         body: JSON.stringify(params.data)
//                     })
//                 )
//             ).then(responses => ({
//                 data: responses.map(response => response.json)
//             }));
//         }
//         // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
//         if (type === DELETE_MANY) {
//             return Promise.all(
//                 params.ids.map(id =>
//                     httpClient(`${apiUrl}/${resource}/${id}`, {
//                         method: "DELETE"
//                     })
//                 )
//             ).then(responses => ({
//                 data: responses.map(response => response.json)
//             }));
//         }
//
//         const { url, options } = convertDataRequestToHTTP(type, resource, params);
//         return httpClient(url, options).then(response =>
//             convertHTTPResponse(response, type, resource, params)
//         );
//     };
//
// };
