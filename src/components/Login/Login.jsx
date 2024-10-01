import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const LoginModal = ({ onClose , isVisible }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLoginFormData({ ...loginFormData, [id]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!loginFormData.email) newErrors.email = 'Kötelező kitölteni.';
        if (!loginFormData.password) newErrors.password = 'Kötelező kitölteni.';
        return newErrors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ EmailAddress: loginFormData.email, Password: loginFormData.password }),
            });

            if (response.ok) {
                const { token } = await response.json();
                sessionStorage.setItem('token', token);
                onClose(); //* Bezárja a modalt sikeres bejelentkezés után
            } else {
                const { message } = await response.json();
                setErrors({ login: message || 'Hiba történt a bejelentkezés során.' });
            }
        } catch (error) {
            setErrors({ login: 'Nem sikerült kapcsolatba lépni a szerverrel.' });
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
                            type="email"
                            placeholder="Írd be a felhasználóneved"
                            value={loginFormData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
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
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button className='btn' type="submit">Bejelentkezés</button>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
