import React, { useState } from "react";
import FoodTruckDetails from "./FoodTruckDetails";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { products } from "./StartSesionHome";
import { MapPin } from "lucide-react";
import { MOCK_FOODTRUCKS } from "./StartSesionHome";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import stMap from "../styles/Map.module.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

// También puedes crear un icono verde personalizado si quieres
const greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png", // Ruta de CDN para la sombra
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const personIcon = new L.Icon({
  iconUrl: "green-ping.png", // Usa una imagen de pin verde
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const URDESA_CENTER = [-2.1643, -79.9142];
const MAP_ZOOM = 16;
const USER_LOCATION = [-2.166, -79.916];

export default function MapView({ selectedTruck, setSelectedTruck }) {
  const foodTrucksWithCoords = MOCK_FOODTRUCKS.map((truck, idx) => ({
    ...truck,
    // Pequeñas variaciones de latitud/longitud
    lat: URDESA_CENTER[0] + (idx * 0.002 - 0.003),
    lng: URDESA_CENTER[1] + (idx * 0.002 - 0.001),
  }));
  const closestTruck = foodTrucksWithCoords[0];
  const routePoints = [USER_LOCATION, [closestTruck.lat, closestTruck.lng]];
  const travelTime = "7 min";
  const [viewProducts, setViewProducts] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

  const handleBack = () => {
    setSelectedTruck(null);
  };

  const handleFoodTruck = () => {
    setViewProducts(false);
    setProductDetails(false);
    setActiveProduct(null);
  };
  const handleProducts = () => {
    setActiveProduct(null);
    setViewProducts(true);
  };

  const handleProductsDetail = (p) => {
    setViewProducts(false);
    setActiveProduct(p);
    setProductDetails(true);
  };

  if (selectedTruck) {
    if (productDetails && activeProduct) {
      return <ProductDetail product={activeProduct} goBack={handleProducts} />;
    }
    if (viewProducts) {
      return (
        <ProductList
          products={products}
          goToDetail={handleProductsDetail}
          handleBack={handleFoodTruck}
        />
      );
    }

    // Si hay un camión seleccionado, muestra los detalles
    return (
      <FoodTruckDetails
        truck={selectedTruck}
        onBack={handleBack}
        handleProducts={handleProducts}
      />
    );
  }

  return (
    <div className={stMap.mapSection}>
      <div className={stMap.mapHeader}>
        <h2>Food Trucks Cercanos</h2>
        <div className={stMap.locationBadge}>
          <MapPin size={16} />
          <span>Guayaquil, EC</span>
        </div>
      </div>

      <div className={stMap.mapContainerReal}>
        <MapContainer
          center={URDESA_CENTER}
          zoom={MAP_ZOOM}
          scrollWheelZoom={false}
          className={stMap.mapContainerLeaflet}
        >
          {/* Capa base de OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline
            positions={routePoints}
            color="#6baf2c" // El color verde deseado
            weight={5}
            opacity={0.8}
          />
          <div
            className={stMap.timeBadgeOverlay}
            style={{
              // Posiciona el badge cerca del inicio de la ruta
              top: "70%",
              left: "25%",
            }}
          >
            {travelTime}
          </div>
          {/* Marcadores reales de food trucks */}
          {foodTrucksWithCoords.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.lat, truck.lng]}
              // Usa el icono verde si lo definiste, si no, usa el default
              icon={greenIcon}
              eventHandlers={{
                click: () => setSelectedTruck(truck),
              }}
            >
              <Popup>
                <strong>{truck.name}</strong>
                <br />
                {truck.specialty}
              </Popup>
            </Marker>
          ))}

          {/* Opcional: Marcador de Ubicación del Usuario (con el icono verde) */}
          <Marker
            position={USER_LOCATION}
            icon={personIcon} // Usamos el pin verde para la ubicación actual
          >
            <Popup>Tu Ubicación Actual</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Lista de food trucks */}
      <div className={stMap.truckList}>
        <h3>Disponibles ahora</h3>
        {foodTrucksWithCoords.map((truck) => (
          <div
            key={truck.id}
            className={`${stMap.truckCard} ${
              selectedTruck?.id === truck.id ? "selected" : ""
            }`}
            onClick={() => setSelectedTruck(truck)}
          >
            <div className={stMap.truckInfo}>
              <h4>{truck.name}</h4>
              <p className={stMap.specialty}>{truck.specialty}</p>
              <div className={stMap.truckMeta}>
                <span className={stMap.distance}>📍 {truck.distance}</span>
                <span className={stMap.rating}>⭐ {truck.rating}</span>
              </div>
            </div>
            <button className={stMap.btnView}>Ver menú</button>
          </div>
        ))}
      </div>
    </div>
  );
}
