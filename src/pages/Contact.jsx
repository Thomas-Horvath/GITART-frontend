import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [formStatus, setFormStatus] = useState('');
    const [errors, setErrors] = useState({}); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Hibaüzenetek törlése, amikor a felhasználó gépel
        setErrors({
            ...errors,
            [name]: '', // Törlés az adott mezőhöz
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Kötelező kitölteni.';
        }
        if (!formData.email) {
            newErrors.email = 'Kötelező kitölteni.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Érvénytelen e-mail cím.';
        }
        if (!formData.message) {
            newErrors.message = 'Kötelező kitölteni.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Visszaadja, hogy nincs hiba
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {


            // itt lehet az api hívás

            
            setFormStatus('Az üzenet sikeresen elküldve!');
            setTimeout(() => {
                setFormStatus('');
            }, 5000)
            setFormData({ name: '', email: '', message: '' });
            setErrors({}); // Hibák törlése sikeres küldés után
        }
    };

    return (
        <div className="contact-page">
            <div className="heading">
                <h2 className="section-title">Kapcsolat</h2>
                <h3> GitArt Próbaterem és stúdió!</h3>
                <p>Kérdésed van? Írj nekünk, vagy vedd fel velünk a kapcsolatot az alábbi elérhetőségek egyikén!</p>
            </div>

            <div className="contact-container">
                <div className="contact-info">
                    <h3>Elérhetőségek</h3>
                    <p><strong>Telefon:</strong> +36 20 555 4567</p>
                    <p><strong>E-mail:</strong> info@gitart.hu</p>
                    <p><strong>Cím:</strong> Budapest XIII Zene utca 34.</p>
                    <p><strong>Nyitvatartás:</strong> Hétfőtől Vasárnapig, 10:00 - 22:00</p>

                    <div className="social-media">
                        <h3>Kövess minket!</h3>
                        <p>
                            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <FaFacebook size={50} />
                            </Link>
                            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <FaInstagram size={52} />
                            </Link>
                            <Link to="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                <FaYoutube size={58} />
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="contact-form">
                    <h3>Lépj velünk kapcsolatba!</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Név:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Add meg a neved"
                            />
                            {errors.name ? <p className="error">{errors.name}</p>  : <p className='error'></p>} {/* Hibaüzenet */}
                        </label>

                        <label>
                            E-mail:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Add meg az e-mail címed"
                            />
                            {errors.email ? <p className="error">{errors.email}</p>  : <p className='error'></p>} {/* Hibaüzenet */}
                        </label>

                        <label>
                            Üzenet:
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Írd le kérdésed vagy üzeneted"
                            />
                            {errors.message ? <p className="error">{errors.message}</p> : <p className='error'></p>} {/* Hibaüzenet */}
                        </label>

                        <button type="submit">Küldés</button>
                    </form>
                    {formStatus ? <p className="success">{formStatus}</p>  : <p className='error'></p>}
                </div>

                <div className="map">
                    <h3>Itt találsz minket:</h3>
                    <iframe
                        title="Proba Terem Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10770.197879349678!2d19.0534127!3d47.5025004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc582c37b91b%3A0x32d7e7b50a09d632!2sBudapest!5e0!3m2!1shu!2shu!4v1616390252823!5m2!1shu!2shu"
                        width="600"
                        height="450"
                        allowFullScreen=""
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
}
