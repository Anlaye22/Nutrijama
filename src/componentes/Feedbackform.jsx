import React from "react";
import { useState } from "react";
export const FeedbackForm = ({ orderId, onSubmit }) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(orderId, feedback);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        borderTop: "1px dashed #ccc",
        marginTop: "15px",
        paddingTop: "15px",
      }}
    >
      <h4>¿Qué tal estuvo tu pedido?</h4>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Escribe aquí tu opinión sobre el producto o servicio..."
        rows="3"
        style={{ width: "98%", padding: "8px", marginBottom: "10px" }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "8px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Enviar Retroalimentación
      </button>
    </form>
  );
};
