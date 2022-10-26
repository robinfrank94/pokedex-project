const Navbar = () => {
	return (
		<div className="relative my-10 bg-neutral-800 z-10 top-0 w-full py-10 justify-center flex text-white font-Raleway">
			<div className="flex flex-col max-w-[25rem] gap-2">
				<label className="text-2xl font-medium">Name or Number</label>
				<input
					placeholder=""
					className="rounded-sm focus:text-neutral-900 focus:outline-none text-2xl font-medium border-2 h-10 w-72 border-neutral-400"
				></input>
				<p>
					Use the Advanced Search to explore Pokemon by name, type, index,
					ability and more.
				</p>
			</div>
		</div>
	);
};

export default Navbar;
