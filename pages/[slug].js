import Image from "next/image";
import Link from "next/link";

const PokemonDetailPage = (pokemon) => {
	const {
		name,
		id,
		image,
		texts,
		genera,
		stats,
		height,
		weight,
		abilities,
		evolutionChain,
		previousName,
		previousId,
		nextName,
		nextId,
	} = pokemon;
	return (
		<div className="w-screen font-Raleway">
			<div className="max-w-4xl gap-20 p-20 mx-auto flex flex-col items-center bg-neutral-800">
				<div className="flex w-full justify-between text-white">
					<Link href={"/" + previousName}>
						<button className="border py-2 px-4 rounded-md">
							#{previousId} {previousName}
						</button>
					</Link>
					<Link href={"/" + nextName}>
						<button className="border py-2 px-4 rounded-md">
							{nextName} #{nextId}
						</button>
					</Link>
				</div>
				<h2 className="capitalize text-white text-5xl font-bold">
					{name} <span className="font-normal text-neutral-400">#{id}</span>
				</h2>
				<div className="flex flex-col text-white gap-20 w-full h-auto items-start">
					<div className="flex w-full gap-10 items-center">
						<div className="relative max-w-[300px] min-w-[300px] justify-center items-center flex">
							<Image objectFit="contain" src={image} width="400" height="400" />
						</div>
						<div className="flex flex-col justify-around gap-10">
							<p>{texts[0].flavor_text}</p>
							<div className="grid grid-cols-2 gap-6 bg-neutral-700 p-4 px-4 rounded-lg">
								<p className="w-1/2 flex flex-col">
									Height <span className="font-semibold">{height / 10} m</span>
								</p>
								<p className="w-1/2 flex flex-col">
									Weight <span className="font-semibold">{weight / 10} kg</span>
								</p>
								<p className="w-1/2 flex flex-col">
									Category{" "}
									<span className="capitalize font-semibold">
										{genera[7].genus.replace(" Pokémon", "")}
									</span>
								</p>
								<p className="w-1/2 flex flex-col border">
									Ability{" "}
									<span className="capitalize font-semibold">
										{abilities[0].ability.name}
									</span>
								</p>
							</div>
						</div>{" "}
					</div>
					<div className="flex w-full justify-between">
						{evolutionChain.map((pokemon) => (
							<Link href={"/" + pokemon.name}>
								<div className="flex flex-col gap-4 mx-auto justify-center items-center relative cursor-pointer">
									<div className="rounded-full border-8 border-neutral-500 p-4 bg-neutral-900">
										<Image
											src={pokemon.imageUrl}
											height="100"
											width="100"
											objectFit="contain"
										/>{" "}
									</div>
									<p className="capitalize font-semibold">
										{pokemon.name}{" "}
										<span className="font-normal text-neutral-400">
											#{pokemon.id}
										</span>
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
				<Link href="/">
					<button className="border py-2 px-4 rounded-md">Back</button>
				</Link>
			</div>
		</div>
	);
};

export default PokemonDetailPage;

export async function getServerSideProps(context) {
	const getImageUrl = (index) => {
		const paddedIndex = ("00" + index).slice(-3);
		const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
		return imageUrl;
	};

	const slug = context.params.slug;
	const deoxysSlug = slug === "deoxys" ? "deoxys-normal" : slug;
	const species = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${slug}`
	);
	const { name, id, flavor_text_entries, genera, evolution_chain } =
		await species.json();
	const standard = await fetch(
		`https://pokeapi.co/api/v2/pokemon/${deoxysSlug}`
	);
	const { stats, height, weight, abilities, types } = await standard.json();
	const image = getImageUrl(id);
	const evolutionResponse = await fetch(evolution_chain.url);
	const evolutions = await evolutionResponse.json();
	const previous = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id - 1}`
	);
	const { name: previousName, id: previousId } = await previous.json();
	const next = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id + 1}`
	);
	const { name: nextName, id: nextId } = await next.json();
	let evolutionChain = [];

	let firstPokemon = {
		name: evolutions.chain.species.name,
		id: evolutions.chain.species.url
			.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
			.replace("/", ""),
	};
	firstPokemon = { ...firstPokemon, imageUrl: getImageUrl(firstPokemon.id) };
	evolutionChain.push(firstPokemon);
	if (evolutions.chain.evolves_to[0]) {
		let secondPokemon = {
			name: evolutions.chain.evolves_to[0].species.name,
			id: evolutions.chain.evolves_to[0].species.url
				.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
				.replace("/", ""),
		};
		secondPokemon = {
			...secondPokemon,
			imageUrl: getImageUrl(secondPokemon.id),
		};
		evolutionChain.push(secondPokemon);
		if (evolutions.chain.evolves_to[0].evolves_to[0]) {
			let thirdPokemon = {
				name: evolutions.chain.evolves_to[0].evolves_to[0].species.name,
				id: evolutions.chain.evolves_to[0].evolves_to[0].species.url
					.replace("https://pokeapi.co/api/v2/pokemon-species/", "")
					.replace("/", ""),
			};
			thirdPokemon = {
				...thirdPokemon,
				imageUrl: getImageUrl(thirdPokemon.id),
			};
			evolutionChain.push(thirdPokemon);
		}
	}

	const pokemon = {
		name,
		id,
		types,
		image: getImageUrl(id),
		texts: flavor_text_entries,
		genera,
		stats,
		height,
		weight,
		abilities,
		evolutionChain,
		previousName,
		previousId,
		nextName,
		nextId,
	};

	return {
		props: pokemon,
	};
}

/* <div className="text-xl text-white">
			<div>Name:{name}</div>
			<div>Id: {id}</div>
			<div>Info: {texts[0].flavor_text}</div>
			<div>Category: {genera[7].genus.replace(" Pokémon", "")}</div>
			<div>Height: {height}kg</div>
			<div>Weight: {weight}kg</div>
			{stats.map((item) => (
				<div key={item.stat.name}>
					{item.stat.name} : {item.base_stat}
				</div>
			))}
			<div className="capitalize">Ability: {abilities[0].ability.name}</div>
			{evolutionChain.map((item, i) => (
				<div>
					Evolution {i + 1} : {item.name}
					<div className="flex w-32 h-32">
						<Image src={item.imageUrl} height="200" width="200" />
					</div>
				</div>
			))}
		</div> */
