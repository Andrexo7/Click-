import React from 'react'

export default function sinresultados() {
  return (
    <div>
      <div className="sinResultados" id="sinResultados">
          <img src="/imagenes/busqueda.gif" alt="sin resultados" />
          <h3>No hay publicaciones que coincidan con tu búsqueda.</h3>
          <ul>
            <li>Revisa la ortografía de la palabra.</li>
            <li>Utiliza palabras más genéricas o menos palabras.</li>
            <li>Navega por las categorías para encontrar un producto similar</li>
          </ul>
        </div>

    </div>
  )
}


