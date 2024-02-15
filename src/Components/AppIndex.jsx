"use client";

import { useEffect, useState } from "react";
import { poemas } from "./Poemas";
import styles from "./AppIndex.module.css";
import { shuffle } from "underscore";

const poemaBaraja = shuffle(poemas);

const AppIndex = () => {
  const [nombre, setNombre] = useState("");
  const [mostrarPoema, setMostrarPoema] = useState(false);
  const [poemaSeleccionado, setPoemaSeleccionado] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleMostrarPoema = () => {
    const poemaAleatorio = poemaBaraja[0];
    const poemaConNombre = poemaAleatorio.replaceAll("[nombre]", nombre);
    setPoemaSeleccionado(poemaConNombre);
    setMostrarPoema(true);
  };

  const handleCopiarPoema = () => {
    navigator.clipboard
      .writeText(poemaSeleccionado)
      .then(() => {
        setMostrarMensaje(true);
        setTimeout(() => {
          setMostrarMensaje(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err);
      });
  };

  const cantidadCorazon = Math.round(Math.random() * 70 + 10); // Retraso aleatorio

  useEffect(() => {
    if (mostrarPoema) {
      const interval = setInterval(() => {
        const corazones = document.querySelectorAll(".corazon");
        corazones.forEach((corazon) => {
          const randomX = Math.round(Math.random() * window.innerWidth);
          const randomY = Math.round(Math.random() * window.innerHeight);
          const randomSize = Math.round(Math.random() * 70 + 10); // Tamaños entre 10 y 70
          const randomDelay = Math.round(Math.random() * 1); // Retraso aleatorio

          corazon.style.left = `${randomX}px`;
          corazon.style.top = `${randomY}px`;
          corazon.style.width = `${randomSize}px`;
          corazon.style.height = `${randomSize}px`;
          corazon.style.animationDuration = `${2 + randomDelay}s`;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [mostrarPoema]);

 

  return (
    <main className={styles.container__main}>
      {!mostrarPoema && (
        <section className={styles.container__principal}>
          <label>
            Ingresa el nombre para dedicar el Poema:
            <input type="text" value={nombre} onChange={handleNombreChange} />
          </label>
          <button onClick={handleMostrarPoema}>Mostrar Poema</button>
        </section>
      )}

      {mostrarPoema && (
        <>
          <div className={styles.corazones__container}>
            {[...Array(cantidadCorazon)].map((_, index) => (
              <div key={index} className={`corazon ${styles.corazon}`}></div>
            ))}
          </div>
          <section className={styles.section__corazon}>
            <h1>Poema dedicado a {nombre}:</h1>
            <p>{poemaSeleccionado}</p>
            <img
              onClick={handleCopiarPoema}
              className={styles.image__copy}
              width={50}
              height={50}
              src="/icons8-copy-50.png"
              alt="imagen de copiar"
            />
            {mostrarMensaje && <p className={styles.mensaje__copiar}>Poema copiado al portapapeles</p>}
          </section>
        </>
      )}
    </main>
  );
};

export default AppIndex;
