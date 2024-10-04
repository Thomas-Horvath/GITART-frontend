import React from 'react';
import { eventImg } from '../assets/assets';

const Events = () => {
  const events2024 = [
    {
      date: '15',
      month: 'Okt.',
      title: 'Gitár Masterclass - László Ádám',
      subtitle: 'Haladó gitártechnikák és improvizáció',
      description: 'László Ádám bemutatja a legújabb gitártechnikákat, miközben az improvizáció fontosságát hangsúlyozza a különböző zenei stílusokban. A résztvevők gyakorlatban is kipróbálhatják az új technikákat, és közvetlen visszajelzést kapnak saját játékukról.',
      image: eventImg.event1,
    },
    {
      date: '5',
      month: 'Nov.',
      title: 'Billentyűsök világa - Kovács Éva',
      subtitle: 'Modern billentyűzési technikák',
      description: 'Kovács Éva egyedi technikákat mutat be, amelyekkel különféle zenei műfajokban kamatoztathatjuk a billentyűzési tudásunkat. A workshop résztvevői megismerhetik a hangszer kezelésének finomságait, és kipróbálhatják magukat különböző stílusokban.',
      image: eventImg.event2,
    },
    {
      date: '20',
      month: 'Nov.',
      title: 'Stúdiótechnikai Workshop - Kiss Péter',
      subtitle: 'Profi hangkeverés és stúdiótechnika',
      description: 'Kiss Péter bevezet a hangkeverés és a stúdiótechnika rejtelmeibe. A workshop során szó lesz a mikrofonozásról, a sávkezelésről, valamint a keverési technikákról, amelyek elengedhetetlenek a professzionális hangzás eléréséhez.',
      image: eventImg.event3,
    },
    {
      date: '10',
      month: 'Dec.',
      title: 'Dob Masterclass - Fekete Tamás',
      subtitle: 'Modern dobritmusok és technikák',
      description: 'Fekete Tamás megosztja a dobtechnikák legfrissebb irányzatait, miközben a résztvevők fejleszthetik ritmusérzéküket és tempótartásukat. A masterclass célja, hogy a résztvevők magabiztosabbá váljanak a dobolás különböző stílusaiban.',
      image: eventImg.event4,
    },
    {
      date: '22',
      month: 'Dec.',
      title: 'Hangzás és keverés - Szabó András',
      subtitle: 'A modern zenekészítés művészete',
      description: 'Szabó András a modern zenei produkciók legfontosabb elemeire, a hangzásra és a keverésre koncentrál. A résztvevők megtanulják, hogyan érjék el a kívánt hangzásvilágot különböző zenei műfajokban, és hogyan használják a legújabb szoftveres megoldásokat.',
      image: eventImg.event5,
    },
  ];

  const events2025 = [
    {
      date: '28',
      month: 'Jan.',
      title: 'Gitár Technika - Tóth Márk',
      subtitle: 'Gitártechnika fejlesztés minden stílusban',
      description: 'Tóth Márk részletesen bemutatja a különböző gitártechnikákat, beleértve a fingerpicking, legato, sweep picking és egyéb stílusokat. A workshop segít abban, hogy a gitárosok jobban megértsék hangszerüket, és magabiztosabbak legyenek bármely zenei műfajban.',
      image: eventImg.event6,
    },
    {
      date: '15',
      month: 'Feb.',
      title: 'Billentyűzési Módszerek - Nagy Eszter',
      subtitle: 'Kreatív billentyűzési technikák',
      description: 'Nagy Eszter segítségével a résztvevők megismerkedhetnek a modern és hagyományos billentyűzési technikák ötvözésével. A workshop során számos kreatív megoldást mutat be, amelyekkel a zenészek különféle műfajokban fejleszthetik játékukat.',
      image: eventImg.event7,
    },
  ];


  return (
    <div className="events">
      <div className="heading">
        <h2 className="section-title">Eseménynaptár</h2>
        <h3>GitArt Próbaterem és stúdió!</h3>
        <p>Fedezd fel 2024-es workshopjainkat és eseményeinket, ahol professzionális hangfelvételi szolgáltatások és modern eszközök állnak rendelkezésedre. Legyen szó zenei produkcióról vagy zeneszerzésről, nálunk minden zenei igényedet kielégíthetjük.</p>
        <p>Csatlakozz hozzánk különböző műhelymunkákra, ahol tapasztalt zenészek vezetésével tanulhatsz új technikákat. Tapasztald meg a közös zenélés örömét, és hozd ki a legtöbbet a zenei tehetségedből!</p>
      </div>

      <h2>2024-es eseményeink</h2>
      {events2024.map((event, index) => (
        <div className={`event-card ${index % 2 === 0 ? 'left' : 'right'}`} key={event.title}>
          <div className="event-image">
            <img src={event.image} alt={event.title} />
            <div className={`date-box ${index % 2 === 0 ? 'left' : 'right'}`}>
              <span className="date">{event.date}</span>
              <span className="month">{event.month}</span>
            </div>
          </div>
          <div className="event-card-content">
            <h3>{event.title}</h3>
            <h4>{event.subtitle}</h4>
            <p>{event.description}</p>
          </div>
        </div>
      ))}

      <h2>2025-ös eseményeink</h2>
      {events2025.map((event, index) => (
        <div className={`event-card ${index % 2 === 0 ? 'right' : 'left'}`} key={event.title}>
          <div className="event-image">
            <img src={event.image} alt={event.title} />
            <div className={`date-box ${index % 2 === 0 ? 'right' : 'left'}`}>
              <span className="date">{event.date}</span>
              <span className="month">{event.month}</span>
            </div>
          </div>
          <div className="event-card-content">
            <h3>{event.title}</h3>
            <h4>{event.subtitle}</h4>
            <p>{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Events;
