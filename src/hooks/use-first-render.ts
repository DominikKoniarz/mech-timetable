import { startTransition, useEffect, useState } from "react";

const useFirstRender = () => {
    const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

    useEffect(() => {
        startTransition(() => {
            setIsFirstRender(false);
        });
    }, [isFirstRender]);

    return {
        isFirstRender,
    };
};

export default useFirstRender;
