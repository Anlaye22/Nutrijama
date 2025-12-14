import React from "react";
import styles from "../styles/Home.module.css";
import stLogin from "../styles/Login.module.css";
export default function Register({
  handleBack,
  largeLogoImagePath,
  regNombre,
  setRegNombre,
  regEdad,
  setRegEdad,
  regEnfermedad,
  setRegEnfermedad,
  regAlergias,
  setRegAlergias,
  regEmail,
  setRegEmail,
  regPassword,
  setRegPassword,
  regPassword2,
  setRegPassword2,
  handleRegister,
  handleLoginClick,
}) {
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <div className={styles.logoHeader1}>Nutri</div>
        <div className={styles.logoHeader2}>Truck</div>
      </header>
      <main className={styles.mainContent}>
        <div className={stLogin.formWrapper.register}>
          <button className={stLogin.btnBack} onClick={handleBack}>
            ← Volver
          </button>

          <div className={stLogin.logoSmallContainer}>
            <img src={largeLogoImagePath} alt="Logo" className="logo-small" />
          </div>

          <h2 className={stLogin.formTitle}>Crear Cuenta</h2>

          <div className={stLogin.form}>
            <div className={stLogin.formRow}>
              <div className={stLogin.formGroup}>
                <label htmlFor="nombre">Nombre completo</label>
                <input
                  type="text"
                  id="nombre"
                  value={regNombre}
                  onChange={(e) => setRegNombre(e.target.value)}
                  placeholder="Juan Pérez"
                />
              </div>

              <div className={stLogin.formGroup}>
                <label htmlFor="edad">Edad</label>
                <input
                  type="number"
                  id="edad"
                  value={regEdad}
                  onChange={(e) => setRegEdad(e.target.value)}
                  placeholder="25"
                  min="1"
                  max="120"
                />
              </div>
            </div>

            <div className={stLogin.formGroup}>
              <label htmlFor="enfermedad">Tipo de enfermedad</label>
              <select
                id="enfermedad"
                value={regEnfermedad}
                onChange={(e) => setRegEnfermedad(e.target.value)}
              >
                <option value="ninguna">Ninguna</option>
                <option value="diabetico">Diabético</option>
                <option value="hipertenso">Hipertenso</option>
                <option value="diabetico-hipertenso">
                  Diabético e Hipertenso
                </option>
              </select>
            </div>

            <div className={stLogin.formGroup}>
              <label htmlFor="alergias">Alergias alimentarias</label>
              <input
                type="text"
                id="alergias"
                value={regAlergias}
                onChange={(e) => setRegAlergias(e.target.value)}
                placeholder="Gluten, lactosa, maní... (opcional)"
              />
            </div>

            <div className={stLogin.formGroup}>
              <label htmlFor="reg-email">Correo electrónico</label>
              <input
                type="email"
                id="reg-email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </div>

            <div className={stLogin.formRow}>
              <div className={stLogin.formGroup}>
                <label htmlFor="reg-password">Contraseña</label>
                <input
                  type="password"
                  id="reg-password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>

              <div className={stLogin.formGroup}>
                <label htmlFor="reg-password2">Confirmar contraseña</label>
                <input
                  type="password"
                  id="reg-password2"
                  value={regPassword2}
                  onChange={(e) => setRegPassword2(e.target.value)}
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>
            </div>

            <button className={stLogin.btnSubmit} onClick={handleRegister}>
              Crear Cuenta
            </button>
          </div>

          <p className={stLogin.formFotter}>
            ¿Ya tienes cuenta?{" "}
            <button className={stLogin.linkButton} onClick={handleLoginClick}>
              Inicia sesión
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
