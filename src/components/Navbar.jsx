import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleClick = () => {
        window.scrollTo(0, 0);
        setIsOpen(false);
    }


    return (
        <div className="nav">
            <div className="nav-wrapper">
                <Link className='logo-link' to='/' onClick={handleClick}><h2 className="logo">GitArt</h2></Link>

                <ul className={`menu ${isOpen ? 'open' : ''}`}>
                    <li><Link className='links' to="/" onClick={() => setIsOpen(false)}>Kezdőlap</Link></li>
                    <li><Link className='links' to="/stúdió" onClick={() => setIsOpen(false)}>Stúdió</Link></li>
                    <li><Link className='links' to="/termek" onClick={() => setIsOpen(false)}>Próbatermek</Link></li>
                    <li><Link className='links' to="/foglalás" onClick={() => setIsOpen(false)}>Foglalás</Link></li>
                    <li><Link className='links' to="/események" onClick={() => setIsOpen(false)}>Események</Link></li>
                    <li><Link className='links' to="/kapcsolat" onClick={() => setIsOpen(false)}>Kapcsolat</Link></li>

                </ul>


                <i className="fa-solid fa-bars hamb-icon" onClick={toggleMenu}></i>

            </div>
        </div>
    );
}

export default Navbar;



