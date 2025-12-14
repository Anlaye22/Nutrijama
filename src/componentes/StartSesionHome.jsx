import React from "react";
import { useState } from "react";
import stSesion from "../styles/Sesion.module.css";
import styles from "../styles/Home.module.css";
import OrdersHistoryView from "./OrdersHistoryView";
import MapView from "./MapView";
import ProfileView from "./ProfileView";
import DiscountsView from "./DiscountsView";
import { Home, Tag, ShoppingCart, User, Truck } from "lucide-react";
import Cart from "./Cart";
export const products = [
  {
    id: 1,
    name: "Tazón de pollo al curry",
    price: 2.99,
    image:
      "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Plato alto en proteína con pollo, arroz integral y vegetales. Ideal para un almuerzo balanceado.",
    stock: 20,
  },
  {
    id: 2,
    name: "Burritos de frijoles con queso",
    price: 3.5,
    image:
      "https://images.pexels.com/photos/4958642/pexels-photo-4958642.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Burritos vegetarianos con frijoles, queso y vegetales frescos. Fuente de fibra y energía.",
    stock: 20,
  },
  {
    id: 3,
    name: "Torta de frijoles y aguacate",
    price: 2.75,
    image:
      "https://images.pexels.com/photos/3731474/pexels-photo-3731474.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Sánduche con frijoles, aguacate y pan integral. Perfecto para media mañana.",
    stock: 20,
  },
  {
    id: 4,
    name: "Bebida kéfir",
    price: 0.99,
    image:
      "https://images.pexels.com/photos/5946082/pexels-photo-5946082.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Bebida fermentada con probióticos, ideal para acompañar tu bowl y cuidar tu microbiota.",
    stock: 20,
  },
];
export const MOCK_FOODTRUCKS = [
  {
    id: 1,
    name: "Healthy Bites",
    distance: "0.3 km",
    ubicacion: "Frente al Omnihospital",
    rating: 4.8,
    lat: -2.1894,
    lng: -79.8875,
    products: products,
  },
  {
    id: 2,
    name: "Green Heart",
    distance: "0.5 km",
    ubicacion: "Cerca de la farmacia Cruz Azul",
    rating: 4.6,
    lat: -2.1904,
    lng: -79.8865,
    products: products,
  },
  {
    id: 3,
    name: "Fresh & Fit",
    distance: "0.8 km",
    ubicacion: "Junto al parque central",
    rating: 4.9,
    lat: -2.1914,
    lng: -79.8855,
    products: products,
  },
  {
    id: 4,
    name: "Nutri Express",
    distance: "1.2 km",
    ubicacion: "Al lado del gimnasio FitLife",
    rating: 4.5,
    lat: -2.1924,
    lng: -79.8845,
    products: products,
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
        return <Cart goHome={() => setActiveTab("home")} />;
      case "orders":
        return <OrdersHistoryView />;
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
        <div className={styles.logoHeader1}>Nutri</div>
        <div className={styles.logoHeader2}>Truck</div>
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
            activeTab === "orders" ? "active" : ""
          }`}
          onClick={() => setActiveTab("orders")}
        >
          <Truck size={24} />
          <span>Pedidos</span>
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
