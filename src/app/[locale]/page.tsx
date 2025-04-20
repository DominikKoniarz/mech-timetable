import { redirect } from "@/i18n/routing";
import { getUserPreferences } from "@/lib/data/cookies";
import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";
import { getLocale } from "next-intl/server";
// import * as cheerio from "cheerio";

export default async function Home() {
	const preferences = await getUserPreferences();

	if (!preferences)
		return redirect({ href: "/welcome", locale: await getLocale() });

	const departmentsHtml = await fetchDepartmentsList();
	const departments = parseDepartmentsList(departmentsHtml);

	const foundDepartment = departments.find(
		(department) => department.name === preferences.departmentName
	);

	if (!foundDepartment) {
		return redirect({ href: "/welcome", locale: await getLocale() });
	}

	// const departmentData = await fetchDepartmentData(foundDepartment.url);
	// const $ = cheerio.load(departmentData);

	// console.log($.toString());
	// return (
	// 	<div>
	// 		<pre>{$.html()}</pre>
	// 	</div>
	// );

	// now fetch by preferences and filter out the data
	// return JSON.stringify(preferences);

	const godziny = [
		"00:00 - 00:45",
		"00:45 - 01:30",
		"01:30 - 02:15",
		"02:15 - 03:00",
		"03:00 - 03:45",
		"03:45 - 04:30",
		"04:30 - 05:15",
		"05:15 - 06:00",
		"06:00 - 06:45",
		"06:45 - 07:30",
		"07:30 - 08:15",
		"08:15 - 09:00",
		"09:00 - 09:45",
		"09:45 - 10:30",
		"10:30 - 11:15",
		"11:15 - 12:00",
		"12:00 - 12:45",
		"12:45 - 13:30",
		"13:30 - 14:15",
		"14:15 - 15:00",
		"15:00 - 15:45",
		"15:45 - 16:30",
		"16:30 - 17:15",
		"17:15 - 18:00",
		"18:00 - 18:45",
		"18:45 - 19:30",
		"19:30 - 20:15",
		"20:15 - 21:00",
		"21:00 - 21:45",
		"21:45 - 22:30",
		"22:30 - 23:15",
		"23:15 - 00:00",
	];

	const dniTygodnia = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

	return (
		<div className="overflow-x-auto">
			<div className="inline-block min-w-full align-middle">
				<div className="overflow-hidden border border-border shadow sm:rounded-lg">
					<table className="min-w-full">
						<thead className="bg-background">
							<tr>
								<th
									scope="col"
									className="w-32 px-4 py-2 text-xs font-medium text-foreground uppercase tracking-wider"
								>
									Godzina
								</th>
								{dniTygodnia.map((dzien, index) => (
									<th
										key={index}
										scope="col"
										className="px-4 py-2 text-xs font-medium text-foreground uppercase tracking-wider"
									>
										{dzien}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-background divide-y divide-border">
							{godziny.map((godzina, index) => (
								<tr key={index}>
									<td className="w-32 px-4 py-2 text-sm text-foreground">
										{godzina}
									</td>
									{dniTygodnia.map((_, dayIndex) => (
										<td key={dayIndex} className="px-4 py-2">
											<div className="h-24 bg-card rounded-lg"></div>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
