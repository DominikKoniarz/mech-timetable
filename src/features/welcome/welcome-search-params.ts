import { parseAsString } from "nuqs";

export const welcomeDepartmentNameParser = parseAsString.withOptions({
    shallow: true, // won't trigger server side re-render
});
