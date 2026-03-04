import { getUserPreferences } from "@/lib/data/cookies";
import { fetchDepartmentData, fetchDepartmentsList } from "@/lib/data/fetcher";
import { parseDepartmentsList, parseGroups, parseRows } from "@/lib/data/parser";
import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
    .get("/departments", async () => {
        const departmentsHtml = await fetchDepartmentsList();
        const departments = parseDepartmentsList(departmentsHtml);

        return {
            departments,
        };
    })
    .get(
        "/departments/:departmentName/groups",
        async ({ params }) => {
            const departmentsHtml = await fetchDepartmentsList();
            const departments = parseDepartmentsList(departmentsHtml);

            const foundDepartment = departments.find(
                (department) => department.name === params.departmentName,
            );

            if (!foundDepartment) {
                return new Response("Department not found", { status: 404 });
            }

            const departmentHtml = await fetchDepartmentData(foundDepartment.url);

            if (!departmentHtml) {
                return new Response("Department not found", { status: 404 });
            }

            const groupsByFirstLetter = parseGroups(departmentHtml);

            return {
                groupsByFirstLetter,
            };
        },
        {
            params: t.Object({
                departmentName: t.String(),
            }),
        },
    )
    .get(
        "/timetable/:profileIndex",
        async ({ params }) => {
            const profileIndex = params.profileIndex;

            const preferences = await getUserPreferences();

            if (!preferences) {
                return new Response("Bad request", { status: 400 });
            }

            const profile = preferences.profiles.at(profileIndex);

            if (!profile) {
                return new Response("Profile not found", { status: 404 });
            }

            const departmentsHtml = await fetchDepartmentsList();

            const departments = parseDepartmentsList(departmentsHtml);

            const foundDepartment = departments.find(
                (department) => department.name === profile.departmentName,
            );

            if (!foundDepartment) {
                return new Response("Department not found", { status: 404 });
            }

            const departmentHtml = await fetchDepartmentData(foundDepartment.url);

            if (!departmentHtml) {
                return new Response("Department not found", { status: 404 });
            }

            const rows = parseRows(departmentHtml, profile.groups);

            return {
                rows,
            };
        },
        {
            params: t.Object({
                profileIndex: t.Number(),
            }),
        },
    );

export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;
