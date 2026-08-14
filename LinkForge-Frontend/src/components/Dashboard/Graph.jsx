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
                    ? "rgba(37, 99, 235, 0.85)"
                    : "rgba(148, 163, 184, 0.12)",

                borderColor: hasData
                    ? "#2563eb"
                    : "rgba(148, 163, 184, 0.3)",

                borderWidth: 1,

                borderRadius: 8,

                hoverBackgroundColor: "#1d4ed8",

                fill: true,

                tension: 0.4,

                barThickness: hasData ? 28 : 20,

                categoryPercentage: 0.8,

                barPercentage: 0.8,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,

        responsive: true,

        interaction: {
            intersect: false,
            mode: "index",
        },

        plugins: {
            legend: {
                display: true,

                position: "top",

                align: "start",

                labels: {
                    usePointStyle: true,

                    pointStyle: "circle",

                    padding: 20,

                    color: "#334155",

                    font: {
                        family: "Arial",
                        size: 13,
                        weight: "600",
                    },
                },
            },

            tooltip: {
                enabled: true,

                backgroundColor: "#0f172a",

                titleColor: "#ffffff",

                bodyColor: "#cbd5e1",

                borderColor: "#334155",

                borderWidth: 1,

                padding: 12,

                cornerRadius: 10,

                displayColors: true,

                callbacks: {
                    label: function (context) {
                        return ` Clicks: ${context.raw}`;
                    },
                },
            },
        },

        scales: {
            y: {
                beginAtZero: true,

                border: {
                    display: false,
                },

                grid: {
                    color: "rgba(148, 163, 184, 0.15)",

                    drawTicks: false,
                },

                ticks: {
                    stepSize: 1,

                    padding: 10,

                    color: "#64748b",

                    callback: function (value) {
                        return Number.isInteger(value)
                            ? value.toString()
                            : "";
                    },

                    font: {
                        family: "Arial",
                        size: 12,
                    },
                },

                title: {
                    display: true,

                    text: "Number of Clicks",

                    color: "#475569",

                    font: {
                        family: "Arial",
                        size: 13,
                        weight: "600",
                    },
                },
            },

            x: {
                border: {
                    display: false,
                },

                grid: {
                    display: false,
                },

                ticks: {
                    color: "#64748b",

                    padding: 10,

                    font: {
                        family: "Arial",
                        size: 12,
                    },
                },

                title: {
                    display: true,

                    text: "Date",

                    color: "#475569",

                    font: {
                        family: "Arial",
                        size: 13,
                        weight: "600",
                    },
                },
            },
        },
    };

    return (
        <div className="w-full h-[400px] bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
            <Bar
                data={data}
                options={options}
            />
        </div>
    );
};

export default Graph;