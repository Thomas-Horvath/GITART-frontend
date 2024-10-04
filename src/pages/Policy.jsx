import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BackBtn from '../components/BackBtn';







export default function Legal() {
    const { category } = useParams();

    let content;

    if (category === "impresszum") {
        content = <div className="policy-section" id="impresszum">
            <h3>Impresszum</h3>
            <p>
                <strong>Szolgáltató neve:</strong> GitArt Próbaterem és Stúdió Kft.<br />
                <strong>Cím:</strong> 1065 Budapest, Nagymező utca 3.<br />
                <strong>Telefon:</strong> +36 30 123 4567<br />
                <strong>E-mail:</strong> info@proba-terem.hu<br />
                <strong>Cégjegyzékszám:</strong> 01-12345678<br />
                <strong>Adószám:</strong> 12345678-1-42
            </p>
        </div>

    } else if (category === "adatvédelem") {
        content = <div className="policy-section" id="adatkezelés">
            <h3>Adatkezelés</h3>
            <p>
                Az általunk gyűjtött személyes adatok biztonságát komolyan vesszük. Az adatok kezelésére vonatkozó információkat
                az adatvédelmi szabályzatunkban találhatja.
            </p>
            <p>
                A személyes adatokat kizárólag a megadott célokra használjuk, és harmadik fél számára nem adjuk át azokat
                az Ön kifejezett hozzájárulása nélkül.
            </p>
        </div>
    } else {
        content = <div className="policy-section" id="cookie">
            <h3>Cookie kezelés</h3>
            <p>
                A weboldalunk sütiket (cookie-kat) használ a felhasználói élmény javítása érdekében. A sütik olyan kis
                fájlok, amelyeket a böngésző tárol a számítógépén, hogy segítsenek megjegyezni az Ön preferenciáit
                és beállításait.
            </p>
            <p>
                Ön bármikor módosíthatja a böngészője beállításait, hogy blokkolja a sütik használatát, azonban ez
                befolyásolhatja a weboldalunk működését.
            </p>
        </div>
    }


    return (
        <div className="legal-page w1400">
            <div className="heading">
                <h2 className="section-title">Jogi nyilatkozat</h2>
                <p>Itt találhatók a legfontosabb jogi információk.</p>
            </div>


            {content}

            <div className="policy-footer">
                <p>
                    Ha bármilyen kérdése van a fenti információkkal kapcsolatban, kérjük, lépjen velünk kapcsolatba az
                    info@gitart.hu címen.
                </p>
            </div>

            <div className="btn-group">
                <BackBtn />
                <Link className='btn' to="/kapcsolat">Írj üzenet</Link>
            </div>
        </div>
    );
}
