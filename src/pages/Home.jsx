import React from 'react';
import Services from '../components/HomePageSections/Services.jsx';
import Prices from '../components/HomePageSections/Prices.jsx';
import About from '../components/HomePageSections/About.jsx';
import References from '../components/HomePageSections/References.jsx';
import Sales from '../components/HomePageSections/Sales.jsx';


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
                    </div>
                </section>
                <About />
                <Prices />
      
                <Sales />
            </div>
        </>

    )
}
