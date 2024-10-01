import React from 'react';
import { Link} from 'react-router-dom'
import { img } from '../../assets/assets';

const Prices = () => {
  return (
    <section className="price">
      <div className="heading">
        <h2 className="section-title">Áraink</h2>
        <h3>2024-es aktuális áraink!</h3>
        <p>Kiemelkedő szolgáltatások, modern eszközök és inspiráló környezet, mindezt megfizethető áron.</p>
        <p>Foglalj nálunk, és hozd ki a legtöbbet a zenéd lehetőségeiből!</p>
      </div>
      <div className="price-container w1400">
        <div className="price-left">
          <h2>Termeink:</h2>
          <ul>
            <li><strong>1-es terem:</strong> Ideális kisebb próbákra, 20 m²-es térrel és <strong>3000 Ft/óra</strong> áron érhető el.</li>
            <li><strong>2-es terem:</strong> Tágasabb lehetőségek zenekarok számára, 30 m²-es tér és <strong>4000 Ft/óra</strong> díj mellett.</li>
            <li><strong>3-as terem:</strong> A legnagyobb próbatermünk, 40 m²-en, ahol teljes felszerelés vár rád. Ára <strong>5000 Ft/óra</strong>.</li>
          </ul>
          <Link to="/termek" className="btn conatct-btn">Nézd meg a termeket</Link>


          <h2>Stúdió:</h2>
          <ul>
            <li><strong>Stúdió:</strong> Professzionális felvételek készítése <strong>7000 Ft/óra</strong> áron, ahol minden hangot tökéletesre csiszolhatsz.</li>
          </ul>
          <Link to="/kapcsolat" className="btn conatct-btn">Egyedi ajánlatokért lépj velünk kapcsolatba!</Link>
        </div>
        <div className="price-right">
          <img src={img.price} alt="Árak" />
        </div>
      </div>
    </section>
  )
}

export default Prices