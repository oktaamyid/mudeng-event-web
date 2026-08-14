"use client";

import { useEffect } from "react";

export default function ScrollReset() {
    useEffect(() => {
        // Instantly scroll to top when this component mounts (page loads)
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }, []);

    return null;
}
