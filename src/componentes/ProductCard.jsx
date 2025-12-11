import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";

export default function ProductCard({ product, onClick }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card" onClick={onClick}>
      <img src={product.image} alt={product.name} />

      <div className="info">
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
      </div>

      <button
        className="add-btn"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        +
      </button>
    </div>
  );
}
