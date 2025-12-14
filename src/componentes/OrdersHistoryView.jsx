import React from "react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { FeedbackForm } from "./Feedbackform";
const DELIVERY_TIME_LIMIT_MS = 10 * 60 * 1000;
export default function OrdersHistoryView() {
  const { getOrdersHistory, markFeedbackSent, getFeedbackStatus } = useCart();
  const orders = getOrdersHistory();
  const [feedbackSubmittedIds, setFeedbackSubmittedIds] = useState({});

  /**
   * Determina el estado del pedido basándose en el tiempo transcurrido.
   * @param {string} orderDateString - La fecha del pedido en formato ISO (order.fecha).
   * @returns {{ status: 'Entregado' | 'Pendiente', isDelivered: boolean }}
   */
  const getOrderStatus = (orderDateString) => {
    const orderTime = new Date(orderDateString).getTime();
    const currentTime = Date.now();
    const timeElapsed = currentTime - orderTime;

    const isDelivered = timeElapsed >= DELIVERY_TIME_LIMIT_MS;

    return {
      status: isDelivered ? "Entregado" : "Pendiente",
      isDelivered: isDelivered,
    };
  };

  /**
   * Simula el envío de una retroalimentación.
   * @param {string} orderId - ID del pedido.
   * @param {string} feedbackText - Texto de la retroalimentación.
   */
  const handleSendFeedback = (orderId, feedbackText) => {
    if (!feedbackText.trim()) {
      alert("Por favor, escribe tu retroalimentación antes de enviar.");
      return;
    }

    console.log(
      `Retroalimentación enviada para el pedido ${orderId}: "${feedbackText}"`
    );

    markFeedbackSent(orderId);
    setFeedbackSubmittedIds((prev) => ({
      ...prev,
      [orderId]: true,
    }));
    alert("¡Gracias por tu retroalimentación!");
  };

  if (orders.length === 0) {
    return <div>Aún no tienes pedidos registrados.</div>;
  }

  return (
    <div style={{ padding: "15px" }}>
      <h2>Historial de Pedidos</h2>
      {orders.map((order) => {
        const { status, isDelivered } = getOrderStatus(order.fecha);
        const hasFeedbackBeenSent =
          getFeedbackStatus(order.id) || feedbackSubmittedIds[order.id];

        return (
          <div
            key={order.id}
            style={{
              border: "1px solid #ccc",
              margin: "15px 0",
              padding: "15px",
              borderRadius: "8px",
            }}
          >
            {/* Encabezado del Pedido */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h3>Pedido ID: {order.id.substring(7)}</h3>
              <span
                style={{
                  backgroundColor: isDelivered ? "#4CAF50" : "#FF9800",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
            </div>

            <p>
              Fecha: {new Date(order.fecha).toLocaleDateString()} -{" "}
              {new Date(order.fecha).toLocaleTimeString()}
            </p>
            <p>
              Valor Total: <strong>${order.valorTotal.toFixed(2)}</strong>
            </p>

            {/* Lista de Ítems (Opcional: puedes envolver esto en un colapsable) */}
            <h4 style={{ marginTop: "10px" }}>Detalles:</h4>
            <ul style={{ padding: "0 15px" }}>
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.qty}x {item.name} (${item.price.toFixed(2)} c/u)
                </li>
              ))}
            </ul>

            {/* --- LÓGICA DE RETROALIMENTACIÓN --- */}
            {isDelivered && !hasFeedbackBeenSent && (
              <FeedbackForm orderId={order.id} onSubmit={handleSendFeedback} />
            )}

            {hasFeedbackBeenSent && (
              <p
                style={{
                  marginTop: "10px",
                  color: "#4CAF50",
                  fontWeight: "bold",
                }}
              >
                Retroalimentación enviada. ¡Gracias!
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
