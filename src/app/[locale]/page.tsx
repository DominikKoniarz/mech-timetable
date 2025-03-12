import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";
import { Link } from "@/i18n/routing";

export default async function Home() {
	const test = await fetchDepartmentsList();

	console.log(parseDepartmentsList(test));

	return (
		<main className="w-full h-full bg-background text-foreground">
			<h1 className="font-bold text-4xl">Welcome to Mech Timetable</h1>
			<p>foo bar</p>
			<ul>
				{parseDepartmentsList(test).map((department) => (
					<li key={department.url}>
						Link: {department.url}
						<br />
						Name: {department.name}
					</li>
				))}
			</ul>
			<Link href="/" locale="en">
				En
			</Link>
			<Link href="/" locale="pl">
				Pl
			</Link>
		</main>
	);
}
