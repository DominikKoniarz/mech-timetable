import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
	isPending: boolean;
};

export default function SubmitButton({ isPending }: Props) {
	const t = useTranslations("welcomePage.form");

	return (
		<Button
			type="submit"
			className="cursor-pointer group relative mt-6 block mx-auto"
			disabled={isPending}
		>
			<span className="group-disabled:opacity-0 opacity-100">
				{t("search")}
			</span>
			<LoaderCircle className="animate-spin size-5 group-disabled:opacity-100 opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
		</Button>
	);
}
