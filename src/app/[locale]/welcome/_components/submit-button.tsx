import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function SubmitButton() {
	const t = useTranslations("welcomePage.form");

	return (
		<Button type="submit" className="cursor-pointer mt-6 block mx-auto">
			{t("search")}
		</Button>
	);
}
