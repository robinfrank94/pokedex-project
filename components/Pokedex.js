import PokemonCard from "./PokemonCard";

const Pokedex = ({ pokemonList }) => {
	return (
		<div className="grid grid-cols-4 gap-4 w-1/2 min-h-screen mx-auto">
			{pokemonList.map((pokemon) => (
				<PokemonCard pokemon={pokemon} />
			))}
		</div>
	);
};

export default Pokedex;
