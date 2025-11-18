import PokemonScene from "../utilities/Utilities";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemon.name}`);
  };

  const mainType = pokemon.types ? pokemon.types[0] : "normal";

  return (
    <div
      onClick={handleClick}
      className="pokemon-card"
      data-type={mainType}
    >
      <div className="pokemon-card-inner">
        {/* Elevated pokemon image */}
        <div className="pokemon-image-wrapper">
          <img
            src={pokemon.home_image}
            alt={pokemon.name}
            className="pokemon-image"
          />
        </div>

        {/* Name of the Pokémon */}
        <h2 className="pokemon-name">{pokemon.name}</h2>

        {/* Type of the Pokémon */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <span className="pokemon-type-badge" data-type={mainType}>
            {mainType}
          </span>
        </div>

        {/* 3D symbol */}
        <div className="pokemon-3d-symbol">
          <PokemonScene type={mainType} />
        </div>
      </div>
    </div>
  );
}