import React from "react";
import BodyScrollHidden from "../../components/BodyScrollHidden";

const Modal = ({ isOpen, imgSrc, onClose }) => {
    BodyScrollHidden(isOpen);
    return (
        <div className="img-modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close" onClick={onClose}>&times;</span>
                <img src={imgSrc} alt="Nagyított kép" />
            </div>
        </div>
    );
};

export default Modal;