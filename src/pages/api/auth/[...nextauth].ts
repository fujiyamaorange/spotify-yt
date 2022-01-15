import NextAuth, { User, Profile } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

import spotifyApi, { LOGIN_URL } from "@/lib/spotify";
import { JWT } from "next-auth/jwt";

type InitialToken = {
	token: JWT;
	user?: User | undefined;
	account?: Account | undefined;
	profile?: Profile | undefined;
	isNewUser?: boolean | undefined;
	accessToken: string;
	refreshToken: string;
	username: string;
	accessTokenExpires: number;
};

const refreshAccessToken = async (
	token: JWT,
	accessToken: string,
	refreshToken: string
) => {
	try {
		spotifyApi.setAccessToken(accessToken);
		spotifyApi.setRefreshToken(refreshToken);

		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
		console.log("REFRESHED TOKEN IS", refreshedToken);

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? refreshToken,
		};
	} catch (e) {
		console.log(e);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
	//
};

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
	// https://next-auth.js.org/configuration/providers
	providers: [
		// EmailProvider({
		//   server: process.env.EMAIL_SERVER,
		//   from: process.env.EMAIL_FROM,
		// }),
		// AppleProvider({
		//   clientId: process.env.APPLE_ID,
		//   clientSecret: {
		//     appleId: process.env.APPLE_ID,
		//     teamId: process.env.APPLE_TEAM_ID,
		//     privateKey: process.env.APPLE_PRIVATE_KEY,
		//     keyId: process.env.APPLE_KEY_ID,
		//   },
		// }),
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? "",
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET ?? "",
			authorization: LOGIN_URL,
		}),
	],
	// Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
	// https://next-auth.js.org/configuration/databases
	//
	// Notes:
	// * You must install an appropriate node_module for your database
	// * The Email provider requires a database (OAuth providers do not)
	// database: process.env.DATABASE_URL,

	// The secret should be set to a reasonably long random string.
	// It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
	// a separate secret is defined explicitly for encrypting the JWT.
	secret: process.env.JWT_SECRET,

	session: {
		// Use JSON Web Tokens for session instead of database sessions.
		// This option can be used with or without a database for users/accounts.
		// Note: `strategy` should be set to 'jwt' if no database is used.
		strategy: "jwt",

		// Seconds - How long until an idle session expires and is no longer valid.
		// maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		// updateAge: 24 * 60 * 60, // 24 hours
	},

	// JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
	// option is set - or by default if no database is specified.
	// https://next-auth.js.org/configuration/options#jwt
	jwt: {
		// A secret to use for key generation (you should set this explicitly)
		secret: process.env.SECRET,
		// Set to true to use encryption (default: false)
		// encryption: true,
		// You can define your own encode/decode functions for signing and encryption
		// if you want to override the default behaviour.
		// encode: async ({ secret, token, maxAge }) => {},
		// decode: async ({ secret, token, maxAge }) => {},
	},

	// You can define custom pages to override the built-in ones. These will be regular Next.js pages
	// so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
	// The routes shown here are the default URLs that will be used when a custom
	// pages is not specified for that route.
	// https://next-auth.js.org/configuration/pages
	pages: {
		signIn: "/login",
		// signIn: '/auth/signin',  // Displays signin buttons
		// signOut: '/auth/signout', // Displays form with sign out button
		// error: '/auth/error', // Error code passed in query string as ?error=
		// verifyRequest: '/auth/verify-request', // Used for check email page
		// newUser: null // If set, new users will be directed here on first sign in
	},

	// Callbacks are asynchronous functions you can use to control what happens
	// when an action is performed.
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		async jwt({ token, user, account }) {
			//initial sign in
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at ?? 0 * 1000, // milliseconds
				} as InitialToken;
			}

			// TODO: return previous token if the access token has not expired yet
			// サンプルにあるのとは違う→token.accessTokenExpiresは上で設定したやつ
			if (account && account.expires_at) {
				if (Date.now() < account.expires_at * 1000) {
					console.log("EXISTING ACCESS TOKEN IS VALID");
					return token;
				}
			}

			// Access token has expired, so we need to refresh it...
			console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
			return await refreshAccessToken(
				token,
				account?.access_token ?? "",
				account?.refresh_token ?? ""
			);
		},

		async session({ session, user, token }) {
			// サンプルとは違う実装
			session.user = user;

			/**
			 * session.user.accessToken = token.accessToken
			 * session.user.refreshToken = token.refreshToken
			 * session.user.username = token.username
			 */

			return session;
		},
		/**
		 *  async signIn({ user, account, profile, email, credentials }) { return true },
		 *  async redirect({ url, baseUrl }) { return baseUrl },
		 *  async session({ session, token, user }) { return session },
		 *  async jwt({ token, user, account, profile, isNewUser }) { return token }
		 */
	},

	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {},
});
