import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonByName } from "../services/api";

export default function DetalhesPokemon() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getPokemonByName(name);
      setPokemon(data);
    }
    fetchData();
  }, [name]);

  if (!pokemon) return <p>Carregando...</p>;

  return (
    <div className="p-4 text-center">
      <Link to="/">Voltar</Link>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p><strong>Altura:</strong> {pokemon.height}</p>
      <p><strong>Peso:</strong> {pokemon.weight}</p>
      <p><strong>Tipos:</strong> {pokemon.types.map(tipo => tipo.type.name).join(", ")}</p>
    </div>
  );
}
