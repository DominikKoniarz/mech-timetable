import { redirect } from "@/i18n/routing";
import { getUserPreferences } from "@/lib/data/cookies";
import { fetchDepartmentData, fetchDepartmentsList } from "@/lib/data/fetcher";
import { checkCurrentWeekParity } from "@/lib/data/helpers";
import { parseDepartmentsList, parseRows } from "@/lib/data/parser";
import { getLocale } from "next-intl/server";

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

	const departmentData = await fetchDepartmentData(foundDepartment.url);

	const rows = parseRows(departmentData, preferences);

	const dniTygodnia = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"];

	const parity = checkCurrentWeekParity();

	return (
		<div className="overflow-x-auto">
			<div className="inline-block min-w-full align-middle">
				<div className="overflow-hidden">
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
							{rows.map((row, index) => (
								<tr key={index}>
									<td className="w-32 px-4 py-2 text-sm text-foreground">
										{row.timeEntry.start} - {row.timeEntry.end}
									</td>
									{row.availableClasses.map((classEntry, dayIndex) => {
										const foundClassEntry = classEntry.find(
											(classItem) =>
												classItem.parity === parity || classItem.parity === null
										);

										return (
											<td key={dayIndex} className="px-4 py-2">
												<div className="h-24 bg-card rounded-lg">
													{foundClassEntry &&
														`${foundClassEntry.subject} ${foundClassEntry.room}`}
													<div>{foundClassEntry?.classType}</div>
												</div>
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
