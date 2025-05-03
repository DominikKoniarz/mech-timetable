import type { Department } from "@/types/departments";
import { type WelcomeFormSchema } from "@/schema/welcome-form-schema";
import {
    COMPUTER_LAB_GROUPS,
    LAB_GROUPS,
    PROJECT_GROUPS,
} from "@/types/groups";
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
import useFirstRender from "@/hooks/useFirstRender";

type Props = {
    departments: Department[];
};

export default function WelcomeSelects({ departments }: Props) {
    const form = useFormContext<WelcomeFormSchema>();
    const t = useTranslations("welcomePage.form");

    const { isFirstRender } = useFirstRender();

    return (
        <>
            <FormField
                control={form.control}
                name="departmentName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("department")}</FormLabel>
                        <Select
                            onValueChange={
                                isFirstRender ? undefined : field.onChange
                            }
                            defaultValue={
                                isFirstRender ? undefined : field.value
                            }
                            value={isFirstRender ? undefined : field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full data-[placeholder]:text-white">
                                    <SelectValue
                                        placeholder={departments[0].name}
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
            <FormField
                control={form.control}
                name="laboratoryGroup"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("laboratoryGroup")}</FormLabel>
                        <Select
                            onValueChange={
                                isFirstRender ? undefined : field.onChange
                            }
                            defaultValue={
                                isFirstRender ? undefined : field.value
                            }
                            value={isFirstRender ? undefined : field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full data-[placeholder]:text-white">
                                    <SelectValue placeholder={LAB_GROUPS.L01} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(LAB_GROUPS).map((group) => (
                                    <SelectItem key={group} value={group}>
                                        {group}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="computerLaboratoryGroup"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("computerLaboratoryGroup")}</FormLabel>
                        <Select
                            onValueChange={
                                isFirstRender ? undefined : field.onChange
                            }
                            defaultValue={
                                isFirstRender ? undefined : field.value
                            }
                            value={isFirstRender ? undefined : field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full data-[placeholder]:text-white">
                                    <SelectValue
                                        placeholder={COMPUTER_LAB_GROUPS.K01}
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(COMPUTER_LAB_GROUPS).map(
                                    (group) => (
                                        <SelectItem key={group} value={group}>
                                            {group}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="projectGroup"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("projectGroup")}</FormLabel>
                        <Select
                            onValueChange={
                                isFirstRender ? undefined : field.onChange
                            }
                            defaultValue={
                                isFirstRender ? undefined : field.value
                            }
                            value={isFirstRender ? undefined : field.value}
                        >
                            <FormControl>
                                <SelectTrigger className="w-full data-[placeholder]:text-white">
                                    <SelectValue
                                        placeholder={PROJECT_GROUPS.P01}
                                    />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {Object.values(PROJECT_GROUPS).map((group) => (
                                    <SelectItem key={group} value={group}>
                                        {group}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}
