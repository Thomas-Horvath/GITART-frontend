import React, { useState, useEffect } from 'react';
import sendEmailAlerts from '../../utils/emailService';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import BodyScrollHidden from '../BodyScrollHidden';

const RegisterModal = ({ onClose, isVisible, setIsRegisterModalVisible }) => {
    BodyScrollHidden(isVisible)


    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        bookingName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        dataPrivacy: false,
    });
    const [errors, setErrors] = useState({});
    const [serverErrors, setServerErrors] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleChange = (e) => {
        const { id, type, checked, value } = e.target;
        setFormData({ ...formData, [id]: type === 'checkbox' ? checked : value });
    };



    useEffect(() => {
        if (!isVisible) {
            setFormData({
                firstName: '',
                lastName: '',
                bookingName: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                dataPrivacy: false,
            });
            setErrors({});
            setRegistrationSuccess(false);
        }
    }, [isVisible]);




    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'Kötelező kitölteni.';
        if (!formData.lastName) newErrors.lastName = 'Kötelező kitölteni.';
        if (!formData.bookingName) newErrors.bookingName = 'Kötelező kitölteni.';


        // telefonszám ellenőrzése
        const phoneNumber = parsePhoneNumberFromString(formData.phone, 'HU');
        if (!phoneNumber || !phoneNumber.isValid()) {
            newErrors.phone = 'Kérjük, adjon meg egy érvényes telefonszámot.';
        }


        // email ellenőrzése
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Egyszerű email reguláris kifejezés
        if (!formData.email) {
            newErrors.email = 'Kötelező kitölteni.';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Kérjük, adjon meg egy érvényes email címet.';
        }


        // Jelszó ellenőrzés
        if (!formData.password) {
            newErrors.password = 'Kötelező kitölteni.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'A jelszónak legalább 6 karakter hosszúnak kell lennie.';
        }

        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'A két jelszónak egyeznie kell.';
        if (!formData.dataPrivacy) newErrors.dataPrivacy = 'Az adatvédelmi tájékoztató elfogadása kötelező.';
        return newErrors;
    };







    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {


            const phoneNumber = parsePhoneNumberFromString(formData.phone, 'HU');
            const formattedPhone = phoneNumber ? phoneNumber.formatInternational() : '';
            const email = formData.email.toLowerCase();

            const requestData = {
                Password: formData.password,
                BookingName: formData.bookingName,
                LastName: formData.lastName,
                FirstName: formData.firstName,
                EmailAddress: email,
                PhoneNumber: formattedPhone,
                PolicyAccept: formData.dataPrivacy
            };


            // emailben küldött aadatok
            const emailData = {
                emailAddress: email,
                lastName: formData.lastName,
                firstName: formData.firstName,
                date: "",
                room: "",
                startTime: "",
                endTime: ""
            };

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData),
                });

                if (response.ok) {
                    setRegistrationSuccess(true);
                    sendEmailAlerts(emailData, "registration_success", "Sikeres regisztráció");
                    setServerErrors({})
                    setErrors({});
                } else {
                    const errorData = await response.json();
                    console.log(errorData);
                    setServerErrors(errorData);
                    setRegistrationSuccess(false);

                }
            } catch (error) {
                setErrors({ login: 'Nem sikerült kapcsolatba lépni a szerverrel.' });
                setRegistrationSuccess(false);
            }


            setFormData({
                firstName: '',
                lastName: '',
                bookingName: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                dataPrivacy: false
            })
            setTimeout(() => {
                setIsRegisterModalVisible(false)
            }, 5000);

            setErrors({});
        }

    };

    return (
        <div className={`login-modal ${isVisible ? 'show' : ''}`}>
            <div className="login-modal-content">
                <p className="close" onClick={onClose}>
                    <IoMdClose />
                </p>

                <form onSubmit={handleSubmit}>
                    <h2>Regisztráció</h2>

                    <div className="input-group">
                        <label htmlFor="lastName">Vezetéknév:</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Írd be a vezetékneved"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                    <div className="input-group">
                        <label htmlFor="firstName">Keresztnév:</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Írd be a keresztneved"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                    <div className="input-group">
                        <label htmlFor="bookingName">Foglalási név:</label>
                        <input
                            id="bookingName"
                            type="text"
                            placeholder="Írd be a foglalási neved"
                            value={formData.bookingName}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.bookingName && <p className="error">{errors.bookingName}</p>}
                    <div className="input-group">
                        <label htmlFor="phone">Telefonszám:</label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="Írd be a telefonszámod"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.phone && <p className="error">{errors.phone}</p>}
                    <div className="input-group">
                        <label htmlFor="email">Email cím:</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Írd be az email címed"
                            value={formData.email}
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
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span onClick={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Jelszó megerősítése:</label>
                        <input
                            id="confirmPassword"
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            placeholder="Írd be a jelszavad újra"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <span onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                    <div className="input-group">
                        <input type="checkbox" id='dataPrivacy' checked={formData.dataPrivacy} onChange={handleChange} />
                        <label htmlFor="dataPrivacy">Elfogadom az adatvédelmi tájékoztatót.</label>
                        {errors.dataPrivacy && <p className="error">{errors.dataPrivacy}</p>}
                    </div>
                    {registrationSuccess && <p className="success">Sikeres regisztráció!</p>} {/* Sikeres üzenet */}
                    {serverErrors && <p className="error">{serverErrors.message}</p>}
                    <button className='btn' type="submit">Regisztrálás</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
