import { useQuery } from "react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, onError) => {
    return useQuery(
        "my-shortenurls",
        async () => {

            console.log("TOKEN FOR MY URLS:", token);

            const response = await api.get(
                "/api/urls/myurls",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );

            console.log("MY URLS BACKEND RESPONSE:", response.data);

            return response;
        },
        {
            select: (data) => {

                console.log("MY URLS BEFORE SORT:", data.data);

                const sortedData = data.data.sort(
                    (a, b) =>
                        new Date(b.createdDate) -
                        new Date(a.createdDate)
                );

                console.log("MY URLS AFTER SORT:", sortedData);

                return sortedData;
            },

            onError,

            staleTime: 5000,
        }
    );
};


export const useFetchTotalClicks = (token, onError) => {
    return useQuery(
        "url-totalclick",

        async () => {

            console.log("TOKEN FOR TOTAL CLICKS:", token);

            const response = await api.get(
                "/api/urls/totalClicks?startDate=2026-01-01&endDate=2026-12-31",
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );

            console.log(
                "TOTAL CLICKS BACKEND RESPONSE:",
                response.data
            );

            return response;
        },

        {
            select: (data) => {

                console.log(
                    "TOTAL CLICKS DATA BEFORE CONVERSION:",
                    data.data
                );

                const convertToArray = Object.keys(data.data).map(
                    (key) => ({
                        clickDate: key,
                        count: data.data[key],
                    })
                );

                console.log(
                    "TOTAL CLICKS DATA AFTER CONVERSION:",
                    convertToArray
                );

                return convertToArray;
            },

            onError,

            staleTime: 5000,
        }
    );
};