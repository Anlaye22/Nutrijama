import { useState } from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import Checkout from "./Checkout";
import OrderSuccess from "./OrderSuccess";
export default function Cart({ goHome }) {
  const { cart, updateQty, removeFromCart, subtotal, placeOrder } = useCart();
  const [showCart, setShowCart] = useState(true);
  const [showPago, setShowPago] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const handleProcess = () => {
    if (subtotal === 0) {
      alert("El carrito está vacío. Agrega productos antes de proceder.");
      return;
    }
    setShowCart(false);
    setShowCheckout(true);
  };
  const handlePago = () => {
    placeOrder();
    setShowCheckout(false);
    setShowPago(true);
  };
  const onBackCart = () => {
    setShowCheckout(false);
    setShowCart(true);
  };
  return (
    <>
      <div className="app">
        <main className="screen">
          <div className="cart">
            {/* ya no ponemos <h2>Carrito</h2> aquí */}
            {showCart && (
              <>
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

                    <button
                      className="remove"
                      onClick={() => removeFromCart(p.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))}
                <div className="total">Subtotal: ${subtotal.toFixed(2)}</div>

                <button className="checkout-btn" onClick={handleProcess}>
                  Procesar el pago
                </button>
              </>
            )}
            {showCheckout && (
              <Checkout goSuccess={handlePago} goBack={onBackCart} />
            )}
            {showPago && <OrderSuccess goHome={goHome} />}
          </div>
        </main>
      </div>
    </>
  );
}
