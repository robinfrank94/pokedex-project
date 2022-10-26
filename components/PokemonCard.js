import Image from "next/image";
import Link from "next/link";

const PokemonCard = ({ pokemon }) => {
	const { name, index, imageUrl, types, paddedIndex } = pokemon;
	const colors = {
		grass: "bg-grass",
		fire: "bg-fire",
		water: "bg-water",
		normal: "bg-normal",
		flying: "bg-flying ",
		bug: "bg-bug",
		poison: "bg-poison",
		electric: "bg-electric",
		ground: "bg-ground",
		fighting: "bg-fighting",
		psychic: "bg-psychic",
		rock: "bg-rock",
		ice: "bg-ice",
		ghost: "bg-ghost",
		dragon: "bg-dragon",
		dark: "bg-dark",
		steel: "bg-steel",
		fairy: "bg-fairy",
	};

	console.log(types);
	return (
		<Link href={"/" + name}>
			<div className="relative bg-neutral-600 cursor-pointer h-72 text-white font-Raleway rounded-lg flex flex-col shadow-lg items-center justify-between py-5">
				<h3 className="capitalize font-semibold text-3xl">{name}</h3>
				<h5 className="font-light text-neutral-200">
					Nr. <span className="font-normal">{paddedIndex}</span>
				</h5>
				<div className="w-full h-1/2 relative">
					<Image src={imageUrl} layout="fill" objectFit="contain" />
				</div>
				<div className="flex relative justify-center space-x-2">
					{types.map((type) => {
						const color = colors[type];
						return (
							<p
								className={`capitalize font-semibold relative min-w-[5rem] p-1 text-center rounded-md ${color}`}
							>
								{type}
							</p>
						);
					})}
				</div>
			</div>
		</Link>
	);
};

export default PokemonCard;
