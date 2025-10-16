import { useEffect, useState } from "react";
import { getPokemonsByType } from "../../services/api";
import "./BarraFiltro.css";

export default function BarraFiltro({ setPokemons, setPage }) {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results));
  }, []);

  const handleFilter = async (e) => {
    const type = e.target.value;
    setSelectedType(type);

    if (!type) {
      setPage(0);
      return;
    }

    const pokemonsByType = await getPokemonsByType(type);
    setPokemons(pokemonsByType);
  };

  return (
    <div className="filter-type">
      <label htmlFor="type">Filtrar por tipo:</label>
      <select id="type" value={selectedType} onChange={handleFilter}>
        <option value="">Todos</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
