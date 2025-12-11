import { useCart } from "../context/CartContext";

export default function Cart({ goCheckout }) {
  const { cart, updateQty, removeFromCart, subtotal } = useCart();

  return (
    <div className="cart">
      {/* ya no ponemos <h2>Carrito</h2> aquí */}

      {cart.map((p) => (
        <div key={p.id} className="cart-item">
          <img src={p.image} />

          <div className="info">
            <h3>{p.name}</h3>
            <p>${p.price.toFixed(2)}</p>
          </div>

          <div className="qty-controls">
            <button onClick={() => updateQty(p.id, -1)}>-</button>
            <span>{p.qty}</span>
            <button onClick={() => updateQty(p.id, +1)}>+</button>
          </div>

          <button className="remove" onClick={() => removeFromCart(p.id)}>
            🗑️
          </button>
        </div>
      ))}

      <div className="total">Subtotal: ${subtotal.toFixed(2)}</div>

      <button className="checkout-btn" onClick={goCheckout}>
        Procesar el pago
      </button>
    </div>
  );
}
