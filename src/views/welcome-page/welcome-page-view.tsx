import type { Department } from "@/types/departments";
import WelcomeCTA from "./components/welcome-cta";
import WelcomeForm from "./components/welcome-form";

type Props = {
	departments: Department[];
};

export default function WelcomePageView({ departments }: Props) {
	return (
		<main className="w-full h-full flex flex-col justify-center items-center">
			<WelcomeCTA />
			<WelcomeForm departments={departments} />
		</main>
	);
}
