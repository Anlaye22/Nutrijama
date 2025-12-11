import { useState } from "react";
import ProductList from "./componentes/ProductList";
import ProductDetail from "./componentes/ProductDetail";
import Cart from "./componentes/Cart";
import Checkout from "./componentes/Checkout";
import OrderSuccess from "./componentes/OrderSuccess";
import "./index.css";

const products = [
  {
    id: 1,
    name: "Tazón de pollo al curry",
    price: 2.99,
    image:
      "https://images.pexels.com/photos/4106483/pexels-photo-4106483.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Plato alto en proteína con pollo, arroz integral y vegetales. Ideal para un almuerzo balanceado.",
  },
  {
    id: 2,
    name: "Burritos de frijoles con queso",
    price: 3.5,
    image:
      "https://images.pexels.com/photos/4958642/pexels-photo-4958642.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Burritos vegetarianos con frijoles, queso y vegetales frescos. Fuente de fibra y energía.",
  },
  {
    id: 3,
    name: "Torta de frijoles y aguacate",
    price: 2.75,
    image:
      "https://images.pexels.com/photos/3731474/pexels-photo-3731474.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Sánduche con frijoles, aguacate y pan integral. Perfecto para media mañana.",
  },
  {
    id: 4,
    name: "Bebida kéfir",
    price: 0.99,
    image:
      "https://images.pexels.com/photos/5946082/pexels-photo-5946082.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Bebida fermentada con probióticos, ideal para acompañar tu bowl y cuidar tu microbiota.",
  },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeProduct, setActiveProduct] = useState(null);

  return (
    <div className="app">
      <header className="top-bar">
        {screen !== "home" && (
          <button
            className="back-btn"
            onClick={() =>
              screen === "detail" ? setScreen("home") : setScreen("home")
            }
          >
            ←
          </button>
        )}
        <h1 className="top-title">
          {screen === "home" && "Menú del día"}
          {screen === "detail" && "Detalle"}
          {screen === "cart" && "Carrito"}
          {screen === "checkout" && "Verificar"}
          {screen === "success" && "Orden"}
        </h1>
      </header>

      <main className="screen">
        {screen === "home" && (
          <>
            <ProductList
              products={products}
              goToDetail={(p) => {
                setActiveProduct(p);
                setScreen("detail");
              }}
            />
          </>
        )}

        {screen === "detail" && activeProduct && (
          <ProductDetail
            product={activeProduct}
            goBack={() => setScreen("home")}
          />
        )}

        {screen === "cart" && (
          <Cart
            goBack={() => setScreen("home")}
            goCheckout={() => setScreen("checkout")}
          />
        )}

        {screen === "checkout" && (
          <Checkout
            goBack={() => setScreen("cart")}
            goSuccess={() => setScreen("success")}
          />
        )}

        {screen === "success" && (
          <OrderSuccess goHome={() => setScreen("home")} />
        )}
      </main>

      {screen === "home" && (
        <button className="fab-cart" onClick={() => setScreen("cart")}>
          🛒
        </button>
      )}
    </div>
  );
}
