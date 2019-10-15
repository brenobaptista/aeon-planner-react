import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  let toggleClass = props.show ? classes.modalOpen : classes.modalClose;
  
  return (
    <>
      <Backdrop show={props.show} clicked={props.clickBackdrop} />
      <div className={`${classes.modal} ${toggleClass}`}>
        {props.children}
      </div>
    </>
  )
}

export default modal;