import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

import spotifyApi from "@/lib/spotify";
import { TOKEN } from "@/pages/api/auth/[...nextauth]";

export const useSpotify = () => {
	const { data: session, status } = useSession();
	const localUser = session?.user as TOKEN;

	useEffect(() => {
		if (session) {
			if (session.error === "RefreshAccessTokenError") {
				signIn();
			}

			spotifyApi.setAccessToken(localUser.accessToken);
		}
	}, [session]);

	return spotifyApi;
};
