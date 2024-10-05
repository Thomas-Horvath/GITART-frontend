import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { room1, room2, room3 } from '../assets/assets';
import BackBtn from '../components/BackBtn';
import { GoZoomIn } from "react-icons/go";
import Modal from '../components/Rooms/ImgModal';

const OneRoom = () => {
  const { id } = useParams(); 
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms`);
        if (!response.ok) {
          throw new Error('Hiba történt a terem adatainak betöltésekor.');
        }
        const data = await response.json();
        setRooms(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRoomData();
  }, []);


  // Szűrés az összes terem adatai közül a megfelelő ID-jú teremre
  const room = rooms.find((r) => r.id === parseInt(id));


  let imgSrc;
  let gallery;

  if (id === '1') {
    imgSrc = room1.room1_1;
    gallery = [room1.room1_1, room1.room1_2, room1.room1_3, room1.room1_4, room1.room1_5, room1.room1_6]
  } else if (id === '2') {
    imgSrc = room2.room2_1;
    gallery = [room2.room2_1, room2.room2_2, room2.room2_3, room2.room2_4, room2.room2_5, room2.room2_6]
  } else {
    imgSrc = room3.room3_1;
    gallery = [room3.room3_1, room3.room3_2, room3.room3_3, room3.room3_4, room3.room3_5, room3.room3_6]
  }



  if (error) {
    return <div>Hiba: {error}</div>;
  }

  if (!room) {
    return <div>Betöltés...</div>;
  }




  const openModal = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };


  return (
    <div className="one-room">

      <div className="one-room-banner">
        <img src={imgSrc} alt="próbaterem bemutatása, fejléc" />
        <div className="text-content">

          <h2>{room.name}</h2>
          <p><strong>Óradíj:</strong> {room.price_per_hour} Ft</p>
        </div>
      </div>
      <div className="one-room-wrapper">


        <div className="one-room-container">




          <p><strong>Leírás:</strong> {room.description}</p>
          <p><strong>Méret:</strong> {room.size}</p>

          <h3>Felszerelés</h3>

          {/* Mikrofonok */}
          {room.equipment?.microphones && (
            <div>
              <h4>Mikrofonok</h4>
              <p><strong>Márka:</strong> {room.equipment.microphones.brand}</p>
              <p><strong>Modellek:</strong> {room.equipment.microphones.models.join(', ')}</p>
              <p>{room.equipment.microphones.description}</p>
            </div>
          )}

          {/* Dobok */}
          {room.equipment?.drums && (
            <div>
              <h4>Dobok</h4>
              <p><strong>Cintányérok</strong></p>
              <p><strong>Márka:</strong> {room.equipment.drums.cymbals.brand}</p>
              <p><strong>Modellek:</strong> {room.equipment.drums.cymbals.models.join(', ')}</p>
              <p>{room.equipment.drums.cymbals.description}</p>
              <p><strong>Pergő:</strong> {room.equipment.drums.snare.brand} {room.equipment.drums.snare.model}, {room.equipment.drums.snare.size}</p>
              <p>{room.equipment.drums.snare.description}</p>
              <p><strong>Basszusdob:</strong> {room.equipment.drums.bass_drum.brand} {room.equipment.drums.bass_drum.model}, {room.equipment.drums.bass_drum.size}</p>
              <p>{room.equipment.drums.bass_drum.description}</p>
            </div>
          )}

          {/* Gitárerősítő */}
          {room.equipment?.guitar_amp && (
            <div>
              <h4>Gitárerősítő</h4>
              <p><strong>Márka:</strong> {room.equipment.guitar_amp.brand}</p>
              <p><strong>Modell:</strong> {room.equipment.guitar_amp.model}</p>
              <p><strong>Teljesítmény:</strong> {room.equipment.guitar_amp.power}</p>
              <p>{room.equipment.guitar_amp.description}</p>
            </div>
          )}

          {/* Basszusgitár erősítő */}
          {room.equipment?.bass_amp && (
            <div>
              <h4>Basszusgitár erősítő</h4>
              <p><strong>Márka:</strong> {room.equipment.bass_amp.brand}</p>
              <p><strong>Modell:</strong> {room.equipment.bass_amp.model}</p>
              <p><strong>Teljesítmény:</strong> {room.equipment.bass_amp.power}</p>
              <p>{room.equipment.bass_amp.description}</p>
            </div>
          )}

          {/* PA rendszer */}
          {room.equipment?.pa_system && (
            <div>
              <h4>PA rendszer</h4>
              <p><strong>Márka:</strong> {room.equipment.pa_system.brand}</p>
              <p><strong>Modell:</strong> {room.equipment.pa_system.model}</p>
              <p><strong>Teljesítmény:</strong> {room.equipment.pa_system.power}</p>
              <p>{room.equipment.pa_system.description}</p>
            </div>
          )}
        </div>
      </div>



      <div className="gallery">
        <h2>A terem képekben:</h2>
        <div className="gallery-containre">
          {gallery.map((image, index) => (
            <div className="img-wrapper" key={index} onClick={() => openModal(image)}>
              <img src={image} alt={`próbaterem berendezései ${index + 1}`} />
              <GoZoomIn className='zoom-icon' />
            </div>
          ))}
        </div>
      </div>


      {/* Modal megjelenítése, ha nyitva van */}
      {isModalOpen && <Modal imgSrc={selectedImage} onClose={closeModal} isOpen={isModalOpen} />}

      <div className="back-btn">

        <BackBtn />
      </div>
    </div>
  );
}

export default OneRoom;
