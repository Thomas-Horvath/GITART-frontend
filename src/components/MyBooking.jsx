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
          throw new Error('Hiba a foglalások lekérdezésekor.');
        }

        const data = await response.json();
        setBookings(data);
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
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.Name} - ({booking.BookingName})</td>
                            <td>{booking.Room}</td>
                            <td>{new Date(booking.BookingDate).toLocaleDateString()}</td>
                            <td>{booking.Hours.join(' - ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BackBtn />
        </div>

    </div>
  );
};

export default MyBooking;
