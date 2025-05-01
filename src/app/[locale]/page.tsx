import MainPageView from "@/views/main-page/main-page-view";
import { redirect } from "@/i18n/routing";
import { getUserPreferences } from "@/lib/data/cookies";
import { fetchDepartmentData, fetchDepartmentsList } from "@/lib/data/fetcher";
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

	return <MainPageView rows={rows} />;
}
