import React from "react";
import styles from "../styles/Home.module.css";
import stLogin from "../styles/Login.module.css";

export default function Login({
  handleBack,
  largeLogoImagePath,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  handleLogin,
  handleRegisterClick,
}) {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.logoHeader1}>Nutri</div>
        <div className={styles.logoHeader2}>Truck</div>
      </header>
      <main className={styles.mainContent}>
        <div className={stLogin.formWrapper}>
          <button className={stLogin.btnBack} onClick={handleBack}>
            ← Volver
          </button>

          <div className={stLogin.logoSmallContainer}>
            <img
              src={largeLogoImagePath}
              alt="Logo"
              className={stLogin.logoSmall}
            />
          </div>

          <h2 className={stLogin.formTitle}>Iniciar Sesión</h2>

          <div className={stLogin.form}>
            <div className={stLogin.formGroup}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </div>

            <div className={stLogin.formGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button className={stLogin.btnSubmit} onClick={handleLogin}>
              Iniciar Sesión
            </button>
          </div>

          <p className={stLogin.formFotter}>
            ¿No tienes cuenta?{" "}
            <button
              className={stLogin.linkButton}
              onClick={handleRegisterClick}
            >
              Regístrate
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
