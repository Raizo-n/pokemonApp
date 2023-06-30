import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  let [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  const searchPokemon = () => {
    const lowercasePokemonName = pokemonName.toLowerCase();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${lowercasePokemonName}`).then(
      (response) => {
        setPokemonInfo({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="App">
      <div className="title-section">
        <h1>Pokemon Stats</h1>
        <div className="search-box">
          <input type="text" onChange={(e) => setPokemonName(e.target.value)} />
          <button className="search" onClick={searchPokemon}>
            🔍
          </button>
        </div>
      </div>
      <div>
        {!pokemonChosen ? (
          <h1 className="error-message">Oops, we couldn't find a Pokemon...</h1>
        ) : (
          <div className="display">
            <h1>{pokemonInfo.name}</h1>
            <img src={pokemonInfo.img} />
            <h3>Species: {pokemonInfo.species}</h3>
            <h3>Type: {pokemonInfo.type}</h3>
            <h3>Attack: {pokemonInfo.attack}</h3>
            <h3>Defense: {pokemonInfo.defense}</h3>
            <h3>HP: {pokemonInfo.hp}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
