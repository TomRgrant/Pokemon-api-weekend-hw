import React from "react";

const InputBox = ({guessPokemon}) => {



    return(
        <>
        <form id='guess-form' onSubmit={guessPokemon}>
            <div className="guess-inputs">
                <input className="guess-input" id="pokemonGuess" type="text" placeholder="Who's That Pokemon!?"></input>
                <input className="guess-button" type="submit" value="Guess"></input>
            </div>
        </form>
        </>
    );

}

export default InputBox;