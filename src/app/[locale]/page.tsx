import { redirect } from "@/i18n/routing";

export default async function Home() {
	redirect({ locale: "pl", href: "/welcome" });

	// return (
	// 	<main className="w-full h-full flex flex-col justify-center items-center">
	// 		<div className="w-fit h-fit">
	// 			<h1 className="font-bold mx-auto text-4xl">
	// 				Welcome to Mech Timetable
	// 			</h1>
	// 			<p className="mt-2 mx-auto text-base w-fit">
	// 				Select your department and laboratory group
	// 			</p>
	// 		</div>

	// 		{/* <Link href="/" locale="en">
	// 			En
	// 		</Link>
	// 		<Link href="/" locale="pl">
	// 			Pl
	// 		</Link> */}
	// 	</main>
	// );
}
