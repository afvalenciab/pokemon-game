import React from 'react';
import { createPortal } from 'react-dom';

const Modal = (props) => {
  return createPortal(
    props.children,
    document.getElementById('modal-container')
  );
};

export default Modal;