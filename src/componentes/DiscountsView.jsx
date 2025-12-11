import React from "react";
import stDiscounts from "../styles/Discounts.module.css";
import { useCart } from "../context/CartContext";
export default function DiscountsView() {
  const { getOrdersHistory } = useCart();
  const orders = getOrdersHistory();
  /**
   * Verifica si el usuario hizo más de 10 pedidos en los últimos 7 días.
   * @returns {boolean} True si cumple la condición.
   */
  const checkLoyaltyCondition = () => {
    if (orders.length === 0) {
      return false;
    }

    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

    const recentOrders = orders.filter((order) => {
      const orderDate = new Date(order.fecha).getTime();
      return orderDate > sevenDaysAgo;
    });

    return recentOrders.length >= 10;
  };

  const isLoyalCustomer = checkLoyaltyCondition();
  return (
    <div className={stDiscounts.discountsSection}>
      <h2>Descuentos Especiales</h2>
      {isLoyalCustomer && (
        <div className={`${stDiscounts.discountCard} ${stDiscounts.loyalty}`}>
          <div className={stDiscounts.discountBadge}>¡PREMIUM!</div>
          <h3>Cliente Fiel</h3>
          <p>
            Has realizado más de 10 pedidos en la última semana. Disfruta un
            **10% EXTRA** en toda tu compra.
          </p>
          <span className={stDiscounts.code}>Código: FIEL10</span>
        </div>
      )}

      {/* Mensaje si NO es cliente fiel */}
      {!isLoyalCustomer && (
        <div
          className={stDiscounts.promoBanner}
          style={{ backgroundColor: "#fffbe6", border: "1px solid #ffe082" }}
        >
          <p>
            Sigue pidiendo! Haz 10 pedidos en la última semana para desbloquear
            el 10% de descuento extra.
          </p>
        </div>
      )}
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
    </div>
  );
}
