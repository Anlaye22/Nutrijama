import { useCart } from "../context/CartContext";

export default function ProductDetail({ product, goBack }) {
  const { addToCart } = useCart();

  return (
    <div className="detail">
      <button onClick={goBack}>← Back</button>

      <img src={product.image} alt={product.name} className="detail-img" />

      <h2>{product.name}</h2>

      <p className="desc">{product.description}</p>

      <p className="price">${product.price.toFixed(2)}</p>

      <button className="add-cart" onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
}
