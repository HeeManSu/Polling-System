import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allData, barChartData, lineChartData } from '../redux/store';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { Bar, Line } from "react-chartjs-2"
import 'chart.js/auto';




export const PollTrends = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState("all");

    useEffect(() => {
        dispatch(allData());
        dispatch(barChartData());
        dispatch(lineChartData({ type }))
    }, [])


    const { data, lineGraphData } = useSelector(state => state?.poll);

    const [barData, setBarData] = useState({
        labels: null,
        datasets: [],
    })

    useEffect(() => {
        if (data) {
            const labels = data.map(obj => obj.choice);
            const votesData = data.map(obj => obj.count);

            setBarData({
                labels,
                datasets: [
                    {
                        label: "Votes",
                        data: votesData,
                        backgroundColor: ["#4F709C", "#E5D283"],
                    },
                ],
            });
        };
    }, [data]);


    const [lineData, setLineData] = useState({
        labels: null,
        datasets: [],
    });

    useEffect(() => {
        if (type === 'true' || type === 'false') {
            console.log(lineGraphData)
            if (Array.isArray(lineGraphData)) {
                setLineData({
                    labels: lineGraphData?.map((val) => val?.date?.split("T")[0]),
                    datasets: [
                        {
                            label: type === "true" ? "Voted" : "Not Voted",
                            data: lineGraphData?.map((obj) => {
                                return obj.count;
                            }),
                            borderColor: type === "true" ? "#E5D283" : "#4F709C",
                            tension: 0.1,
                        },
                    ],
                });
            }
        } else if (type === "all") {

            console.log(lineGraphData)
            const votedYesDates = [];
            lineGraphData?.countYes?.map((obj) => votedYesDates.push(obj.date.split("T")[0]));
            const votedNoDates = [];
            lineGraphData?.countNo?.map((obj) => votedNoDates.push(obj.date.split("T")[0]));
            const totalDates = [...new Set([...votedYesDates, ...votedNoDates])]
            setLineData({

                labels: totalDates.map((date) => date.split("T")[0]),
                datasets: [
                    {
                        label: "Voted Yes",
                        data: totalDates.map((date) => {
                            const i = votedYesDates.indexOf(date);

                            if (i !== -1) {
                                // console.log(lineGraphData.countYes[i].count)
                                return lineGraphData.countYes[i].count;
                            } else {
                                return 0;
                            }
                        }),
                        borderColor: "#E5D283",
                        tension: 0.1,
                    },
                    {
                        label: " Voted No",
                        data: totalDates.map((date) => {
                            const i = votedNoDates.indexOf(date);
                            // console.log(i)

                            if (i !== -1) {
                                // console.log(lineGraphData.countYes[i].count)
                                return lineGraphData.countNo[i].count;
                            } else {
                                return 0;
                            }
                        }),
                        borderColor: "#4F709C",
                        tension: 0.1,
                    },
                ],

            });
        }
    }, [lineGraphData])


    return (
        <div className='bg-gray-50 h-[80%] w-full'>
            <div className=' ml-[50px]   pt-[70px]  ' >
                <div className='flex'>
                    <div className='w-full'>
                        {/* <h1 className='pl-[245px] text-[21px] py-2 font-[500]'>Total Polls</h1> */}
                        <div className='overflow-y-scroll  w-[40%] h-[500px] hide-scrollbar  ' >
                            <AllData />
                        </div>
                    </div>

                    <div>
                        <BarChart chartData={barData} />
                        <LineChart chartData={lineData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const AllData = () => {
    const { allPolls } = useSelector(state => state?.poll);
    return (
        <div className='shadow1 bg-white'>
            <TableContainer overflowY={'hidden'}>
                <Table variant='simple'>
                    <Thead >
                        <Tr>
                            <Th>{allPolls?.fields[1]?.name}</Th>
                            <Th>{allPolls?.fields[2]?.name}</Th>
                            <Th >{allPolls?.fields[3]?.name}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            allPolls?.rows.length > 0 && allPolls.rows.map((row, index) => {
                                const date = new Date(row.date);
                                const year = date.getFullYear();
                                const month = String(date.getMonth() + 1).padStart(2, '0');
                                const day = String(date.getDate()).padStart(2, '0');

                                var correctChoice = "yes";
                                if (row.choice === false) {
                                    correctChoice = "no";
                                }
                                const formattedDate = `${year}-${month}-${day}`;
                                return (
                                    <Tr
                                        key={index}
                                        bg={row.choice ? 'green.100' : 'red.100'} // Set background color based on row.choice
                                        borderRadius="md"
                                        p={2}
                                        mb={2}
                                        cursor={'pointer'}
                                    >
                                        <Td>{row.name}</Td>
                                        <Td>{correctChoice} </Td>
                                        <Td>{formattedDate}</Td>
                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    )
}


const BarChart = ({ chartData }) => {


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

    return (
        <Bar data={chartData} options={option} />
    )
}


const LineChart = ({ chartData }) => {

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
                        size: 13,
                    },
                },
            },
            x: {
                ticks: {
                    color: "black",
                    font: {
                        size: 13,
                    },
                },
            },
        },
    };
    return (
        <Line data={chartData} options={option} />
    );

}

