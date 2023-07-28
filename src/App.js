import React from "react";
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState({});

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemonInfo({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stats,
          attack: response.data.stats[1].base_stats,
          defense: response.data.stats[2].base_stats,
          type: response.data.types[0].type.name
        });
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
    </div>
  );
}

export default App;
