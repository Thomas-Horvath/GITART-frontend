import React from 'react';
import { img } from '../../assets/assets';

const About = () => {
    return (
        <section className="about">
            <div className="heading">
                <h2 className="section-title">Rólunk</h2>
                <h3> GitArt Próbaterem és stúdió!</h3>
                <p>Professzionális hangfelvételi szolgáltatások, modern eszközök és inspiráló környezet. </p>
                <p>Csatlakozz hozzánk, és hozd ki a legtöbbet a zenei tehetségedből!</p>
            </div>
            <div className="about-container w1400">
                <div className="about-left">
                    <h2>Miért válaszd a GitArt-ot?</h2>
                    <p>A GitArt több mint egy egyszerű stúdió – ez egy olyan hely, ahol a zenészek <strong>szabadon alkothatnak</strong> és kísérletezhetnek. Magasan felszerelt termeink lehetővé teszik, hogy <strong>bármilyen stílusban és formátumban</strong> rögzíts zenét, legyen szó akár szóló projektről, akár zenekari felvételről.</p>
                    <p>Stúdiónk <strong>egyedülálló környezetet</strong> biztosít, ahol a professzionális hangtechnika találkozik a kreativitással. Nemcsak próbálni, hanem <strong>alkotni</strong> is tökéletes helyszín, legyen szó hangfelvételről, keverésről vagy akár utómunkálatokról. <strong>Minden részletre figyelünk</strong>, hogy a lehető legjobb eredményt érhessük el.</p>
                    <p>Több évtizedes <strong>szakmai tapasztalatunk</strong> garantálja, hogy minden projekt magas színvonalon valósuljon meg. Művészekkel dolgozunk együtt, hogy hangzásuk a lehető <strong>legjobb legyen</strong>, és segítünk abban, hogy elérjék zenei céljaikat.</p>
                    <p>Tanfolyamaink és workshopjaink <strong>széleskörű ismereteket</strong> nyújtanak, hogy a zenészek ne csak stúdiónk falai között fejlődjenek, hanem a jövőbeni projektjeikben is sikeresen alkalmazhassák az itt tanultakat. Hiszünk abban, hogy a zene a folyamatos tanulásról és fejlődésről szól.</p>
                    <p>A GitArt stúdió <strong>Budapest egyik legjobban felszerelt</strong> helyszíne, ahol a zene és technológia találkozása valósul meg. Várjuk, hogy együtt dolgozhassunk veled, és megvalósíthassuk <strong>zenei álmaidat</strong>!</p>

                </div>
                <div className="about-right">
                    <img src={img.studio} alt="keverőpult" />
                </div>
            </div>
        </section>

    )
}

export default About