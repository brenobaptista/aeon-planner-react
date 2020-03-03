import React from 'react';
import { Alert } from 'reactstrap';
import classes from './FormError.module.css';

const FormError = (props) => {
  const { errorMessage } = props;

  return (
    <center>
      <Alert color="danger" className={classes.card60}>
        <h5>Error!</h5>
        {errorMessage || 'Complete the form'}
      </Alert>
    </center>
  );
};

export default FormError;
