import { useState, useEffect } from "react";

export const useResponsive = (breakpoint: number = 639) => {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth <= breakpoint);

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isSmallScreen;
};
