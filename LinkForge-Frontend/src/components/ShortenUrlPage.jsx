import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaLink } from "react-icons/fa";

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

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-5">

            <div className="bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-900/5 p-8 sm:p-10 w-full max-w-md text-center">

                {/* Logo */}
                <div className="flex justify-center mb-5">

                    <div className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                    ">
                        <FaLink className="text-blue-600 text-2xl" />
                    </div>

                </div>

                {/* Brand */}
                <h1 className="text-2xl font-bold text-slate-900">
                    Link<span className="text-blue-600">Forge</span>
                </h1>

                {/* Message */}
                <h2 className="text-lg font-semibold text-slate-700 mt-4">
                    Redirecting...
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                    Please wait while we take you to your destination.
                </p>

                {/* Loading animation */}
                <div className="flex justify-center mt-6">

                    <div className="
                        w-10
                        h-10
                        border-4
                        border-slate-200
                        border-t-blue-600
                        rounded-full
                        animate-spin
                    " />

                </div>

                {/* Short URL */}
                {url && (
                    <p className="text-xs text-slate-400 mt-6 break-all">
                        /s/{url}
                    </p>
                )}

            </div>

        </div>
    );
};

export default ShortenUrlPage;