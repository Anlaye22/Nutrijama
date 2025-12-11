import ProductCard from "./ProductCard";

export default function ProductList({ products, goToDetail }) {
  return (
    <div className="product-list">
      <h2>Menú del día</h2>

      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onClick={() => goToDetail(p)}
        />
      ))}
    </div>
  );
}
