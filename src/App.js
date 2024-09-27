import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms.jsx';
import Booking from './pages/Booking.jsx';
import Signin from './pages/Signin.jsx';
import Contact from './pages/Contact';
import ScrollTop from './components/ScrollToTop.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <ScrollTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home text="Home" />} />
          <Route path='/about' element={<About text="About" />} />
          <Route path='/rooms' element={<Rooms text="Rooms" />} />
          <Route path='/booking' element={<Booking text="Booking" />} />
          <Route path='/signin' element={<Signin text="Sign in" />} />
          <Route path='/contact' element={<Contact text="Contact" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
