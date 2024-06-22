import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="nav">
            <div className="nav-wrapper">
                <h2 className="logo">
                    GitArt
                </h2>

                <ul className={`menu ${isOpen ? 'open' : ''}`}>
                    <li><Link className='links' to="/" onClick={() => setIsOpen(false)}>Kezdőlap</Link></li>
                    <li><Link className='links' to="/about" onClick={() => setIsOpen(false)}>Rólunk</Link></li>
                    <li><Link className='links' to="/rooms" onClick={() => setIsOpen(false)}>Próbatermek</Link></li>
                    <li><Link className='links' to="/booking" onClick={() => setIsOpen(false)}>Foglalás</Link></li>
                    <li><Link className='links' to="/contact" onClick={() => setIsOpen(false)}>Kapcsolat</Link></li>
                    <li><Link className='links' to="/signin" ><i class="fa-solid fa-user"></i></Link></li>
                </ul>

            
                <i className="fa-solid fa-bars hamb-icon" onClick={toggleMenu}></i>

            </div>
        </div>
    );
}

export default Navbar;



