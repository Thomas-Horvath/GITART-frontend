import React from 'react';
import { Link } from 'react-router-dom'
import { FaDollarSign } from 'react-icons/fa'; // Importáljuk a dollár jelet az ikonok közül

const Sales = () => {
  return (
    <section className="sales">
      <div className="heading">
        <h2 className="section-title">HASZNÁLD KI AKCIÓS LEHETŐSÉGEINKET</h2>
        <h3>Próbatermek már <span>1500</span> Ft-tól</h3>
        <p>Ne hagyd ki a lehetőséget, hogy kedvezményes áron próbálhass!</p>
        <p>Foglalj még ma, és élvezd a zene világát féláron!</p>
      </div>
      <div className="sales-container w1400">
        <div className="sales-left">
          <h3><FaDollarSign /> Kiemelt Akció</h3>
          <p>Fedezd fel az izgalmas akcióinkat, amelyek lehetővé teszik, hogy a legjobb áron bérelj próbatermet!</p>
          <p>Aznapi foglalás esetén, vagy ha csak úgy beesel hozzánk és van üres hely, a próbatermek bérlése most féláron lehetséges! Ez azt jelenti, hogy minden terem <strong>50% kedvezménnyel </strong>bérelhető, így igazán megfizethető áron érheted el zenei céljaidat.</p>
          <p>Ne hagyd ki ezt a kivételes lehetőséget, és élvezd a zenélés örömét prémium környezetben, anélkül, hogy a költségeid miatt kellene aggódnod!</p>
        </div>
        <div className="sales-right">
          <h3><FaDollarSign /> Egyéni Gyakorlási Lehetőség</h3>
          <p>Számunkra fontos, hogy támogassuk zenei fejlődésedet, ezért egyéni gyakorlási lehetőséget is kínálunk a legjobb áron!</p>
          <p>Mostantól csak <strong>2000 Ft/óra</strong> áron bérelheted a próbatermeket, így lehetőséged van arra, hogy a saját tempódban és a saját stílusodban gyakorolj.</p>
          <p>Ez a kedvezményes ár lehetővé teszi, hogy maximálisan kihasználhasd a próbaterem adta lehetőségeket, és hozzájárulhass a zenei fejlődésedhez. Ne hagyd ki ezt a remek alkalmat, hogy még jobb zenésszé válj!</p>
        </div>
      </div>
      <div className="sales-btn-group">
        <Link className="btn" to="/foglalás">Foglalj termet</Link>
        <Link className="btn" to="/kapcsolat">Keress minket</Link>

      </div>
    </section>
  );
};

export default Sales;
