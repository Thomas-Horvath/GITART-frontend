import React from 'react'
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';




export default function Footer() {

    return (
        <>
            <div className='footer'>
                <div className="footer-container w1400">
                    <div className="footer-contacts">
                        <ul>
                            <li className='contacts-item'>
                               <strong>Cím:</strong> Budapest XIII Zene utca 34.
                            </li>
                            <li className='contacts-item'>
                               <strong>Email:</strong>  info@gitart.hu
                            </li>
                            <li className='contacts-item'>
                               <strong>Telefonszám:</strong>  +36 20 555 4567
                            </li>
                            <li className="social">
                                <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <FaFacebook size={30} />
                                </Link>
                                <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <FaInstagram size={32} />
                                </Link>
                                <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                    <FaYoutube size={38} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="policy-links">
                        <ul>
                            <li className="policy-link"><Link to={'/adatkezelés/adatvédelem'}>Adatvédelem</Link></li>
                            <li className="policy-link"><Link to={'/adatkezelés/impresszum'}>Impresszum</Link></li>
                            <li className="policy-link"><Link to={'/adatkezelés/cookie'}>Cookiek kezelése</Link></li>
                        </ul>
                    </div>

                    <div className='footer-menu'>
                        <ul>
                            <li><Link className='footer-links' to="/" >Kezdőlap</Link></li>
                            <li><Link className='footer-links' to="/stúdió">Stúdió</Link></li>
                            <li> <Link className='footer-links' to="/termek">Próbatermek</Link></li>
                            <li><Link className='footer-links' to="/foglalás">Foglalás</Link></li>
                            <li><Link className='footer-links' to="/kapcsolat">Kapcsolat</Link></li>
                        </ul>





                    </div>



                </div>
            </div>
            <div className="copyright">
                <p>Copyright &copy;2024 Thomas Horvath</p>
            </div>
        </>
    )
}
