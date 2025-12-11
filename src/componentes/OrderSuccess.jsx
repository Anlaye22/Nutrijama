import QRCode from "react-qr-code";

export default function OrderSuccess({ goHome }) {
  return (
    <div className="success">
      <button onClick={goHome}>✕</button>

      <h2>Ok! Tu orden ha sido tomada.</h2>

      <QRCode value="ORDEN-12345" size={180} />

      <p>Retira tu orden en el Foodtruck mostrando tu código QR</p>
    </div>
  );
}
