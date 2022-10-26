const Stats = ({ stats }) => {
	const generateHeight = (stat) => {
		let statValue = (stat / 255) * 100;
		console.log(statValue);
		switch (true) {
			case statValue > 0 && statValue < 7:
				return "h-[7.15%]";
				break;
			case statValue > 7 && statValue < 14:
				return "h-[14.3%]";
				break;
			case statValue > 14 && statValue < 21:
				return "h-[21.45%]";
			case statValue > 21 && statValue < 28:
				return "h-[26%]";
				break;
			case statValue > 28 && statValue < 35:
				return "h-[35.75%]";
				break;
			case statValue > 35 && statValue < 43:
				return "h-[43%]";
				break;
			case statValue > 43 && statValue < 50:
				return "h-[50%]";
				break;
			case statValue > 50 && statValue < 57:
				return "h-[57%]";
				break;
			case statValue > 57 && statValue < 64:
				return "h-[64%]";
				break;
			case statValue > 64 && statValue < 72:
				return "h-[72%]";
				break;
			case statValue > 72 && statValue < 79:
				return "h-[79%]";
				break;
			case statValue > 79 && statValue < 86:
				return "h-[86%]";
				break;
			case statValue > 86 && statValue < 93:
				return "h-[93%]";
				break;
			case statValue > 93 && statValue < 100:
				return "h-[100%]";
				break;
			default:
				return "h-[100%]";
		}
	};
	const array = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
	let statsList = [];
	stats.map((item) =>
		statsList.push({
			stat: item.stat.name,
			value: item.base_stat,
			height: generateHeight(item.base_stat),
		})
	);
	return (
		<div className="relative flex justify-between w-full bg-neutral-600 rounded-xl px-8 py-6 h-auto">
			{statsList.map((stat) => (
				<div className="flex flex-col items-center">
					<ul className="flex flex-col relative w-24">
						{array.map((item, i) => (
							<li
								key={Math.random()}
								className="h-4 relative bg-opacity-0 z-10 border-neutral-600 border-t-4"
							></li>
						))}
						<div
							className={`${stat.height} absolute bg-blue-400 bottom-0 w-full`}
						/>
					</ul>
					<p className="capitalize">{stat.stat}</p>
				</div>
			))}
		</div>
	);
};

export default Stats;
