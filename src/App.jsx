import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetalhesPokemon from "./pages/DetalhesPokemon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<DetalhesPokemon />} />
      </Routes>
    </BrowserRouter>
  );
}
