import { fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList } from "@/lib/data/parser";
import WelcomeCTA from "./_components/welcome-cta";
import WelcomeForm from "./_components/welcome-form";

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

	return (
		<main className="w-full h-full flex flex-col justify-center items-center">
			<WelcomeCTA />
			<WelcomeForm departments={departments} />
		</main>
	);
}
