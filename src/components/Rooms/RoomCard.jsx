// Card.js
import React from 'react';
import { Link } from 'react-router-dom'


const Card = ({ title, description, price, id, image }) => {
    return (
        <div className="room-card">
            <img src={image} alt="terem" />
            <div className="card-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>Ár: {price} Ft/óra</p>
            </div>
            <Link className='card-btn' to={`/termek/${id}`}>Terem felszereltsége</Link>
        </div>
    );
};

export default Card;
