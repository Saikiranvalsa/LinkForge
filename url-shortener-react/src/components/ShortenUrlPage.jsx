import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ShortenUrlPage = () => {
    const { url } = useParams();
    const redirected = useRef(false);

    useEffect(() => {
        if (!url || redirected.current) {
            return;
        }

        redirected.current = true;

        const redirectUrl =
            import.meta.env.VITE_BACKEND_URL + `/${url}`;

        console.log("REDIRECTING TO:", redirectUrl);

        window.location.replace(redirectUrl);
    }, [url]);

    return <p>Redirecting...</p>;
};

export default ShortenUrlPage;