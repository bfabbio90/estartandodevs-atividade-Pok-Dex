import "./BarraBusca.css";

export default function BarraBusca({ search, setSearch, handleSearch, clearSearch }) {
  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Buscar</button>
      {search && (
        <button
          type="button"
          className="clear-btn"
          onClick={clearSearch}
          title="Limpar busca"
        >
          Limpar
        </button>
      )}
    </form>
  );
}
