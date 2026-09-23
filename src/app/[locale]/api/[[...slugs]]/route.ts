import {
    getDepartmentGroupsByName,
    getDepartments,
} from "@/features/department/department-queries";
import { getTimetableForProfile } from "@/features/timetable/timetable-queries";
import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
    .get("/departments", async () => {
        const departments = await getDepartments();

        return {
            departments,
        };
    })
    .get(
        "/departments/:departmentName/groups",
        async ({ params }) => {
            const result = await getDepartmentGroupsByName(
                params.departmentName,
            );

            if (!result) {
                return new Response("Department not found", { status: 404 });
            }

            return {
                groupsByFirstLetter: result.groupsByFirstLetter,
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
            const result = await getTimetableForProfile(params.profileIndex);

            if ("error" in result) {
                if (result.error === "bad-request") {
                    return new Response("Bad request", { status: 400 });
                }

                if (result.error === "profile-not-found") {
                    return new Response("Profile not found", { status: 404 });
                }

                return new Response("Department not found", { status: 404 });
            }

            return {
                profileIndex: result.profileIndex,
                rows: result.rows,
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
