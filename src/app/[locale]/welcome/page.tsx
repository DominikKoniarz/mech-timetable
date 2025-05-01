import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";
import WelcomePageView from "@/views/welcome-page/welcome-page-view";

// export const revalidate = 60 * 15; // 15 minutes - getting some errors here

// export const config = {
// 	revalidate: 60 * 15, // 15 minutes
// };

// export const generateStaticParams = () => {
// 	return [];
// };

export default async function Welcome() {
	const departmentsHtml = await fetchDepartmentsList();
	const departments = parseDepartmentsList(departmentsHtml);

	// add cookie checks here

	return <WelcomePageView departments={departments} />;
}
