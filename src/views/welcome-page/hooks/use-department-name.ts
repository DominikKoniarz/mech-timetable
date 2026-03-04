import { welcomeDepartmentNameParser } from "@/lib/welcome/search-params";
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
