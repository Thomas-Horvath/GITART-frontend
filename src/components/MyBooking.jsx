import React, { useEffect, useState } from 'react';
import BackBtn from './BackBtn';
import AlertModal from '../components/BookingPage/AlertModal';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false); // Modal láthatóság állapota
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [modalMessage, setModalMessage] = useState(''); // Modal üzenet állapota
  const [isDeleting, setIsDeleting] = useState(false); // Törlés folyamatban
  const [isGreen, setIsGreen] = useState(false); 

  useEffect(() => {
    const fetchBookings = async () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        setError('Nincs bejelentkezve.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/own-bookings`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },

        });


        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.message === 'Nincs foglalás a megadott felhasználóhoz.') {
            setBookings([]);  // Nincs foglalás, állítsuk be az üres tömböt
          } else {
            throw new Error('Hiba a foglalások lekérdezésekor.');
          }
        } else {
          const data = await response.json();

          // Ellenőrizzük, hogy a data tömb típusú-e
          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            setError('A foglalások adatainak lekérdezésekor hiba történt.');
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);





  const deleteBooking = async (Id) => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      setError('Nincs bejelentkezve.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-booking/${Id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Hiba a foglalás törlése során.');
      } else {
        // A törlés sikeres, frissítsük a foglalások listáját
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== Id));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteClick = (Id) => {
    const bookingToDelete = bookings.find(booking => booking._id === Id);
    if (bookingToDelete) {
      const bookingDate = new Date(bookingToDelete.BookingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      today.setDate(today.getDate() + 1);

   

      if (bookingDate > today) {
        setSelectedBookingId(Id);
        setIsDeleting(false);
        setModalMessage('Biztosan törölni szeretnéd ezt a foglalást?');
        setModalVisible(true);
      } else {
        setModalMessage('Csak mai dátum utáni foglalásokat lehet törölni!');
        setModalVisible(true);
        setIsDeleting(true);
      }
    }

  };

  const handleModalConfirm = () => {
    if (selectedBookingId) {
      setIsDeleting(true);
      setModalMessage('A foglalást sikeresen töröltük!');
      setIsGreen(true)
      deleteBooking(selectedBookingId);

      setTimeout(() => {
        setModalVisible(false);
        setIsDeleting(false);
        setSelectedBookingId(null);
      }, 4000);

    }
  };



  if (loading) return <div className='loading'>Töltés...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container my-booking-page">
      <div className="my-bookings-content-wrapper">
        <h2>Saját Foglalásaim</h2>
        <div className="booking-table-wrapper">
          <table className="booking-table">
            <thead>
              <tr>
                <th>Foglalás Neve</th>
                <th>Terem</th>
                <th>Dátum</th>
                <th>Órák</th>
                <th>Törlés</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="5">Nincsenek foglalásaid.</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.Name} - ({booking.BookingName}  )</td>
                    <td>{booking.Room}</td>
                    <td>{new Date(booking.BookingDate).toLocaleDateString()}</td>
                    <td>{`${Math.min(...booking.Hours)} - ${Math.max(...booking.Hours) + 1} `}</td>
                    <td><button className='delete-btn' onClick={() => handleDeleteClick(booking._id)}>Foglalás Törlése</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <BackBtn />
      </div>



      {/* AlertModal komponens megjelenítése */}
      <AlertModal
        message={modalMessage} // Dinamikus üzenet átadása
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm} 
        confirmButtonDisabled={isDeleting} 
        isGreen={isGreen}
      />


    </div>
  );
};

export default MyBooking;
