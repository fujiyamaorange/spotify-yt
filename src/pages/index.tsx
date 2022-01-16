import { Sidebar } from "../components/Sidebar";
import { Center } from "@/components/Center";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	return {
		props: {
			session,
		},
	};
};

export default function Home() {
	return (
		<div className="h-screen overflow-hidden bg-black">
			<main className="flex">
				<Sidebar />
				<Center />

				<div>{/* Player */}</div>
			</main>
		</div>
	);
}
