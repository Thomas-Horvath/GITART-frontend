// Rooms.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Rooms/RoomCard'; // Győződj meg róla, hogy a megfelelő útvonalat adtad meg
import { img } from '../assets//assets';


const roomImages = [
     img.room1,
     img.room2,
     img.room3,
];

export default function Rooms() {
    const [room, setRoom] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/rooms`);
                if (!response.ok) {
                    throw new Error('Hiba történt a terem adatainak betöltésekor.');
                }
                const data = await response.json();
                setRoom(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchRoomData();
    }, [room.id]);

    if (error) {
        return <div>Hiba: {error}</div>;
    }

    if (!room) {
        return <div>Betöltés...</div>;
    }

    return (
        <>
            <div className="rooms">
                <div className="heading">
                    <h2 className="section-title">Termeink</h2>
                    <h3>GitArt Próbaterem és Stúdió – A Zene Otthona!</h3>
                    <p>A GitArt Próbaterem és Stúdió három modern próbatermet kínál, amelyek kényelmes környezetet biztosítanak a zenészeknek.</p>
                    <p>20 m²-től 40 m²-ig terjedő termeink ideálisak egyéni próbákhoz és zenekari összejövetelekhez. Csatlakozz hozzánk, és fejleszd zenei tudásodat!</p>

                </div>



                <div className="card-container w1400">
                    {room.map((r) => (
                        <Card
                            key={r.id}
                            id={r.id}
                            title={r.name}
                            description={r.description}
                            price={r.price_per_hour}
                            image={roomImages[r.id - 1]}
                        />
                    ))}
                </div>
                <Link  to="/foglalás" className="btn contact-link">
                    Foglalj most!
                </Link>
            </div>
        </>
    );
}
