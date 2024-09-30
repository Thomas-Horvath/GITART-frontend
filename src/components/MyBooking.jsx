import React, { useEffect, useState } from 'react';
import BackBtn from './BackBtn';

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="page-container">
      <div className="my-bookings-content-wrapper w1400">
        <h2>Saját Foglalásaim</h2>
        <table className="booking-table">
          <thead>
            <tr>
              <th>Foglalás Neve</th>
              <th>Terem</th>
              <th>Dátum</th>
              <th>Órák</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="4">Nincsenek foglalásaid.</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.Name} - ({booking.BookingName})</td>
                  <td>{booking.Room}</td>
                  <td>{new Date(booking.BookingDate).toLocaleDateString()}</td>
                  <td>{booking.Hours.join(' - ')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <BackBtn />
      </div>

    </div>
  );
};

export default MyBooking;
