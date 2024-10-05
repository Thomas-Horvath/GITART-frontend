import React, { useEffect, useState } from 'react';


const Cookie = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Ellenőrizzük, hogy a cookie-kat elfogadták-e vagy tagadták
    const hasAcceptedCookies = sessionStorage.getItem('cookiesAccepted');
    const hasDeniedCookies = sessionStorage.getItem('cookiesDenied');

    if (!hasAcceptedCookies || hasDeniedCookies) {

      const timer = setTimeout(() => {
        setShow(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (hasAcceptedCookies) {
      setShow(false);
    } else {
      const timer = setTimeout(() => {
        setShow(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptCookies = () => {
    sessionStorage.setItem('cookiesAccepted', 'true');
    sessionStorage.removeItem('cookiesDenied');
    setShow(false);
  };

  const handleDenyCookies = () => {
    sessionStorage.setItem('cookiesDenied', 'true');
    sessionStorage.removeItem('cookiesAccepted');
    setShow(false);
  };

  return (
    show && (
      <div className="cookie-notification">
        <p>
          Az oldal cookie-kat használ a felhasználói élmény javítása érdekében. Kérjük, fogadja el a cookie-k használatát.
        </p>
        <div className="cookie-btn-container">
          <button className='btn cookie-btn' onClick={handleDenyCookies}>Elutasít</button>
          <button className='btn cookie-btn' onClick={handleAcceptCookies}>Elfogad</button>
        </div>
      </div>
    )
  );
};

export default Cookie;
