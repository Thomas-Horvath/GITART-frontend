import React from 'react';
import { IoMdClose } from "react-icons/io";
import BodyScrollHidden from '../BodyScrollHidden';

const AlertModal = ({ message, isVisible, onClose }) => {
  BodyScrollHidden(isVisible)
  return (
    <div className={`modal ${isVisible ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}><IoMdClose /></span>
        <h2>Figyelmeztetés</h2>
        <div className="message-container">
          <p>{message}</p>
        </div>
        <button className='btn'  onClick={onClose}>Oké</button>
      </div>
    </div>
  );
};

export default AlertModal;
