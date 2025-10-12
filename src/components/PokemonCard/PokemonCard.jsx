import { Link } from "react-router-dom";

export default function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
      <h2 className="capitalize font-bold mt-2">{pokemon.name}</h2>
    </Link>
  );
}
