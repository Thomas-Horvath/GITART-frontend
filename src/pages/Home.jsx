import React from 'react';
import Services from '../components/HomePageSections/Services.jsx';


export default function Home(props) {
    return (
        <>
            <div className="home-page-container">
                <section className="banner">
                    <h1 className='name'>GitArt</h1>
                    <h2 className='main-title'>Próbaterem és Stúdió</h2>
                   
                </section>
                <section className='page-background'>
                    <div className="home-content w1400">
                    <Services />

                        <h2>HASZNÁLD KI AKCIÓS LEHETŐSÉGEINKET</h2>
                        <p>Próbatermek már 1.800 Ft-tól</p>
                    </div>
                </section>
            </div>
        </>

    )
}
