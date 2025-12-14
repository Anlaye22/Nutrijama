import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import { useState } from "react";
import stLogin from "../styles/Login.module.css";
export default function Checkout({ goSuccess, goBack }) {
  const { subtotal, appliedCoupon, applyCoupon, finalTotal } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const handleApplyCoupon = () => {
    if (applyCoupon(couponInput.toUpperCase())) {
      alert("Cupón aplicado con éxito!");
    } else {
      alert("Cupón inválido o expirado.");
    }
  };
  return (
    <>
      <div className="app">
        <main className="screen">
          <div className="checkout">
            <button onClick={goBack} className={stLogin.btnBack}>
              ← Volver
            </button>
            <div
              className="payment-select-container"
              style={{ margin: "15px 0" }}
            >
              <label htmlFor="payment-method">
                Seleccionar Método de Pago:
              </label>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ padding: "8px", borderRadius: "5px", width: "100%" }}
              >
                <option value="cash">Efectivo</option>
                <option value="card">Tarjeta de Crédito/Débito</option>
              </select>
            </div>
            {paymentMethod === "card" && (
              <div className="card-pago">
                <p>Pago desde:</p>
                <strong>Mastercard - Daniel Jones (Simulado)</strong>
                <small>
                  Los datos reales de la tarjeta se ingresarían aquí.
                </small>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div
                className="cash-info"
                style={{
                  padding: "10px",
                  backgroundColor: "#e9f7ef",
                  border: "1px solid #d4edda",
                  borderRadius: "5px",
                }}
              >
                <p>
                  <strong>Pago en Efectivo</strong>
                </p>
                <small>
                  Pagarás ${subtotal.toFixed(2)} al momento de retirar tu
                  pedido.
                </small>
              </div>
            )}
            <div>
              <input
                type="text"
                className="inputField"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Código de Descuento"
              />
              <button className="apply-btn" onClick={handleApplyCoupon}>
                Aplicar
              </button>
            </div>
            <div className="summary">
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              {appliedCoupon && (
                <p>
                  Descuento ({appliedCoupon.code}): -$
                  {(subtotal - finalTotal).toFixed(2)}
                </p>
              )}
              <h3>Total: ${finalTotal.toFixed(2)}</h3>
            </div>

            <button className="pay-btn" onClick={goSuccess}>
              Pagar
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
