import React from 'react';
import ServiceCard from './ServiceCard';
import { FiSliders } from 'react-icons/fi';
import { IoMdMicrophone } from "react-icons/io";
import { GiGuitarBassHead } from "react-icons/gi";


const services = () => {
    const services = [
        {
            title: 'Stúdió Felvétel',
            description: 'Professzionális felvétel, modern eszközökkel és tapasztalt hangmérnökökkel.',
            buttonText: 'Tudj meg többet',
            iconBgColor: '#d33c07',
            icon: <FiSliders size={40} color="#fff" />,
            path: '/stúdió'
        },
        {
            title: 'Próbaterem Bérlés',
            description: 'Teljesen felszerelt, hangszigetelt termek 1.800 Ft-tól. Foglalj most, és élvezd a tökéletes akusztikát!',
            buttonText: 'Foglalj most',
            iconBgColor: '#f37900',
            icon: <IoMdMicrophone size={50} color="#fff" />,
            path: '/foglalás'
        },
        {
            title: 'Gitár Workshopok',
            description: 'Képzeld el magad egy profi gitárosként! Workshopok minden szinten, a kezdőtől a haladóig.',
            buttonText: 'Csatlakozz',
            iconBgColor: '#c4ba00',
            icon: <GiGuitarBassHead size={55} color="#fff" />,
            path:'/események'
        }
    ];
    return (
        <section className="services">
            <div className="heading">
                <h2 className="section-title">SZOLGÁLTÁSAINK</h2>
                <h3>Stúdióminőségű próbaterem Budapesten, kiváló eszközökkel!</h3>
                <p>Hangfelvétel, szinkron, hangoskönyv készítés és keverés kedvező árakon. </p>
                <p>Fedezd fel zenei lehetőségeidet nálunk!</p>
            </div>

            <div className="card-container">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        title={service.title}
                        description={service.description}
                        buttonText={service.buttonText}
                        iconBgColor={service.iconBgColor}
                        icon={service.icon}
                        path={service.path}
                    />
                ))}
            </div>
        </section>
    )
}

export default services