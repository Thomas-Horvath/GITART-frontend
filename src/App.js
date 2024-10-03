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
import OneRoom from './pages/OneRoom.jsx';
import Policy from './pages/Policy.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollTop />
        <Navbar />
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/stúdió' element={<Studio text="Studio" />} />
          <Route path='/termek' element={<Rooms  />} />
          <Route path='/termek/:id' element={<OneRoom />} />
          <Route path='/foglalás' element={<Booking />} />
          <Route path='/kapcsolat' element={<Contact text="Contact" />} />
          <Route path='/foglalásaim' element={<MyBooking />} />
          <Route path='/események' element={<Events text="események" />} />
          <Route path='/adatkezelés' element={<Policy />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
