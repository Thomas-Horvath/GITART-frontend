import React from 'react';
import { Link } from 'react-router-dom';



const ServiceCard = ({ title, description, buttonText, icon, iconBgColor, path }) => {
  return (
    <div className="card">
      <div className="icon-wrapper">
        <div className="icon-circle" style={{ backgroundColor: iconBgColor }}>
          {icon}
        </div>
      </div>
      <div className="text-wrapper">
        <h3 className='card-title'>{title}</h3>
        <p className='card-description'>{description}</p>
        <Link to={path} className='btn'>{buttonText}</Link>
      </div>
    </div>
  );
};

export default ServiceCard