import React from 'react';
import classes from './FormError.module.css'

const FormError = () => {
  return (
    <center>
      <div class={`shadow-sm card ${classes.card50}`}>
        <div class="card-body">
          <h5 class="card-title">Error!</h5>
          <p class="card-text">Complete the form</p>
        </div>
      </div>
    </center>
  )
}

export default FormError;