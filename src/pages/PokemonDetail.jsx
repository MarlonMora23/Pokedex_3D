import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonByName } from "../api/pokemonApi";
import PokemonScene from "../utilities/Utilities";
import Footer from "../components/Footer";
import "../App.css";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function loadPokemon() {
      const data = await getPokemonByName(name);
      setPokemon(data);
    }
    loadPokemon();
  }, [name]);

  if (!pokemon) {
    return (
      <div className="detail-loading">
        <div className="detail-loading-spinner"></div>
        <p className="detail-loading-text">Cargando Pokémon data...</p>
      </div>
    );
  }

  // Obtener el tipo principal
  const mainType = pokemon.types[0].type.name;

  // Función para determinar el nivel de estadística
  const getStatLevel = (value) => {
    if (value >= 120) return "very-high";
    if (value >= 80) return "high";
    if (value >= 50) return "medium";
    return "low";
  };

  // Función para obtener el porcentaje de la barra (máximo 255)
  const getStatPercentage = (value) => {
    return Math.min((value / 200) * 100, 100);
  };

  // Mapeo de nombres de estadísticas a nombres más legibles
  const statNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "Sp. Atk",
    "special-defense": "Sp. Def",
    speed: "Speed",
  };

  return (
    <div className="detail-container">
      <div className="pokemon-detail">
        <Link to="/" className="detail-back-button">
          <span>←</span>
          <span>Back to Pokédex</span>
        </Link>

        <div className="detail-content">
          {/* Left Column - Image and Basic Info */}
          <div className="detail-left-wrapper">
            <div className="detail-image-section" data-type={mainType}>
              <div className="detail-image-wrapper">
                <img
                  src={
                    pokemon.sprites.other.home.front_default ||
                    pokemon.sprites.front_default
                  }
                  alt={pokemon.name}
                  className="detail-pokemon-image"
                />
              </div>

              <h1 className="detail-pokemon-name">{pokemon.name}</h1>

              <div className="detail-types-container">
                {pokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className="detail-type-badge pokemon-type-badge"
                    data-type={t.type.name}
                  >
                    {t.type.name}
                  </span>
                ))}
              </div>
            </div>
            {/* Escena 3D con símbolo del tipo */}
            <div className="pokemon-3d-symbol-details">
              <PokemonScene type={mainType} />
            </div>
          </div>

          {/* Right Column - Detailed Stats */}
          <div className="detail-info-section">
            {/* Physical Stats */}
            <div className="detail-info-card">
              <h3 className="detail-info-title">Physical Stats</h3>
              <div className="detail-physical-stats">
                <div className="detail-stat-item">
                  <div className="detail-stat-label">Height</div>
                  <div className="detail-stat-value">
                    {(pokemon.height / 10).toFixed(1)}
                    <span className="detail-stat-unit">m</span>
                  </div>
                </div>
                <div className="detail-stat-item">
                  <div className="detail-stat-label">Weight</div>
                  <div className="detail-stat-value">
                    {(pokemon.weight / 10).toFixed(1)}
                    <span className="detail-stat-unit">kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Battle Stats */}
            <div className="detail-info-card">
              <h3 className="detail-info-title">Base Stats</h3>
              <div className="detail-battle-stats">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="detail-stat-bar-wrapper">
                    <div className="detail-stat-bar-header">
                      <span className="detail-stat-bar-label">
                        {statNames[stat.stat.name] || stat.stat.name}
                      </span>
                      <span className="detail-stat-bar-value">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="detail-stat-bar-bg">
                      <div
                        className="detail-stat-bar-fill"
                        data-value={getStatLevel(stat.base_stat)}
                        style={{
                          width: `${getStatPercentage(stat.base_stat)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="detail-info-card">
              <h3 className="detail-info-title">Abilities</h3>
              <div className="detail-abilities-grid">
                {pokemon.abilities.map((ability) => (
                  <div
                    key={ability.ability.name}
                    className="detail-ability-item"
                  >
                    <div className="detail-ability-name">
                      {ability.ability.name.replace("-", " ")}
                    </div>
                    {ability.is_hidden && (
                      <div className="detail-ability-hidden">Hidden</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
