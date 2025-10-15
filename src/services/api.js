import axios from "axios";

export const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

export const getPokemons = async (limit = 20, offset = 0) => {
  const res = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
  return res.data;
};

export const getPokemonByName = async (name) => {
  const res = await api.get(`pokemon/${name.toLowerCase()}`);
  return res.data;
};

export const getPokemonsByType = async (type) => {
  const res = await api.get(`type/${type}`);
  const pokemonList = res.data.pokemon.slice(0, 20).map(p => p.pokemon);

  const detailedPokemons = await Promise.all(
    pokemonList.map(async (p) => {
      const response = await api.get(p.url);
      return response.data;
    })
  );

  return detailedPokemons;
};
