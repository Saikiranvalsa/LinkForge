import React from "react";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Legend,
    Tooltip,
    Filler,
} from "chart.js";

ChartJS.register(
    BarElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    Legend,
    Filler
);

const Graph = ({ graphData = [] }) => {

    console.log("GRAPH DATA RECEIVED:", graphData);

    const hasData = Array.isArray(graphData) && graphData.length > 0;

    console.log("GRAPH HAS DATA:", hasData);

    const labels = hasData
        ? graphData.map((item) => item.clickDate)
        : [
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        ];

    const clickCounts = hasData
        ? graphData.map((item) => Number(item.count))
        : [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            6,
            5,
            4,
            3,
            2,
            1,
        ];

    console.log("GRAPH LABELS:", labels);
    console.log("GRAPH CLICK COUNTS:", clickCounts);

    const data = {
        labels: labels,

        datasets: [
            {
                label: "Total Clicks",

                data: clickCounts,

                backgroundColor: hasData
                    ? "#3b82f6"
                    : "rgba(54, 162, 235, 0.1)",

                borderColor: "#1D2327",

                borderWidth: 1,

                fill: true,

                tension: 0.4,

                barThickness: hasData ? 30 : 20,

                categoryPercentage: 0.8,

                barPercentage: 0.8,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,

        responsive: true,

        plugins: {
            legend: {
                display: true,
            },

            tooltip: {
                enabled: true,
            },
        },

        scales: {
            y: {
                beginAtZero: true,

                ticks: {
                    stepSize: 1,

                    callback: function (value) {
                        return Number.isInteger(value)
                            ? value.toString()
                            : "";
                    },
                },

                title: {
                    display: true,

                    text: "Number Of Clicks",

                    font: {
                        family: "Arial",
                        size: 16,
                        weight: "bold",
                    },
                },
            },

            x: {
                title: {
                    display: true,

                    text: "Date",

                    font: {
                        family: "Arial",
                        size: 16,
                        weight: "bold",
                    },
                },
            },
        },
    };

    return (
        <div className="w-full h-[400px]">
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
};

export default Graph;