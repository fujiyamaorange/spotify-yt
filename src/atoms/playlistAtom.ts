import { atom } from "recoil";

export const playlistState = atom<SpotifyApi.SinglePlaylistResponse | null>({
	key: "playlistState",
	default: null,
});

export const playlistIdState = atom<string>({
	key: "playlistIdState",
	default: "6DAVCNVqdZalt2gGskZ7cZ",
});
