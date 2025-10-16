import { useEffect, useState } from "react";
import "./BarraFiltro.css";

export default function BarraFiltro({ handleFilter }) {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((data) => setTypes(data.results));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    handleFilter(value); 
  };

  const handleClear = () => {
    setSelectedType("");
    handleFilter("");
  };

  return (
    <div className="filter-type">
      <label htmlFor="type">Filtrar por tipo:</label>
      <select id="type" value={selectedType} onChange={handleChange}>
        <option value="">Todos</option>
        {types.map((t) => (
          <option key={t.name} value={t.name}>
            {t.name.charAt(0).toUpperCase() + t.name.slice(1)}
          </option>
        ))}
      </select>
      {selectedType && (
        <button type="button" className="clear-btn" onClick={handleClear} title="Limpar filtro">
          Limpar
        </button>
      )}
    </div>
  );
}
