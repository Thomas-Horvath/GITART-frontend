import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AlertModal from './AlertModal';
import { IoMdClose } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import LoginModal from '../Login/Login';

import RegisterModal from '../Login/Registration';
import InfoModal from '../Login/Info'; // Az InfoModal

const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState({}); 
  const [selectedHours, setSelectedHours] = useState([]); 
  const [bookingName, setBookingName] = useState(''); 
  const [name, setName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); 
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();



  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const rooms = ['Terem 1', 'Terem 2', 'Terem 3'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 10); // 10:00 - 22:00
  const token = sessionStorage.getItem('token'); // Token ellenőrzés
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // Kiindulásként a token létezésétől függően állítja be.



  const getFormattedDate = (date) => {
    return date.toISOString().split('T')[0]; // Csak a dátum rész, pl. 2024-09-28
  };



  useEffect(() => {
    const token = sessionStorage.getItem('token');
    setIsLoggedIn(!!token); // Frissíti a login állapotot, ha a token változik
  }, [token]);



  // Profiladatok lekérdezése és foglalások betöltése a komponens indulásakor
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileResponse = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
  
        if (!profileResponse.ok) {
          throw new Error('Nem sikerült lekérni a profil adatokat');
        }
  
        const profileData = await profileResponse.json();
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setAlertMessage('Hiba a profil betöltésekor!');
        setIsAlertVisible(true);
      }
    };
  
    const fetchBookings = async () => {
      try {
        const bookingsResponse = await fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (!bookingsResponse.ok) {
          throw new Error('Nem sikerült lekérni a foglalásokat');
        }
  
        const data = await bookingsResponse.json();
        const formattedBookings = {};
  
        data.forEach((booking) => {
          const bookingDate = new Date(booking.BookingDate).toISOString().split('T')[0];
          booking.Hours.forEach((hour) => {
            const bookingKey = `${bookingDate}-${booking.Room}-${hour}:00`;
            formattedBookings[bookingKey] = true;
          });
        });
  
        setBookings(formattedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setAlertMessage('Hiba a foglalások betöltésekor!');
        setIsAlertVisible(true);
      }
    };
  
    // Profil adatok lekérdezése, ha be vagyunk jelentkezve
    if (isLoggedIn) {
      fetchProfile();
    }
    // Foglalások lekérdezése függetlenül a bejelentkezéstől
    fetchBookings();
  }, [isLoggedIn, token]);
  






  useEffect(() => {
    // Profil adatainak betöltése
    if (profile) {
      setName(`${profile.FirstName || ''} ${profile.LastName || ''}`); // Alapértelmezett név beállítása
      setBookingName(profile.BookingName || ''); // Alapértelmezett booking név beállítása
    }
  }, [profile]);





  const handleCellClick = (room, hour) => {
    const formattedDate = getFormattedDate(currentDate);
    const bookingKey = `${formattedDate}-${room}-${hour}:00`;

    // Ellenőrizzük, hogy az adott időpont foglalt-e
    if (bookings[bookingKey]) {

      setAlertMessage('Ez az időpont már foglalt!');
      setIsAlertVisible(true); // Figyelmeztető modal megjelenítése
      return;
    }

    // Ellenőrizzük, hogy a kijelölt nap a mai nap előtt van-e
    const today = new Date(); // Mai nap másolása
    if (currentDate < today.setHours(0, 0, 0, 0)) {
      setAlertMessage('A mai nap előtti dátumokra nem lehet foglalást leadni.');
      setIsAlertVisible(true);
      return;
    }



    const bookingTime = { room, hour };

    if (selectedHours.length === 0) {
      setSelectedHours([bookingTime]);
    } else {
      const lastBooking = selectedHours[selectedHours.length - 1];
      const lastHour = lastBooking.hour;
      const selectedRoom = lastBooking.room;

      if (room === selectedRoom) {
        if (hour === lastHour + 1 || hour === lastHour - 1) {
          setSelectedHours([...selectedHours, bookingTime]);
        } else if (selectedHours.some(b => b.room === room && b.hour === hour)) {
          setSelectedHours(selectedHours.filter(b => b.room !== room || b.hour !== hour));
        } else {
          setAlertMessage('Csak egymást követő órákat lehet kijelölni megszakítás nélkül.');
          setIsAlertVisible(true); // Figyelmeztető modal megjelenítése
        }
      } else {
        setAlertMessage('Csak ugyanabban a teremben lehet foglalni.');
        setIsAlertVisible(true); // Figyelmeztető modal megjelenítése
      }
    }
  };
  



  const handleConfirmBooking = () => {

    if (!token) {
      setAlertMessage('Kérjük, jelentkezz be!');
      setIsAlertVisible(true); // Ha nincs token, jelenjen meg az AlertModal
      return;
    }

    if (selectedHours.length > 0) {
      setIsModalVisible(true);
      setName(`${profile.LastName || ''} ${profile.FirstName || ''} `);
      setBookingName(profile.BookingName || '');
    }
  };


  //* foglalás elküldése                                                                                                 


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (bookingName.trim() && name.trim()) {
      const formattedDate = getFormattedDate(currentDate);

      try {
        // Foglalás küldése
        const bookingData = {
          UserID: profile.UserID,
          BookingDate: formattedDate,
          Room: selectedHours[0].room, // Az első kijelölt terem
          Hours: selectedHours.map(h => h.hour), // Kijelölt órák
          Name: name,
          BookingName: bookingName,
        };



        const response = await fetch(`${process.env.REACT_APP_API_URL}/new-booking`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(bookingData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('Foglalás sikeres:', responseData);
          setSuccessMessage('Foglalás sikeresen létrejött!');

          // Frissítjük a foglalásokat
          selectedHours.forEach(bookingTime => {
            const bookingKey = `${formattedDate}-${bookingTime.room}-${bookingTime.hour}:00`;
            setBookings(prev => ({
              ...prev,
              [bookingKey]: true,
            }));
          });

          setTimeout(() => {
            setIsModalVisible(false);
            setSuccessMessage('');
          }, 1000);


          setSelectedHours([]);
        } else {
          const { message } = await response.json();
          setAlertMessage(message || 'Hiba történt a foglalás során.');
          setIsAlertVisible(true);
        }
      } catch (error) {
        console.error('Hiba történt:', error);
        setAlertMessage('Nem sikerült kapcsolatba lépni a szerverrel.');
        setIsAlertVisible(true);
      }
    }
  };


  const handleNextDay = () => {
    setCurrentDate(prevDate => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(prevDate.getDate() + 1);
      return nextDate;
    });
  };

  const handlePrevDay = () => {
    setCurrentDate(prevDate => {
      const prevDateCopy = new Date(prevDate);
      prevDateCopy.setDate(prevDate.getDate() - 1);
      return prevDateCopy;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date())
  };

  const getCurrentDateString = () => {
    return currentDate.toLocaleDateString('hu-HU', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };



  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
  };

  const handleRegisterClick = () => {
    setIsRegisterModalVisible(true);
  };

  const handleInfoClick = () => {
    setIsInfoModalVisible(true);
  };
  const navigatToMyBookings = () => {
    navigate('/foglalásaim')
  }


  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Token eltávolítása
    setIsLoggedIn(false); // Frissítjük az állapotot kijelentkezés után
  }

  return (
    <div className="weekly-calendar">
      <div className="login-links">

        {!isLoggedIn ? (
          <div className="link-container">
            <p className='login-btn' onClick={handleLoginClick}>Bejelentkezés</p>
            <p className='login-btn' onClick={handleRegisterClick}>Regisztráció</p>
          </div>
        ) : (
          <div className="link-container">
            <p className='login-btn' onClick={navigatToMyBookings}>Foglalásaim</p>
            <p className='login-btn' onClick={handleLogout} >Kijelentkezés</p>
          </div>
        )
        }



        <p className='login-btn' onClick={handleInfoClick}>
          <FaInfoCircle className='info-icon' />
        </p>
      </div>

      {/* Login Modal */}
      <LoginModal
        isVisible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
     
      />

      {/* Register Modal */}
      <RegisterModal
        isVisible={isRegisterModalVisible}
        onClose={() => setIsRegisterModalVisible(false)}
        setIsRegisterModalVisible={setIsRegisterModalVisible}
      />

      {/* Info Modal */}
      <InfoModal
        isVisible={isInfoModalVisible}
        onClose={() => setIsInfoModalVisible(false)}
      />




      <h2>Napi Foglalási Naptár</h2>
      <div className="header">
        <div className="button-group">
          <button className="btn" onClick={handlePrevDay}>&lt;</button>
          <button className="btn" onClick={handleToday}>Ma</button>
          <button className="btn" onClick={handleNextDay}> &gt;</button>
        </div>
        <span>{getCurrentDateString()}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th className='hour'>Órák</th>
            {rooms.map((room) => (
              <th key={room}>{room}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className='hour'>{hour}:00</td>
              {rooms.map((room) => {
                const formattedDate = getFormattedDate(currentDate);
                const bookingKey = `${formattedDate}-${room}-${hour}:00`;
                const isSelected = selectedHours.some(
                  (selected) => selected.room === room && selected.hour === hour
                );

                return (
                  <td
                    key={`${room}-${hour}`}
                    onClick={() => handleCellClick(room, hour)}
                    className={`cell ${bookings[bookingKey] ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                  >
                    {bookings[bookingKey] ? 'Foglalt' : 'Szabad'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn" onClick={handleConfirmBooking} disabled={selectedHours.length === 0}>
        Foglalás megerősítése
      </button>

      {/* Modal HTML form */}
      <div id="booking-modal" className={`modal ${isModalVisible ? 'show' : ''}`}>
        <div className="modal-content">
          <span className="close" onClick={() => setIsModalVisible(false)}>
            <IoMdClose />
          </span>
          <h2>Foglalás megerősítése</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor='name'>
              Foglaló neve:
            </label>
            <input
              name='name'
              id='name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor='bookingName'>
              Foglalási név:
            </label>
            <input
              name='bookingName'
              id='bookingName'
              type="text"
              value={bookingName}
              onChange={(e) => setBookingName(e.target.value)}
              required
            />
            <div className="message-container">
              {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
            <button className='btn' type="submit">Foglalás</button>
          </form>
        </div>
      </div>



      {/* Figyelmeztető modal */}
      <AlertModal
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => setIsAlertVisible(false)}
      />


    </div>
  );
};

export default WeeklyCalendar;
