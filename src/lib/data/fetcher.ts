const DEPARTMENTS_LIST_URL =
	"https://podzial.mech.pk.edu.pl/stacjonarne/html/lista.html";
// const DEPARTMENT_DATA_BASE_URL =
// 	"https://podzial.mech.pk.edu.pl/stacjonarne/html/";

// const getDepartmentDataUrl = (department: string) =>
// 	`${DEPARTMENT_DATA_BASE_URL}${department}.html`;

export const fetchDepartmentsList = async (): Promise<string> => {
	const response = await fetch(DEPARTMENTS_LIST_URL);

	if (!response.ok) {
		throw new Error("Failed to fetch departments list");
	}

	const text = await response.text();

	return text;
};
