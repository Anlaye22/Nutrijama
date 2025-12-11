import React from 'react';
import styles from './Home.module.css';
import logoLarge from '/pwa-512x512.png';

const Home = () => {
  const handleLogin = () => {
    console.log('Iniciar Sesión presionado.');
    alert('Navegando a la pantalla principal...');
  };

  return (
    <div className={styles.homeContainer}>
      {/* Header con logo pequeño */}
      <header className={styles.header}>
        <div className={styles.logoHeader}>NutriJama</div>
      </header>

      {/* Contenido principal */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Logo grande */}
          <div className={styles.logoLargeContainer}>
            <img
              src={logoLarge}
              alt="Logo NutriJAMA Principal"
              className={styles.logoLargeImage}
            />
          </div>

          {/* Tagline */}
          <h1 className={styles.tagline}>
            tu día con comida que sí te cuida.
          </h1>

          {/* Botón de acción */}
          <button className={styles.btnLogin} onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;