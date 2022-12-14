import React from 'react'
import './registration.css'
import { RegistrationComponent } from '../../hellperFunctions/RegistrationComponent'

const Registration = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-6 registration-banner"></div>
          <div className="col-12 col-md-6">
            <RegistrationComponent />
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration
