import { useTranslations } from "next-intl";

export default function WelcomeCTA() {
	const t = useTranslations("welcomePage.cta");

	return (
		<div className="w-fit h-fit">
			<h1 className="font-bold w-fit mx-auto text-4xl">{t("h1")}</h1>
			<p className="mt-4 mx-auto text-base w-fit font-light">{t("text")}</p>
		</div>
	);
}
