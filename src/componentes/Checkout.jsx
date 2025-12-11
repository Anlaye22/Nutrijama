import { useCart } from "../context/CartContext";

export default function Checkout({ goSuccess, goBack }) {
  const { subtotal } = useCart();

  return (
    <div className="checkout">
      <button onClick={goBack}>← Back</button>
      <h2>Verificar</h2>

      <div className="card-pago">
        <p>Payment from</p>
        <strong>Mastercard - Daniel Jones</strong>
      </div>

      <div className="summary">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Coupon: $0</p>
        <h3>Total: ${subtotal.toFixed(2)}</h3>
      </div>

      <button className="pay-btn" onClick={goSuccess}>
        Pagar
      </button>
    </div>
  );
}
