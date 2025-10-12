import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName  } from "../services/api";
import PokemonCard from "../components/PokemonCard/PokemonCard";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
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
    const data = await getPokemonByName(search);
    setPokemons([data]);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Buscar</button>
      </form>

      <div>
        {pokemons.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      <div>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
