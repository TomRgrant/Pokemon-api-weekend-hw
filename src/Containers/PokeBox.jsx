import React, { useState, useEffect } from "react";
import PokeSpriteBox from "../Components/PokeSpriteBox";


const PokeBox = () => {

    const [pokemon, setPokemon] = useState([]);
    const [pokemonInfo, setPokemonInfo] = useState();
    const [selectedPokemon, setSelectedPokemon] = useState({name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'});
    const [correctGuess, setCorrectGuess] = useState(false)

    async function fetchPokemon(url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1300') {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(data.results);
    }

    async function fetchFirstSprite(url = 'https://pokeapi.co/api/v2/pokemon/1/') {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonInfo(data);
    }

    async function getPokemonInfo(url) {
        const res = await fetch(url);
        const data = await res.json();
        setPokemonInfo(data);
        console.log(data);
        setSelectedPokemon(data);
        console.log(selectedPokemon);
    }

    useEffect(() => {
        fetchPokemon();
        fetchFirstSprite();
    }, []);

    if (!pokemon.length) return 'loading...'

    if (!pokemonInfo) return 'Loading...'

    const selectRandomPokemon = (pokemon) => {
        let result = (pokemon[Math.floor(Math.random()*pokemon.length)]);
        setSelectedPokemon(result);
        setCorrectGuess(false);
        document.getElementById("guess-form").reset();
    }

    const guessPokemon = (event, selectedPokemon) => {
        event.preventDefault();
      if (event.target.pokemonGuess.value == selectedPokemon.name) {
            setCorrectGuess(true)
            document.getElementById("guess-form").reset();
        return console.log("Woooooooooooo");
      }
      document.getElementById("guess-form").reset();
    }

    return (
        <>
        <h1 className="title">Whos That Pokemon!?</h1>
        <PokeSpriteBox getPokemonInfo={getPokemonInfo}
        selectRandomPokemon={selectRandomPokemon}
        pokemon={pokemon}
        selectedPokemon={selectedPokemon}
        guessPokemon={guessPokemon}
        correctGuess={correctGuess}
        pokemonInfo={pokemonInfo}/>
        <br></br>
        <div className="box-buttons">
            <button className="next-pokemon" onClick={() => {selectRandomPokemon(pokemon)}}>Next Pokemon</button>
            <button className="reveal" onClick={() => {setCorrectGuess(true)}}>Reveal Pokemon</button>
        </div>
        <h3 className="explainer">Please seperate words with " - " example houndoom-mega</h3>
        </>
    );
    }

export default PokeBox;
