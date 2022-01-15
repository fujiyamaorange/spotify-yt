import {
	HomeIcon,
	SearchIcon,
	LibraryIcon,
	PlusCircleIcon,
	HeartIcon,
	RssIcon,
} from "@heroicons/react/outline";

export const Sidebar = () => {
	return (
		<div className="p-5 text-sm text-gray-500 border-r border-gray-900">
			<div className="space-y-4">
				<button className="flex items-center space-x-2 transition duration-150 hover:text-white">
					<HomeIcon className="w-5 h-5" />
					<p>Home</p>
				</button>
				<button className="flex items-center space-x-2 transition duration-150 hover:text-white">
					<SearchIcon className="w-5 h-5" />
					<p>Search</p>
				</button>
				<button className="flex items-center space-x-2 transition duration-150 hover:text-white">
					<LibraryIcon className="w-5 h-5" />
					<p>Your Library</p>
				</button>

				<hr className="border-t-[0.1px] border-gray-900" />

				<button className="flex items-center space-x-2 transition duration-150 hover:text-white">
					<PlusCircleIcon className="w-5 h-5" />
					<p>Create Playlist</p>
				</button>
				<button className="flex items-center space-x-2 transition duration-150 hover:text-white">
					<HeartIcon className="w-5 h-5" />
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 transition duration-150 hover:text-white">
					<RssIcon className="w-5 h-5" />
					<p>Your episodes</p>
				</button>

				<hr className="border-t-[0.1px] border-gray-900" />

				{/* Playlist */}
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
			</div>
		</div>
	);
};
