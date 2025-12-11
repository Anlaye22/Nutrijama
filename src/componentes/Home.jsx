import React from "react";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import logoLarge from "/pwa-512x512.png";
import StartSesionHome from "./StartSesionHome";
import Login from "./Login";
import Register from "./Register";
import { MOCK_USERS } from "../App";
import { CartProvider } from "../context/CartContext";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Estados del formulario de login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Estados del formulario de registro
  const [regNombre, setRegNombre] = useState("");
  const [regEdad, setRegEdad] = useState("");
  const [regEnfermedad, setRegEnfermedad] = useState("ninguna");
  const [regAlergias, setRegAlergias] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regPassword2, setRegPassword2] = useState("");

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleBack = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(MOCK_USERS);
    const user = MOCK_USERS.find(
      (u) => u.email == loginEmail && u.password == loginPassword
    );

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      alert(`¡Bienvenido ${user.nombre}!`);
    } else {
      alert("Credenciales incorrectas");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (regPassword !== regPassword2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const newUser = {
      nombre: regNombre,
      edad: parseInt(regEdad),
      enfermedad: regEnfermedad,
      alergias: regAlergias,
      email: regEmail,
      password: regPassword,
    };

    console.log(newUser);
    console.log(MOCK_USERS);

    MOCK_USERS.push(newUser);
    alert(`¡Cuenta creada exitosamente, ${newUser.nombre}!`);

    // Limpiar formulario y volver al inicio
    setRegNombre("");
    setRegEdad("");
    setRegEnfermedad("ninguna");
    setRegAlergias("");
    setRegEmail("");
    setRegPassword("");
    setRegPassword2("");
    setShowRegister(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
    setShowRegister;
    setCurrentUser(null);
    setLoginEmail("");
    setLoginPassword("");
  };

  return (
    <>
      {!showLogin && !showRegister && (
        <div className={styles.homeContainer}>
          <header className={styles.header}>
            <div className={styles.logoHeader}>NutriJama</div>
          </header>
          <main className={styles.mainContent}>
            <div className={styles.contentWrapper}>
              <div className={styles.logoLargeContainer}>
                <img
                  src={logoLarge}
                  alt="Logo NutriJAMA Principal"
                  className={styles.logoLargeImage}
                />
              </div>
              <h1 className={styles.tagline}>
                tu día con comida que sí te cuida.
              </h1>

              <button className={styles.btnLogin} onClick={handleLoginClick}>
                Iniciar Sesión
              </button>
            </div>
          </main>
        </div>
      )}
      {isLoggedIn && currentUser && (
        <CartProvider currentUserEmail={currentUser?.email}>
          <StartSesionHome
            handleLogout={handleLogout}
            currentUser={currentUser}
          />
        </CartProvider>
      )}
      {showLogin && !isLoggedIn && !currentUser && (
        <Login
          handleBack={handleBack}
          largeLogoImagePath={logoLarge}
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          handleLogin={handleLogin}
          handleRegisterClick={handleRegisterClick}
        />
      )}
      {showRegister && (
        <Register
          handleBack={handleBack}
          largeLogoImagePath={logoLarge}
          regNombre={regNombre}
          setRegNombre={setRegNombre}
          regEdad={regEdad}
          setRegEdad={setRegEdad}
          regEnfermedad={regEnfermedad}
          setRegEnfermedad={setRegEnfermedad}
          regAlergias={regAlergias}
          setRegAlergias={setRegAlergias}
          regEmail={regEmail}
          setRegEmail={setRegEmail}
          regPassword={regPassword}
          setRegPassword={setRegPassword}
          regPassword2={regPassword2}
          setRegPassword2={setRegPassword2}
          handleRegister={handleRegister}
          handleLoginClick={handleLoginClick}
        />
      )}
    </>
  );
};

export default Home;
