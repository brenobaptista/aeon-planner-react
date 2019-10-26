import React from 'react';
import classes from './FormError.module.css'
import { Alert } from 'reactstrap';

const FormError = (props) => {
  return (
    <center>
      <Alert color="danger" className={classes.card60}>
        <h5>Error!</h5>
        {props.errorMessage ? props.errorMessage : 'Complete the form'}
      </Alert>
    </center>
  )
}

export default FormError;