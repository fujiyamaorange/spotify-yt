import { Sidebar } from "../components/Sidebar";

export default function Home() {
	return (
		<div className="">
			<h1>This is a DOPE spotify 2.0 build</h1>

			<main>
				<Sidebar />
				{/* Center */}

				<div>{/* Player */}</div>
			</main>
		</div>
	);
}
