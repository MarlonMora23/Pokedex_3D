import { useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemons, getPokemonByName } from "../api/pokemonApi";
import Footer from "../components/Footer";
import "../App.css";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const limit = 10;

  useEffect(() => {
    async function loadPokemons() {
      setLoading(true);
      const offset = page * limit;
      const data = await getPokemons(limit, offset);

      setHasNext(Boolean(data.next));
      setHasPrev(Boolean(data.previous));

      // Get detailed information for each Pokemon
      const detailedData = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await getPokemonByName(pokemon.name);
          return {
            id: details.id,
            name: details.name,
            home_image: details.sprites.front_default,
            details_image: details.sprites.other.home.front_default,
            height: details.height,
            weight: details.weight,
            types: details.types.map((t) => t.type.name),
          };
        })
      );

      setPokemons(detailedData);
      setLoading(false);
    }

    loadPokemons();
  }, [page]);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(0, p - 1));

  if (loading) return <p className="loading">Cargando Pokémons...</p>;

  return (
    <>
      {/* Header / Hero Section */}
      <header className="pokedex-header">
        <h1 className="pokedex-title">Pokédex 3D</h1>
        <p className="pokedex-subtitle">
          Explore the Pokémon universe with interactive 3D emblems.
        </p>
      </header>

      {/* Pokemon Grid Container */}
      <div className="pokemon-container">
        <div className="pokemon-list">
          {pokemons.map((p) => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={!hasPrev}
            className="pagination-button"
          >
            <span>←</span>
            <span>Previous</span>
          </button>

          <div className="pagination-info">Page {page + 1}</div>

          <button
            onClick={nextPage}
            disabled={!hasNext}
            className="pagination-button"
          >
            <span>Next</span>
            <span>→</span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
