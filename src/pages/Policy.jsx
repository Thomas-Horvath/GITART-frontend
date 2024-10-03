import React from 'react';

export default function Legal() {
    return (
        <div className="legal-page w1400">
            <div className="heading">
                <h2 className="section-title">Jogi nyilatkozat</h2>
                <p>Itt találhatók a legfontosabb jogi információk.</p>
            </div>

            <div className="section" id="impresszum">
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

            <div className="section" id="adatkezeles">
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

            <div className="section" id="cookie">
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

            <div className="footer">
                <p>
                    Ha bármilyen kérdése van a fenti információkkal kapcsolatban, kérjük, lépjen velünk kapcsolatba az
                    info@proba-terem.hu címen.
                </p>
            </div>
        </div>
    );
}
