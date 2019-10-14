import React from 'react';
import classes from './FormError.module.css'

const FormError = () => {
  return (
    <center>
      <div className={`shadow-sm card ${classes.card50}`}>
        <div className="card-body">
          <h5 className="card-title">Error!</h5>
          <p className="card-text">Complete the form</p>
        </div>
      </div>
    </center>
  )
}

export default FormError;