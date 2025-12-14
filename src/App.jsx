import React from "react";
import { useEffect } from "react";
import "./styles/globals.css";
import Home from "./componentes/Home";
import { getUsers, saveUsers } from "./context/usersStorage";

export const MOCK_USERS = [
  {
    email: "usuario@test.com",
    password: "123456",
    nombre: "Juan Pérez",
    edad: 35,
    enfermedad: "diabetico",
    alergias: "gluten",
  },
];
export const HISTORIAL = [
  {
    "usuario@test.com": [
      {
        id: "pedido-1678886400000",
        fecha: "2025-12-11T16:19:47.410Z",
        valorTotal: 25.5,
        items: [
          { id: 1, nombre: "Ensalada", qty: 2, price: 10.0 },
          { id: 3, nombre: "Jugo", qty: 1, price: 5.5 },
        ],
      },
      // ... más pedidos
    ],
  },
];
function App() {
  useEffect(() => {
    const users = getUsers();
    if (users.length === 0) {
      saveUsers(MOCK_USERS);
    }
  }, []);
  return (
    <>
      <Home />
    </>
  );
}

export default App;
