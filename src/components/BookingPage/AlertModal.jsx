import React from 'react';
import { IoMdClose } from "react-icons/io";
import BodyScrollHidden from '../BodyScrollHidden';

const AlertModal = ({ message, isVisible, onClose, onConfirm, confirmButtonDisabled , isGreen}) => {
  BodyScrollHidden(isVisible);

  return (
    <div className={`modal ${isVisible ? 'show' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}><IoMdClose /></span>
        <h2 className={`${confirmButtonDisabled ? 'd-none' : ''}`}>Figyelmeztetés</h2>
        <div className={`message-container ${ isGreen ? 'success-delete' : ''}`} >
          <p>{message}</p>
        </div>
        {/* Feltételes gombok megjelenítése */}
        {onConfirm && !confirmButtonDisabled ? (
          <>
            <div className={`btn-group ${confirmButtonDisabled ? 'd-none' : ''}`}>
              <button className='btn' onClick={onClose}>Mégsem</button>
              <button className='delete-btn' onClick={onConfirm}>Megerősítés</button>
            </div>
          </>
        ) : (
          <button className='btn' onClick={onClose}>Oké</button>
        )}
      </div>
    </div>
  );
};

export default AlertModal;
