import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import BodyScrollHidden from '../BodyScrollHidden';

const LoginModal = ({ onClose, isVisible }) => {

    BodyScrollHidden(isVisible)

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [fetchErrors, setFetchErrors] = useState({});


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







    const handleLogin = async (e) => {
        e.preventDefault();
        const loginAttempts = parseInt(sessionStorage.getItem('loginAttempts'), 10) || 0;
        if (loginAttempts >= 5) {
          setFetchErrors({ login: 'Túl sok sikertelen bejelentkezési kísérlet. Próbálkozzon később!!' })
            setTimeout(() => {
                sessionStorage.setItem('loginAttempts', 0);
            }, 60000)
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
                body: JSON.stringify({ EmailAddress: loginFormData.email, Password: loginFormData.password , LoginAttempts: loginAttempts}),
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
                <p className="close" onClick={onClose}>
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
                    {errors.password && <p className="error">{errors.password}</p>}
                    {fetchErrors.login && <p className="error">{fetchErrors.login}</p>}
                    <button className='btn' type="submit">Bejelentkezés</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
