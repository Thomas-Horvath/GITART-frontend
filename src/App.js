import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home';
import Studio from './pages/Studio.jsx';
import Rooms from './pages/Rooms.jsx';
import Booking from './pages/Booking.jsx';

import Contact from './pages/Contact';
import ScrollTop from './components/ScrollToTop.jsx';
import MyBooking from './components/MyBooking.jsx';
import Events from './pages/Events.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollTop />
        <Navbar />
        <Routes> 
          <Route path='/' element={<Home text="Home" />} />
          <Route path='/stúdió' element={<Studio text="Studio" />} />
          <Route path='/termek' element={<Rooms text="Rooms" />} />
          <Route path='/foglalás' element={<Booking text="Booking" />} />
          <Route path='/kapcsolat' element={<Contact text="Contact" />} />
          <Route path='/foglalásaim' element={<MyBooking text="foglalásaim" />} />
          <Route path='/események' element={<Events text="események" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
