const DEPARTMENTS_LIST_URL =
	"https://podzial.mech.pk.edu.pl/stacjonarne/html/lista.html";

const DEPARTMENT_DATA_BASE_URL =
	"https://podzial.mech.pk.edu.pl/stacjonarne/html/";

const getDepartmentDataUrl = (departmentLinkPart: string) =>
	`${DEPARTMENT_DATA_BASE_URL}${departmentLinkPart}`;

export const fetchDepartmentsList = async (): Promise<string> => {
	const response = await fetch(DEPARTMENTS_LIST_URL, {
		next: {
			revalidate: 60 * 15, // 15 minutes
			// tags: ["departments"],
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch departments list");
	}

	return response.text();
};

export const fetchDepartmentData = async (
	departmentLinkPart: string
): Promise<string> => {
	const response = await fetch(getDepartmentDataUrl(departmentLinkPart), {
		next: {
			revalidate: 60 * 15, // 15 minutes
			// tags: ["department", departmentLinkPart],
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch department data");
	}

	return response.text();
};
