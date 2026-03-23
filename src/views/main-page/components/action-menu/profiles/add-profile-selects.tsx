import type { Department } from "@/types/departments";
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

type Props = {
    departments: Department[];
    parsedGroups: GroupsByFirstLetter | null;
    dialogNamespace?: "addProfileDialog" | "editProfileDialog";
};

type ProfileFormValues = {
    departmentName: string;
    groups: string[];
};

export default function AddProfileSelects({
    departments,
    parsedGroups,
    dialogNamespace = "addProfileDialog",
}: Props) {
    const form = useFormContext<ProfileFormValues>();

    const t = useTranslations(dialogNamespace);

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
                            // console.log(field.name, field.value);
                            return (
                                <FormItem>
                                    <FormLabel>
                                        {t("groupWithLetter", { groupLetter })}
                                    </FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                        }}
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
