import React from "react";
import { useState } from "react";
import stSesion from "../styles/Sesion.module.css";
import MapView from "./MapView";
import ProfileView from "./ProfileView";
import DiscountsView from "./DiscountsView";
import { Home, Tag, ShoppingCart, User } from "lucide-react";

export const MOCK_FOODTRUCKS = [
  {
    id: 1,
    name: "Healthy Bites",
    distance: "0.3 km",
    specialty: "Opciones diabéticas",
    rating: 4.8,
    lat: -2.1894,
    lng: -79.8875,
  },
  {
    id: 2,
    name: "Green Heart",
    distance: "0.5 km",
    specialty: "Menú hipertensos",
    rating: 4.6,
    lat: -2.1904,
    lng: -79.8865,
  },
  {
    id: 3,
    name: "Fresh & Fit",
    distance: "0.8 km",
    specialty: "Sin gluten",
    rating: 4.9,
    lat: -2.1914,
    lng: -79.8855,
  },
  {
    id: 4,
    name: "Nutri Express",
    distance: "1.2 km",
    specialty: "Comida balanceada",
    rating: 4.5,
    lat: -2.1924,
    lng: -79.8845,
  },
];

export default function StartSesionHome({ handleLogout, currentUser }) {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedTruck, setSelectedTruck] = useState(null);
  // Renderizado condicional del contenido
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <MapView
            selectedTruck={selectedTruck}
            setSelectedTruck={setSelectedTruck}
          />
        );
      case "discounts":
        return <DiscountsView />;
      case "cart":
        return (
          <ProfileView currentUser={currentUser} handleLogout={handleLogout} />
        );
      case "profile":
        return (
          <ProfileView currentUser={currentUser} handleLogout={handleLogout} />
        );
      default:
        return (
          <MapView
            selectedTruck={selectedTruck}
            setSelectedTruck={setSelectedTruck}
          />
        );
    }
  };
  return (
    <div className={stSesion.dashboardContainer}>
      {/* Header (solo visible en móvil) */}
      <header className={stSesion.dashboardHeader}>
        <div className={stSesion.logoHeader}>NutriJama</div>
      </header>

      {/* Contenido principal */}
      <main className={stSesion.dashboardContent}>{renderContent()}</main>

      {/* Bottom Navigation */}
      <nav className={stSesion.bottomNav}>
        <button
          className={`${stSesion.navItem} ${
            activeTab === "home" ? "active" : ""
          }`}
          onClick={() => setActiveTab("home")}
        >
          <Home size={24} />
          <span>Inicio</span>
        </button>

        <button
          className={`${stSesion.navItem} ${
            activeTab === "discounts" ? "active" : ""
          }`}
          onClick={() => setActiveTab("discounts")}
        >
          <Tag size={24} />
          <span>Descuentos</span>
        </button>

        <button
          className={`${stSesion.navItem} ${
            activeTab === "cart" ? "active" : ""
          }`}
          onClick={() => setActiveTab("cart")}
        >
          <ShoppingCart size={24} />
          <span>Carrito</span>
        </button>

        <button
          className={`${stSesion.navItem} ${
            activeTab === "profile" ? "active" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          <User size={24} />
          <span>Perfil</span>
        </button>
      </nav>
    </div>
  );
}
