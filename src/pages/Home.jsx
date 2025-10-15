import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName } from "../services/api";
import PokemonCard from "../components/PokemonCard/PokemonCard";
import BarraBusca from "../components/BarraBusca/BarraBusca"
import BarraFiltro from "../components/BarraFiltro/BarraFiltro";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    loadPokemons();
  }, [page]);

  async function loadPokemons() {
    const data = await getPokemons(20, page * 20);
    const results = await Promise.all(
      data.results.map(async (p) => await getPokemonByName(p.name))
    );
    setPokemons(results);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return loadPokemons();
    try {
      const data = await getPokemonByName(search.toLowerCase());
      setPokemons([data]);
    } catch {
      alert("Pokémon não encontrado!");
    }
  };

  return (
    <div className="container">
      <BarraBusca search={search} setSearch={setSearch} handleSearch={handleSearch} />
      <BarraFiltro setPokemons={setPokemons} setPage={setPage} />
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
