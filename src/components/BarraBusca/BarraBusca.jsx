export default function BarraBusca({ search, setSearch, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
