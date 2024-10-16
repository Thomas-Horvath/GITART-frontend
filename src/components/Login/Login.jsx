import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import BodyScrollHidden from '../BodyScrollHidden';

import sendEmailAlerts from '../../utils/emailService';


const LoginModal = ({ onClose, isVisible }) => {

    BodyScrollHidden(isVisible)

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [fetchErrors, setFetchErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loginAttemptError, setLoginAttemptError] = useState('');



    useEffect(() => {
        if (!isVisible) {
            setErrors({})
            setFetchErrors({})
        }
    }, [isVisible]);


    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginFormData({ ...loginFormData, [id]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        // email ellenőrzése
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Egyszerű email reguláris kifejezés
        if (!loginFormData.email) {
            newErrors.email = 'Kötelező kitölteni.';
        } else if (!emailRegex.test(loginFormData.email)) {
            newErrors.email = 'Kérjük, adjon meg egy érvényes email címet.';
        }
        if (!loginFormData.password) newErrors.password = 'Kötelező kitölteni.';
        return newErrors;
    };

    const handleClose = () => {
        setLoginFormData({ email: '', password: '' }); // Form tartalmának törlése
        setErrors({});
        setFetchErrors({});
        onClose();
    };




    const handleLogin = async (e) => {
        e.preventDefault();
        const loginAttempts = parseInt(sessionStorage.getItem('loginAttempts'), 10) || 0;

        const emailData = {
            emailAddress: loginFormData.email.toLowerCase(),
            lastName: "",
            firstName: "",
            date: "",
            room: "",
            startTime: "",
            endTime: ""
        }



        if (loginAttempts >= 5) {
            setLoginAttemptError('Túl sok sikertelen bejelentkezési kísérlet. Próbálkozzon később!!');
            setErrors({}); 
            sendEmailAlerts(emailData, "login_attempt_warning", "Figyelmeztetés")
            // Gomb letiltása
            setIsButtonDisabled(true);
            setTimeout(() => {
                sessionStorage.setItem('loginAttempts', 0);
                setLoginAttemptError('');
                setIsButtonDisabled(false); // Gomb újra engedélyezése 5 perc után
            }, 300000) // 5 perc
            return;
        }



        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        } else {
            setErrors({});
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ EmailAddress: loginFormData.email.toLowerCase(), Password: loginFormData.password, LoginAttempts: loginAttempts }),
            });

            if (response.ok) {
                const { token } = await response.json();
                sessionStorage.setItem('loginAttempts', 0);
                sessionStorage.setItem('token', token);
                setErrors({})
                onClose(); //* Bezárja a modalt sikeres bejelentkezés után
            } else {
                const { message } = await response.json();
                setFetchErrors({ login: message || 'Hiba történt a bejelentkezés során.' });
                // Ellenőrizd, hogy a hiba jelszóhibából származik-e
                if (message.includes('jelszó')) {
                    const updatedAttempts = loginAttempts + 1;
                    sessionStorage.setItem('loginAttempts', updatedAttempts);
                }
            }
        } catch (error) {
            setFetchErrors({ login: 'Nem sikerült kapcsolatba lépni a szerverrel.' });
        }
    };

    return (
        <div className={`login-modal ${isVisible ? 'show' : ''}`}>
            <div className="login-modal-content">
                <p className="close" onClick={handleClose}>
                    <IoMdClose />
                </p>


                <form onSubmit={handleLogin}>
                    <h2>Bejelentkezés</h2>
                    <div className="input-group">
                        <label htmlFor="email">Email cím</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Írd be a felhasználóneved"
                            value={loginFormData.email}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.email && <p className="error">{errors.email}</p>}
                    <div className="input-group">
                        <label htmlFor="password">Jelszó:</label>
                        <input
                            id="password"
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Írd be a jelszavad"
                            value={loginFormData.password}
                            onChange={handleChange}
                        />
                        <span onClick={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <p className="error">
                        {loginAttemptError ? loginAttemptError : (fetchErrors.login || '')}
                    </p>

                    {errors.password && <p className="error">{errors.password}</p>}

                    <button className='btn' type="submit" disabled={isButtonDisabled}>Bejelentkezés</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
