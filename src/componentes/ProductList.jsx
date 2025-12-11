import React from "react";
import "../styles/Cart.css";
import stLogin from "../styles/Login.module.css";
import ProductCard from "./ProductCard";
export default function ProductList({ products, goToDetail, handleBack }) {
  return (
    <>
      <div className="app">
        <main className="screen">
          <div className="product-list">
            <h2>Menú del día</h2>
            <div className={stLogin.formWrapper.register}>
              <button className={stLogin.btnBack} onClick={handleBack}>
                ← Volver
              </button>
            </div>
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => goToDetail(p)}
              />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
