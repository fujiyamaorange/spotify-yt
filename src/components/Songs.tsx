import { useRecoilValue } from "recoil";
import { playlistState } from "@/atoms/playlistAtom";

export const Songs: React.VFC = () => {
	const playlist = useRecoilValue(playlistState);

	return (
		<div className="text-white">
			{Object.keys(playlist).length > 0 &&
				playlist.tracks.items.map((track) => (
					<div key={track.track.id}>{track.track.name}</div>
				))}
		</div>
	);
};
