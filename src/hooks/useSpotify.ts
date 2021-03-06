import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

import { TOKEN } from '@/pages/api/auth/[...nextauth]';
import spotifyApi from '@/lib/spotify';

export const useSpotify = () => {
	const { data: session } = useSession();
	const localUser = session?.user as TOKEN;

	useEffect(() => {
		if (session) {
			if (session.error === 'RefreshAccessTokenError') {
				signIn();
			}

			spotifyApi.setAccessToken(localUser.accessToken);
		}
	}, [localUser.accessToken, session]);

	return spotifyApi;
};
