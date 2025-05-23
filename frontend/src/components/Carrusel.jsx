import React, { useState, useEffect } from "react";
import "./Carrusel.css"; 
import promo1 from "../assets/img/promocion1.gif"
import promo2 from "../assets/img/promocion2.png"
import promo3 from "../assets/img/promocion3.gif"
import promo4 from "../assets/img/promocion4.png"

const imagenes = [promo1, promo2, promo3, promo4]

function Carrusel() {


  const [indice, setIndice] = useState(0);
  

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((prevIndice) => (prevIndice + 1) % imagenes.length);
    }, 10000); // Cambia cada 10 segundos

    return () => clearInterval(intervalo); // Limpia al desmontar
  }, []);

  return (
    <div className="carrusel">
     
      <img src={imagenes[indice]} alt={`Promoción ${indice + 1}`} />
      

      <div className="puntos">
        {imagenes.map((_, i) => (
          <span
            key={i}
            className={`punto ${i === indice ? "activo" : ""}`}
            onClick={() => setIndice(i)}
          ></span>
        ))}
      </div>
    </div>

  );
}

export default Carrusel;
