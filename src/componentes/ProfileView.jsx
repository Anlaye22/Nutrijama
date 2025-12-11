import React from "react";
import stProfile from "../styles/Profile.module.css";
export default function ProfileView({ currentUser, handleLogout }) {
  return (
    <div className={stProfile.profileSection}>
      <div className={stProfile.profileHeader}>
        <div className={stProfile.profileAvatar}>
          {currentUser.nombre.charAt(0).toUpperCase()}
        </div>
        <h2>{currentUser.nombre}</h2>
        <p className={stProfile.profileEmail}>{currentUser.email}</p>
      </div>

      <div className={stProfile.profileInfoCard}>
        <h3>Información Personal</h3>
        <div className={stProfile.infoRow}>
          <span className={stProfile.label}>Edad:</span>
          <span className={stProfile.value}>{currentUser.edad} años</span>
        </div>
        <div className={stProfile.infoRow}>
          <span className={stProfile.label}>Condición médica:</span>
          <span className={stProfile.value}>{currentUser.enfermedad}</span>
        </div>
        <div className={stProfile.infoRow}>
          <span className={stProfile.label}>Alergias:</span>
          <span className={stProfile.value}>
            {currentUser.alergias || "Ninguna"}
          </span>
        </div>
      </div>

      <div className={stProfile.profileActions}>
        <button className={stProfile.btnEdit}>Editar Perfil</button>
        <button className={stProfile.btnLogoutProfile} onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className={stProfile.profileStats}>
        <div className={stProfile.statCard}>
          <h4>0</h4>
          <p>Pedidos</p>
        </div>
        <div className={stProfile.statCard}>
          <h4>0</h4>
          <p>Puntos</p>
        </div>
        <div className={stProfile.statCard}>
          <h4>$0</h4>
          <p>Ahorrado</p>
        </div>
      </div>
    </div>
  );
}
