import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName, getPokemonsByType } from "../services/api";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import BarraBusca from "../components/BarraBusca/BarraBusca";
import BarraFiltro from "../components/BarraFiltro/BarraFiltro";
import "./Home.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(""); 
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!search && !type) {
      loadPokemons();
    }
  }, [page]);

  async function loadPokemons() {
    try {
      const data = await getPokemons(20, page * 20);
      const results = await Promise.all(
        data.results.map(async (p) => await getPokemonByName(p.name))
      );
      setPokemons(results);
    } catch (err) {
      console.error("Erro ao carregar pokémons:", err);
    }
  }

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!search) return loadPokemons();

    try {
      const data = await getPokemons(200); 
      const results = await Promise.all(
        data.results
          .filter((p) => p.name.startsWith(search.toLowerCase()))
          .map(async (p) => await getPokemonByName(p.name))
      );

      if (results.length === 0) {
        alert("Nenhum Pokémon encontrado!");
      }

      setPokemons(results);
      setType(""); 
      setPage(0);
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  };

  const clearSearch = async () => {
    setSearch("");
    setPage(0);
    setType("");
    await loadPokemons();
  };

  const handleFilterByType = async (selectedType) => {
  setType(selectedType);
  setSearch("");
  setPage(0);

  if (!selectedType) {
    await loadPokemons();
    return;
  }

  try {
    const results = await getPokemonsByType(selectedType);
    setPokemons(results);
  } catch (err) {
    console.error("Erro ao filtrar por tipo:", err);
  }
};

  return (
    <div className="container">
      <div className="top-bar">
        <BarraBusca
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
        />
        <BarraFiltro handleFilter={handleFilterByType} />
      </div>

      <div className="grid">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <div className="paginacao">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button onClick={() => setPage((prev) => prev + 1)}>Próxima</button>
      </div>
    </div>
  );
}
