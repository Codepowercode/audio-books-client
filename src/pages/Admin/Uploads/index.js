import React, { useState } from 'react'
import './upload.css'
import axios from 'axios'

const UploadFile = () => {
  const [files, setFiles] = useState([])

  const fileSelectedHandler = (e) => {
    setFiles((state) => [...state, e.target.files])
  }

  const submitHandler = (e) => {
    e.preventDefault()
    axios.post(`https://www.nashir.app/api/books/addAudio`, {
      audio: files[0],
    })
  }

  return (
    <form className="upload" onSubmit={submitHandler}>
      <div>
        <h2>Upload Bookss</h2>
      </div>
      {/* {files &&
        files.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))} */}
      {/* <h3>Images</h3> */}
      <div>
        <input type="file" multiple onChange={fileSelectedHandler} />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default UploadFile
