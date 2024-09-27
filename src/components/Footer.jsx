import React from 'react'
import { Link } from 'react-router-dom';



export default function Footer() {
 
    return (
        <>
            <div className='footer'>
                <div className='footer-menu'>
                    <Link className='footer-links' to="/" >Kezdőlap</Link>
                    <Link className='footer-links' to="/about">Rólunk</Link>
                    <Link className='footer-links' to="/rooms">Próbatermek</Link>
                    <Link className='footer-links' to="/booking">Foglalás</Link>
                    <Link className='footer-links' to="/contact">Kapcsolat</Link>
                </div>
            </div>
            <div className="copyright">
                <p>Copyright &copy;2024 Thomas Horvath</p>
            </div>
        </>
    )
}
