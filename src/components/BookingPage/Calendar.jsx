import React, { useState } from 'react';


const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  
  const days = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 10); // 10:00 - 22:00

  const handleBook = (day, hour) => {
    const confirmation = window.confirm(`Foglalni szeretnél ${day} ${hour}:00 órakor?`);
    if (confirmation) {
      const bookingTime = `${day} ${hour}:00`;
      setBookings((prev) => [...prev, bookingTime]);
    }
  };

  const handleNextWeek = () => {
    setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 7)));
  };

  const handlePrevWeek = () => {
    setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 7)));
  };

  const getCurrentMonthAndDay = () => {
    return currentDate.toLocaleString('hu-HU', { month: 'long', day: 'numeric' });
  };

  return (
    <div className="weekly-calendar">
      <h2>Heti Foglalási Naptár</h2>
      <div className="header">
        <button onClick={handlePrevWeek}>&lt; Előző hét</button>
        <span>{getCurrentMonthAndDay()}</span>
        <button onClick={handleNextWeek}>Következő hét &gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Órák</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour}:00</td>
              {days.map((day, index) => {
                // A hét napjait a megfelelő dátummal szinkronizálni kell
                const date = new Date(currentDate);
                date.setDate(date.getDate() + index - date.getDay() + 1); // Hétfő kezdete
                const bookingTime = `${day} ${hour}:00`;
                
                return (
                  <td 
                    key={`${day}-${hour}`} 
                    onClick={() => handleBook(day, hour)} 
                    className={bookings.includes(bookingTime) ? 'booked' : ''}
                  >
                    {bookings.includes(bookingTime) ? 'Foglalt' : 'Szabad'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
