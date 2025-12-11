import React from "react";
import stDiscounts from "../styles/Discounts.module.css";
export default function DiscountsView() {
  return (
    <div className={stDiscounts.discountsSection}>
      <h2>Descuentos Especiales</h2>
      <div className={stDiscounts.discountCard.featured}>
        <div className={stDiscounts.discountBadge}>50% OFF</div>
        <h3>¡Primera compra!</h3>
        <p>Aprovecha tu primer pedido con 50% de descuento</p>
        <span className={stDiscounts.code}>Código: PRIMERA50</span>
      </div>

      <div className={stDiscounts.discountCard}>
        <div className={stDiscounts.discountBadge}>20% OFF</div>
        <h3>Menú Diabético</h3>
        <p>Descuento en opciones especiales para diabéticos</p>
        <span className={stDiscounts.code}>Código: DIAB20</span>
      </div>

      <div className={stDiscounts.discountCard}>
        <div className={stDiscounts.discountBadge}>15% OFF</div>
        <h3>Combo Saludable</h3>
        <p>En combos balanceados para hipertensos</p>
        <span className={stDiscounts.code}>Código: HIPER15</span>
      </div>

      <div className={stDiscounts.promoBanner}>
        <p>💚 Acumula puntos con cada compra</p>
      </div>
    </div>
  );
}
