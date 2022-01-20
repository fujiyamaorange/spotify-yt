import { atom } from 'recoil';

export const playlistState = atom<SpotifyApi.SinglePlaylistResponse>({
	key: 'playlistState',
	default: {} as SpotifyApi.SinglePlaylistResponse,
});

export const playlistIdState = atom<string>({
	key: 'playlistIdState',
	default: '6DAVCNVqdZalt2gGskZ7cZ',
});
