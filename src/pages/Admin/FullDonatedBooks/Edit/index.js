import React, { useState, useEffect } from 'react'
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
  FileInput,
  FileField,
} from 'react-admin'
import styles from '../../../ProfileSettings/profileSettings.module.css'
import camera from '../../../../assets/images/camera.png'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import trash from '../../../../assets/images/delete-trash.png'
import './fullDonatedBooks.css'

export default (props) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [file, setFile] = useState()
  const [pdf, setPdf] = useState()
  const [dataitem, setDataItem] = useState()
  const [selectedImage, setSelectedImage] = useState()
  const [sendImage, setSendImage] = useState()
  const [savedImg, setSavedImg] = useState()

  const imageChangeHandler = (evt) => {
    const [file] = evt.target.files
    setSelectedImage(URL.createObjectURL(file))
    setSendImage(file)
  }
  const fileHandler = (event) => {
    return setFile(event)
  }

  const pdfHandler = (event) => {
    setPdf(event)
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
      url: `https://www.nashir.app/api/books/getFullDonatedBooks/${id}`,
    })
      .then((res) => {
        setSavedImg(`https://www.nashir.app/api/${res.data.imageLink}`)
      })
      .catch((e) => console.log(e.message))
  }, [])

  const submit = (data) => {
    const fm = new FormData()
    Object.keys(data).map((item) => {
      fm.append(`${item}`, data[item])
    })
    fm.append('files', file)

    axios({
      method: 'PUT',
      url: `https://www.nashir.app/api/books/getFullDonatedBooks/${id}`,
      data: fm,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => navigate('/admin/getFullDonatedBooks'))
      .catch((e) => console.log(e.message))
  }

  const audioDeleteHandler = (event, id) => {
    event.preventDefault()
    axios
      .delete(`https://www.nashir.app/api/books/removeAudioBook/${id}`)
      .then((res) => setDataItem(res.data))
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {
    axios
      .get(`https://www.nashir.app/api/books/getFullDonatedBooks/${id}`)
      .then((res) => setDataItem(res.data))
  }, [])

  const savePdf = (event) => {
    event.preventDefault()

    const fm = new FormData()
    fm.append('pdf', pdf)

    axios({
      method: 'POST',
      url: `https://www.nashir.app/api/books/addPdf/${id}`,
      data: fm,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => console.log(res))
      .catch((e) => console.log(e.message))
  }

  return (
    <Edit title="Edit post" {...props}>
      <SimpleForm onSubmit={(data) => submit(data)}>
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
            <label className={styles['camera-icon']} htmlFor={'camera-icon-id'}>
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
        <div className="audioContainer">
          {dataitem &&
            dataitem.audioBooks &&
            dataitem.audioBooks.map((elem, index) => (
              <React.Fragment key={index}>
                <div className="audioContainer_title">Audio file</div>
                {/* <br /> */}
                <div className="audioBook">
                  {/* <div>Title: {elem?.title}</div> */}
                  <br />
                  <audio src={elem.fileName} controls />
                  <div
                    className="audioBookDelete"
                    onClick={(event) => audioDeleteHandler(event, elem.id)}
                  >
                    <img src={trash} />
                  </div>
                </div>
                <br />
              </React.Fragment>
            ))}
        </div>
        <>
          <br />
          <br />
          <div>Select Audio file</div>
          <br />
          <br />
          <FileInput source="file" onChange={(event) => fileHandler(event)}>
            <FileField source="file" title="title" />
          </FileInput>
          <br />

          <TextInput
            // defaultValue="1111"
            source="title"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue="1111"
            source="secondaryTitle"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue="1111"
            source="briefDescription"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <NumberInput
            // defaultValue=""
            source="audioBookDuration"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue="1111"
            source="narratorName"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue="1111"
            source="narrationCompanyName"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
          <TextInput
            // defaultValue="1111"
            source="manualyTags"
            style={{ maxWidth: '1000px', width: '100%' }}
          />
        </>
        <div>
          <FileInput
            source="pdf"
            accept="application/pdf"
            onChange={(event) => pdfHandler(event)}
          >
            <FileField source="pdf" title="title" />
          </FileInput>
          <button
            style={{
              backgroundColor: '#1565c0',
              width: '100px',
              height: '42px',
              border: 'none',
              borderRadius: '9px',
              color: 'white',
              outline: 'none',
              cursor: 'pointer',
            }}
            onClick={(event) => savePdf(event)}
          >
            Save Pdf
          </button>
        </div>

        {/* <TextInput source="imageLink" style={{"maxWidth": "1000px", "width": "100%"}}/> */}
      </SimpleForm>
    </Edit>
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
