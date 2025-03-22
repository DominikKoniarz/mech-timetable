import type { Department } from "@/types/departments";
import type { TFunction } from "@/types/i18n";
import { z } from "zod";

export enum LAB_GROUPS {
	L01 = "L01",
	L02 = "L02",
	L03 = "L03",
	L04 = "L04",
	L05 = "L05",
	L06 = "L06",
}

export enum COMPUTER_LAB_GROUPS {
	K01 = "K01",
	K02 = "K02",
	K03 = "K03",
	K04 = "K04",
	K05 = "K05",
}

export enum PROJECT_GROUPS {
	P01 = "P01",
	P02 = "P02",
	P03 = "P03",
	P04 = "P04",
	P05 = "P05",
}

export const getWelcomeFormSchema = (
	t: TFunction<"welcomePage.form.validation">,
	departments: Department[]
) => {
	const departmentsNames = departments.map((department) => department.name);

	const welcomeFormSchema = z.object({
		departmentName: z.enum([departmentsNames[0], ...departmentsNames], {
			required_error: t("selectDepartment"),
			message: t("selectDepartment"),
		}),
		laboratoryGroup: z.nativeEnum(LAB_GROUPS, {
			invalid_type_error: t("selectLaboratoryGroup"),
			message: t("selectLaboratoryGroup"),
		}),
		computerLaboratoryGroup: z.nativeEnum(COMPUTER_LAB_GROUPS, {
			invalid_type_error: t("selectComputerLaboratoryGroup"),
			message: t("selectComputerLaboratoryGroup"),
		}),
		projectGroup: z.nativeEnum(PROJECT_GROUPS, {
			invalid_type_error: t("selectProjectGroup"),
			message: t("selectProjectGroup"),
		}),
	});

	return welcomeFormSchema;
};

export type WelcomeFormSchema = z.infer<
	ReturnType<typeof getWelcomeFormSchema>
>;
