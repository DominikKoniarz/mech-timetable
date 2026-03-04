import { parseAsString } from "nuqs/server";

export const welcomeDepartmentNameParser = parseAsString.withOptions({
    shallow: true, // won't trigger server side re-render
});
