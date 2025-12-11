import React from "react";
import { ChevronLeft, MapPin, Clock, Truck } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import stMap from "../styles/Map.module.css";

// --- Icono de Pin Verde (Reutilizando la configuración anterior) ---
delete L.Icon.Default.prototype._getIconUrl;

const greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Coordenadas simuladas para el ejemplo
const URDESA_CENTER = [-2.1643, -79.9142];
const MAP_ZOOM = 15;
const USER_LOCATION = [-2.166, -79.916];

/**
 * Componente que muestra los detalles del Food Truck seleccionado.
 * @param {object} props - Propiedades del componente.
 * @param {object} props.truck - Objeto del Food Truck seleccionado.
 * @param {function} props.onBack - Función para volver a la vista del mapa principal.
 */
export default function FoodTruckDetails({ truck, onBack }) {
  if (!truck) return null; // No renderizar si no hay truck seleccionado

  // Simulación de datos para la ruta y la ubicación del camión
  const truckLocation = [
    truck.lat || URDESA_CENTER[0] + 0.002,
    truck.lng || URDESA_CENTER[1] + 0.001,
  ];
  const routePoints = [USER_LOCATION, truckLocation];

  // Datos mostrados en la tarjeta, basados en la imagen
  const deliveryInfo = {
    distance: truck.distance || "7 min",
    open: true,
    closeTime: "18:00",
    deliveryAddress:
      "Frente al edificio 1 del Omnihospital, cerca de la famcia Cruz Azul",
    paymentMethods: "Tarjeta, efectivo, código QR",
  };

  return (
    <div className={stMap.detailsContainer}>
      {/* 1. Header de Navegación */}
      <header className={stMap.detailsHeader}>
        <button onClick={onBack} className={stMap.backButton}>
          <ChevronLeft size={24} />
          Back
        </button>
        <h1 className={stMap.truckTitle}>
          FoodTruck, {truck.name || "Selecluted Sol"}
        </h1>
      </header>

      {/* 2. Mapa y Ruta (Mapa de Leaflet con Polyline) */}
      <div className={stMap.detailsMapWrapper}>
        <MapContainer
          center={truckLocation}
          zoom={MAP_ZOOM}
          scrollWheelZoom={false}
          className={stMap.mapContainerLeaflet}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Ruta al destino */}
          <Polyline
            positions={routePoints}
            color="#6baf2c"
            weight={5}
            opacity={0.8}
          />

          {/* Marcador del Food Truck (Destino) */}
          <Marker position={truckLocation} icon={greenIcon}>
            <Popup>{truck.name}</Popup>
          </Marker>

          {/* Marcador del Usuario (Inicio) - Podrías usar otro icono aquí */}
          <Marker position={USER_LOCATION} icon={greenIcon}>
            <Popup>Tu Ubicación</Popup>
          </Marker>

          {/* Simulación del badge de tiempo */}
          <div
            className={stMap.timeBadgeOverlay}
            style={{
              top: "40%",
              left: "40%",
            }}
          >
            {deliveryInfo.distance}
          </div>
        </MapContainer>
      </div>

      {/* 3. Tarjeta de Información de Entrega y Pago */}
      <div className={stMap.infoCard}>
        {/* 3.1 Sección de Distancia y Horario */}
        <div className={stMap.infoSection}>
          <h4>Distancia aproximada de:</h4>
          <span className={stMap.metaItem}>
            <Clock size={16} /> {deliveryInfo.distance}
          </span>
          <p className={stMap.statusItem}>
            <span
              className={
                deliveryInfo.open ? stMap.statusOpen : stMap.statusClosed
              }
            ></span>
            {deliveryInfo.open ? "Abierto hasta las" : "Cerrado, abre a las"}{" "}
            {deliveryInfo.closeTime}
          </p>
          <p className={stMap.statusItem}>
            <span
              className={
                deliveryInfo.open ? stMap.statusOpen : stMap.statusClosed
              }
            ></span>
            Abierto hasta las {deliveryInfo.closeTime}{" "}
            {/* Repetido de la imagen */}
          </p>
        </div>

        <hr className={stMap.divider} />

        {/* 3.2 Sección de Punto de Entrega */}
        <div className={stMap.infoSection}>
          <h4>Punto de entrega:</h4>
          <p className={stMap.detailText}>
            <MapPin size={16} className={stMap.iconSmall} />
            {deliveryInfo.deliveryAddress}
          </p>
        </div>

        <hr className={stMap.divider} />

        {/* 3.3 Sección de Método de Pago */}
        <div className={stMap.infoSection}>
          <h4>Método de Pago:</h4>
          <p className={stMap.detailText}>{deliveryInfo.paymentMethods}</p>
        </div>
      </div>

      {/* 4. Botón de Acción */}
      <footer className={stMap.detailsFooter}>
        <button className={stMap.btnViewMenu}>Ver Menú</button>
      </footer>
    </div>
  );
}
