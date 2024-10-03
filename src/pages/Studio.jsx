import React, { useState, useEffect } from 'react';
import BackBtn from '../components/BackBtn'; // Vissza gomb komponens
import Modal from '../components/Rooms/ImgModal'; // Képgaléria modal komponens
import { GoZoomIn } from "react-icons/go"; // Nagyítás ikon
import { studioImg } from '../assets/assets'; // A stúdió kép importálása
import { img } from '../assets/assets'; // A stúdió kép importálása

const Studio = () => {
  const [studio, setStudio] = useState(null); // A stúdió adatai
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal állapot
  const [selectedImage, setSelectedImage] = useState(''); // Kiválasztott kép

  // Fetch kérés a stúdió adataihoz
  useEffect(() => {
    const fetchStudioData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/studio`);
        if (!response.ok) {
          throw new Error('Hiba történt a stúdió adatainak betöltésekor.');
        }
        const data = await response.json();
        setStudio(data[0]); // A stúdió adatainak eltárolása
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStudioData();
  }, []);

  // Modal megnyitása
  const openModal = (img) => {
    setSelectedImage(img);
    setIsModalOpen(true);
  };

  // Modal bezárása
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  if (error) {
    return <div>Hiba: {error}</div>;
  }

  if (!studio) {
    return <div>Betöltés...</div>;
  }

  return (
    <div className="studio">

      <div className="studio-banner">
        <img src={img.studio_banner} alt="GitArt Stúdió" />
        <div className="text-content">
          <h2>{studio.name}</h2>
          <p><strong>Óradíj:</strong> {studio.price_per_hour} Ft -tól</p>
        </div>
      </div>




      <div className="studio-wrapper">

        <div className="heading">
          <h2 className="section-title">A Stúdióról</h2>
          <h3>GitArt Próbaterem és Stúdió!</h3>
          <p>Hogyan indult a történetünk? Egy régi álom vált valóra, amikor megnyitottuk a GitArt Próbatermet, ahol a zenélés és a kreativitás találkozik.</p>
          <p>Gyere el hozzánk, és fedezd fel a zene világát egy inspiráló közegben!</p>
        </div>

        <div className="studio-about">
          <div className="studio-a-content-1">
            <h4>Az álom kezdete</h4>
            <p>Egyszer régen, egy csendes utcában, ahol a zene mindig a levegőben volt, egy kis csapat zenész álma kezdődött. Mindannyian egy közös vágyat dédelgettünk: egy helyet, ahol szabadon alkothatunk, próbálhatunk és megoszthatjuk a zenénket másokkal. Így született meg a GitArt Próbaterem!</p>
            <p>Ez a stúdió nem csupán egy hely; ez egy közösség, ahol a zene szeretete és a kreativitás összeköt minket. Minden sarokban érezhető a zene vibrálása, ami inspirál minket a legjobb munkára. A GitArt Próbaterem a zenélés otthona lett, ahol mindenki megtalálhatja a saját hangját, és felfedezheti a zenélés varázsát.</p>
            <p>Az elmúlt évek alatt sok tehetséges művész fordult meg nálunk, mindannyian hozzájárultak a stúdió színes történetéhez. Ezen a helyen nemcsak zenét rögzítünk, hanem barátságokat is kötünk, és közös élményeket teremtünk.</p>
          </div>
          <img src={img.studio} alt="Keverőpult" className="studio-a-img-1" />
          <div className="studio-a-content-2">
            <h4>Csodás pillanatok</h4>
            <p>Az évek során számtalan csodás pillanatnak lehettünk tanúi. Minden próba, minden felvétel és minden baráti összejövetel a zene ünnepe volt. Olyan zenészek léptek be a stúdiónk ajtaján, akik készen álltak arra, hogy megosszanak valami igazán különlegeset. Az együttműködések születtek, barátságok formálódtak, és az álmok valóra váltak.</p>
            <p>A GitArt Próbaterem nemcsak a zene rögzítésének helyszíne, hanem egy kreatív tér is, ahol a zenészek inspirációt nyerhetnek és új ötleteket valósíthatnak meg. A stúdiónk falai között született dalok számos emléket idéznek fel, és minden egyes hangsáv mögött egy külön történet rejtőzik.</p>
            <p>Minden látogatás során új felfedezéseket teszünk, és a közönség számára is izgalmas lehetőségeket kínálunk. Különböző workshopok, jam sessionök és zenei események várják az érdeklődőket. Itt a GitArt Próbateremben a zene sosem áll meg!</p>
          </div>
          <img src={img.studio_about} alt="Mikrofon" className="studio-a-img-2" />
        </div>

        <div className="studio-services">
          <h3>Szolgáltatások</h3>
          <p>Fedezd fel professzionális zenei szolgáltatásainkat, amelyek mindent magukban foglalnak a felvételtől a masterelésig. Legyen szó egyetlen dalról vagy egy teljes albumról, mi segítünk megvalósítani elképzeléseidet. Rögzítsünk hangszerenként vagy éneksávonként, keverjük és mastereljük a legjobb hangzás érdekében.</p>

          <p>Ha csak egyetlen hangszert szeretnél rögzíteni, mint például dobot vagy éneket, mi itt vagyunk. Kínálunk tanácsokat dalírásban és hangszerelésben is, hogy a lehető legjobbat hozhassuk ki a zenei alapjaidból.</p>

          <p>A stúdiónk minőségi szolgáltatásokat kínál kedvező áron. A már rögzített anyagaidat is finomhangoljuk, és lehetőséget adunk az újraerősítésre, ha szükséged van rá. Egyszerűen küldd el nekünk a DI-sávot, és mi a legjobb felszereléssel újra rögzítjük a sávot.</p>

          <p>Várunk, hogy együtt dolgozhassunk a mastering, zenei videók és marketing terén is. Ráadásul, ha rádiós hirdetést vagy közleményt szeretnél, mi segítünk a szükséges infrastruktúrával. Bérleti lehetőségeink is elérhetőek!</p>

          <div className="service-cards">
            <div className="service-card">
              <div className="icon"><i className="fas fa-music"></i></div> {/* React icon */}
              <h4>Videóklip Készítés</h4>
              <p>Készítsd el saját videóklippedet! A stúdiózás során vagy külső helyszínen is rögzítjük a zenekarod vagy szólistád felvételeit.</p>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-bullhorn"></i></div> {/* React icon */}
              <h4>Reklámkészítés</h4>
              <p>Reklámozni szeretnéd a cégedet? Készíts velünk rádióreklámot! Csodás férfi és női hangunkkal segítünk a szignálod létrehozásában.</p>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-pencil-alt"></i></div> {/* React icon */}
              <h4>Dalszerzés és Zenei Producer</h4>
              <p>Ha van egy dalötleted vagy szeretnél saját dalokat, segítünk a dalszöveg, dallam írásában és hangszerelésében is.</p>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-volume-up"></i></div> {/* React icon */}
              <h4>Mixing & Mastering</h4>
              <p>Ha a saját felvételeid nem úgy szólnak, ahogy szeretnéd, hozd el hozzánk! Keverésben és masterelésben is a legjobbat nyújtjuk, hogy a legjobb hangzást érhesd el.</p>
            </div>
          </div>
        </div>




        <div className="studio-details">
          <h2>Az eszeközök</h2>


          {/* Keverőpult */}
          {studio.equipment?.mixing_console && (
            <div>
              <h3>Keverőpult</h3>
              <p><strong>Márka:</strong> {studio.equipment.mixing_console.brand}</p>
              <p><strong>Modell:</strong> {studio.equipment.mixing_console.model}</p>
              <p><strong>Csatornák:</strong> {studio.equipment.mixing_console.channels}</p>
              <p>{studio.equipment.mixing_console.description}</p>
            </div>
          )}

          {/* Stúdió monitorok */}
          {studio.equipment?.studio_monitors && (
            <div>
              <h3>Stúdió monitorok</h3>
              <p><strong>Márka:</strong> {studio.equipment.studio_monitors.brand}</p>
              <p><strong>Modell:</strong> {studio.equipment.studio_monitors.model}</p>
              <p><strong>Teljesítmény:</strong> {studio.equipment.studio_monitors.power}</p>
              <p>{studio.equipment.studio_monitors.description}</p>
            </div>
          )}

          {/* Mikrofonok */}
          {studio.equipment?.microphones && (
            <div>
              <h3>Mikrofonok</h3>
              <p><strong>Márka:</strong> {studio.equipment.microphones.brand}</p>
              <p><strong>Modellek:</strong> {studio.equipment.microphones.models.join(', ')}</p>
              <p>{studio.equipment.microphones.description}</p>
            </div>
          )}

          {/* Hangkártya */}
          {studio.equipment?.audio_interface && (
            <div>
              <h3>Hangkártya</h3>
              <p><strong>Márka:</strong> {studio.equipment.audio_interface.brand}</p>
              <p><strong>Modell:</strong> {studio.equipment.audio_interface.model}</p>
              <p><strong>Csatornák:</strong> {studio.equipment.audio_interface.channels}</p>
              <p>{studio.equipment.audio_interface.description}</p>
            </div>
          )}

          {/* DAW */}
          {studio.equipment?.daw && (
            <div>
              <h3>DAW</h3>
              <p><strong>Szoftver:</strong> {studio.equipment.daw.software}</p>
              <p><strong>Verzió:</strong> {studio.equipment.daw.version}</p>
              <p>{studio.equipment.daw.description}</p>
            </div>
          )}
        </div>
      </div>

      <div className="studio-gallery">
        <h2>A stúdió képekben:</h2>
        <div className="studio-gallery-container">
          {/* Képgaléria */}
          {Object.values(studioImg).map((image, index) => (
            <div className="studio-img-wrapper" key={index} onClick={() => openModal(image)}>
              <img src={image} alt={`GitArt Stúdió ${index + 1}`} />
              <GoZoomIn className="zoom-icon" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal megjelenítése */}
      {isModalOpen && <Modal imgSrc={selectedImage} onClose={closeModal} isOpen={isModalOpen} />}

      <div className="back-btn">
        <BackBtn />
      </div>
    </div>
  );
};

export default Studio;
