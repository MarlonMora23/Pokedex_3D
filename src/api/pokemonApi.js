const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export async function getPokemons(limit = 20, offset = 0) {
  try {
    const response = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
    if (!response.ok) throw new Error("Error fetching Pokémon list");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPokemonByName(name) {
  try {
    const response = await fetch(`${BASE_URL}${name}`);
    if (!response.ok) throw new Error("Error fetching Pokémon data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
