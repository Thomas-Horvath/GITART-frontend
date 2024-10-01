import React from 'react';
import { IoMdClose } from "react-icons/io";



const InfoModal = ({ onClose , isVisible }) => {
    return (
        <div className={`login-modal ${ isVisible ? 'show' : ''}`
        }>
            <div className="login-modal-content">
                <p className="close" onClick={onClose}>
                    <IoMdClose />
                </p>


                <h2>Információ</h2>
                <p>
                    Az online foglalás menete a következőképpen zajlik:
                    <br /><br />
                    REGISZTRÁCIÓ: Az online naptárunk használata regisztrációhoz kötött.
                    Regisztráció során kötelezően meg kell adnod az alábbi adatokat: neved, email címed, telefonszámod.
                    <br /><br />
                    BELÉPÉS: Az általad megadott email cím és jelszó segítségével be tudsz lépni az online naptárba.
                    <br /><br />
                    A foglalásokat a naptárban tudod intézni.
                </p>
                <button className='btn' onClick={onClose}>Bezárás</button>
            </div>
        </div>
    );
};

export default InfoModal;
