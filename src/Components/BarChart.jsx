import { Bar } from "react-chartjs-2"


const BarChart = ({chartData}) => {


    const option = {
        plugins: {
            legend: {
                labels: {
                    color: "black",
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: "black",
                    font: {
                        size: 14,
                    },
                },
            },
            x: {
                ticks: {
                    color: ["#4F709C", "#E5D283"],
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    return <Bar data={chartData} options={option} />
}

export default BarChart;