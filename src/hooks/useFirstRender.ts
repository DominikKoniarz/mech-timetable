import { useEffect, useState } from "react";

const useFirstRender = () => {
	const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

	useEffect(() => {
		setIsFirstRender(false);
	}, [isFirstRender]);

	return {
		isFirstRender,
	};
};

export default useFirstRender;
