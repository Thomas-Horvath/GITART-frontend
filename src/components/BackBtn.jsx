import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackBtn = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <button className='btn' onClick={handleBack}>Vissza</button>
        </>
    )
}

export default BackBtn