import React from "react";
import "./styles/globals.css";
import Home from "./componentes/Home";

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
function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
