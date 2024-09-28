import React, { useState } from 'react';



const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState({});
  const [selectedHours, setSelectedHours] = useState([]); // Kijelölt órák tárolása
  const [bookingName, setBookingName] = useState(''); // Foglaló neve



  const rooms = ['Terem 1', 'Terem 2', 'Terem 3'];
  const hours = Array.from({ length: 13 }, (_, i) => i + 10); // 10:00 - 22:00



  // console.log(rooms, hours);
  // Óra kiválasztás logikája

  const handleCellClick = (room, hour) => {
    const bookingTime = { room, hour }; // Objektum formátumú foglalás

    if (selectedHours.length === 0) {
      // Első kiválasztott óra
      setSelectedHours([bookingTime]);

    } else {
      const lastBooking = selectedHours[selectedHours.length - 1];
      const lastHour = lastBooking.hour; // Utolsó kiválasztott óra
      const selectedRoom = lastBooking.room; // Utolsó kiválasztott terem

      // Ellenőrizzük, hogy a terem neve egyezik-e
      if (room === selectedRoom) {
        // Ha a következő kattintott óra közvetlenül az előző után van
        if (hour === lastHour + 1) {
          setSelectedHours([...selectedHours, bookingTime]);
        } else if (selectedHours.some(b => b.room === room && b.hour === hour)) {
          // Ha ugyanarra az órára kattintanak, töröljük a kijelölést
          setSelectedHours(selectedHours.filter(b => b.room !== room || b.hour !== hour));
        } else {
          alert('Csak egymást követő órákat lehet kijelölni megszakítás nélkül.');
        }
      } else {
        alert('Csak ugyanabban a teremben lehet foglalni.');
      }
    }
  };


  const handleConfirmBooking = () => {
    if (selectedHours.length > 0) {
      document.getElementById('booking-modal').style.display = 'block';
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (bookingName.trim()) {
      selectedHours.forEach(bookingTime => {
        const bookingKey = `${bookingTime.room} ${bookingTime.hour}:00`; // Kulcs string formátumban
        setBookings((prev) => ({
          ...prev,
          [bookingKey]: true, // Foglalás státusz beállítása
        }));
      });
  
      alert('Foglalás sikeresen létrejött!');
      document.getElementById('booking-modal').style.display = 'none';
      setBookingName('');
      setSelectedHours([]); // Kijelölések törlése a foglalás után
    }
  };
  
  

  const handleNextDay = () => {
    setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 1)));
  };

  const handlePrevDay = () => {
    setCurrentDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)));
  };

  const getCurrentDateString = () => {
    return currentDate.toLocaleDateString('hu-HU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };




  return (
    <div className="weekly-calendar">
      <h2>Heti Foglalási Naptár</h2>
      <div className="header">
        <button onClick={handlePrevDay}>&lt; Előző nap</button>
        <span>{getCurrentDateString()}</span>
        <button onClick={handleNextDay}>Következő nap &gt;</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Órák</th>
            {rooms.map((room) => (
              <th key={room}>{room}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour}:00</td>



              {rooms.map((room) => {
                const isSelected = selectedHours.some(
                  (selected) => selected.room === room && selected.hour === hour
                );
                const bookingTime = `${room} ${hour}:00`;

                return (
                  <td
                    key={`${room}-${hour}`}
                    onClick={() => handleCellClick(room, hour)}
                    className={`${bookings[bookingTime] ? 'booked' : ''} ${isSelected ? 'selected' : ''
                      }`}
                  >
                    {bookings[bookingTime] ? 'Foglalt' : 'Szabad'}
                  </td>
                );
              })}

            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleConfirmBooking} disabled={selectedHours.length === 0}>Foglalás megerősítése</button>

      {/* Modal HTML form */}
      <div id="booking-modal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => document.getElementById('booking-modal').style.display = 'none'}>&times;</span>
          <h2>Foglalás megerősítése</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Foglaló neve:
              <input type="text" value={bookingName} onChange={(e) => setBookingName(e.target.value)} required />
            </label>
            <button type="submit">Foglalás</button>
          </form>
        </div>
      </div>

      
    </div>
  );
};

export default WeeklyCalendar;
