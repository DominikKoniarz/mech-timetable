import { welcomeDepartmentNameParser } from "@/features/welcome/welcome-search-params";
import { useQueryState } from "nuqs";

const useDepartmentName = () => {
    const [departmentNameSearchParam, setDepartmentNameSearchParam] =
        useQueryState("departmentName", welcomeDepartmentNameParser);

    return {
        departmentName: departmentNameSearchParam,
        setDepartmentName: setDepartmentNameSearchParam,
    };
};

export default useDepartmentName;
