import Head from "next/head";
import Image from "next/image";
import Pokedex from "../components/Pokedex";
import styles from "../styles/Home.module.css";

export default function Home({ array }) {
	return (
		<>
			<Pokedex pokemonList={array} />
		</>
	);
}

export async function getStaticProps() {
	let array = [];
	for (let i = 0; i < 12; i++) {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
		const data = await response.json();
		const { name, id } = data;
		const types = [data.types[0].type.name];
		data.types[1] && types.push(data.types[1].type.name);
		const paddedIndex = ("00" + (i + 1)).slice(-3);
		const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
		array.push({ name, index: id, types, imageUrl, paddedIndex });
	}
	return {
		props: { array },
	};
}
