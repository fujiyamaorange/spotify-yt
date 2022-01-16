import { NextPage } from "next";
import Image from "next/image";
import {
	getProviders,
	LiteralUnion,
	ClientSafeProvider,
	signIn,
} from "next-auth/react";
import { OAuthProviderType } from "next-auth/providers";

type Props = {
	providers: Record<
		LiteralUnion<OAuthProviderType, string>,
		ClientSafeProvider
	> | null;
};

export async function getServerSideProps() {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}

const Login: NextPage<Props> = (props) => {
	const { providers } = props;

	return (
		<div className="flex flex-col items-center justify-center w-full min-h-screen bg-black">
			<div className="mb-5">
				<Image
					src="https://links.papareact.com/9xl"
					alt=""
					height="208"
					width="208"
				/>
			</div>

			{providers &&
				Object.values(providers).map((provider) => {
					return (
						<div key={provider.name}>
							<button
								className="bg-[#18D860] text-white p-5 rounded-full"
								onClick={() => signIn(provider.id, { callbackUrl: "/" })}
							>
								Login with {provider.name}
							</button>
						</div>
					);
				})}
		</div>
	);
};

export default Login;
