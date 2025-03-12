import type { Department } from "@/types/departments";
import * as cheerio from "cheerio";

export const parseDepartmentsList = (html: string): Department[] => {
	const $ = cheerio.load(html);

	const departmentsDiv = $("#oddzialy");
	if (departmentsDiv.length === 0)
		throw new Error("Departments list not found");

	const anchorTags = departmentsDiv.find("p.el a");
	if (anchorTags.length === 0) throw new Error("Departments not found");

	const departments: Department[] = [];

	anchorTags.each((_, element) => {
		const department = $(element).text();
		const departmentUrl = $(element).attr("href");

		if (departmentUrl)
			departments.push({
				name: department,
				url: departmentUrl,
			});
	});

	return departments;
};
