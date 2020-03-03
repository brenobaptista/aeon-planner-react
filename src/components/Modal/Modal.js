import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
  const { show, clickBackdrop, children } = props;

  const toggleClass = show ? classes.modalOpen : classes.modalClose;

  return (
    <>
      <Backdrop show={show} clicked={clickBackdrop} />
      <div className={`${classes.modal} ${toggleClass}`}>
        {children}
      </div>
    </>
  );
};

export default modal;
