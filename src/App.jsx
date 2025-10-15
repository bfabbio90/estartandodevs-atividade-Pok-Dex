import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DetalhesPokemon from "./pages/DetalhesPokemon";
import Header from "./components/Header/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<DetalhesPokemon />} />
      </Routes>
    </BrowserRouter>
  );
}
