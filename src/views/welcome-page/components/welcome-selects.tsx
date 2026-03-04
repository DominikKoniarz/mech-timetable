import type { Department } from "@/types/departments";
import type { WelcomeFormSchema } from "@/schema/welcome-form-schema";
import type { GroupsByFirstLetter } from "@/types/groups";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { useQueryState } from "nuqs";
import { welcomeDepartmentNameParser } from "../search-params";

type Props = {
    departments: Department[];
    parsedGroups: GroupsByFirstLetter | null;
};

export default function WelcomeSelects({ departments, parsedGroups }: Props) {
    const form = useFormContext<WelcomeFormSchema>();
    const t = useTranslations("welcomePage.form");
    const [, setDepartmentNameSearchParam] = useQueryState(
        "departmentName",
        welcomeDepartmentNameParser,
    );

    return (
        <>
            <FormField
                control={form.control}
                name="departmentName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("department")}</FormLabel>
                        <Select
                            onValueChange={(value) => {
                                field.onChange(value);
                                void setDepartmentNameSearchParam(value);
                            }}
                            value={field.value || undefined}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={t("selectDepartment")}
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {departments.map((department) => (
                                    <SelectItem
                                        key={department.name}
                                        value={department.name}
                                    >
                                        {department.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {Object.entries(parsedGroups ?? {}).map(
                ([groupLetter, groups], index) => (
                    <FormField
                        key={`group-${groupLetter}`}
                        control={form.control}
                        name={`groups.${index}`}
                        render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>
                                        {t("groupWithLetter", { groupLetter })}
                                    </FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
                                        // defaultValue={
                                        //     isFirstRender ? undefined : field.value
                                        // }
                                        // value={isFirstRender ? undefined : field.value}
                                        value={field.value ?? undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue
                                                    placeholder={t(
                                                        "selectGroup",
                                                    )}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from(groups.values()).map(
                                                (group) => (
                                                    <SelectItem
                                                        key={group}
                                                        value={group}
                                                    >
                                                        {group}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                ),
            )}
        </>
    );
}
