import { Link } from "react-router-dom";
import "./PokemonCard.css";

export default function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
    </Link>
  );
}
