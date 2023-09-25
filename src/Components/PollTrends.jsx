import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allData, barChartData, lineChartData } from '../redux/store';
import { Bar, Line, Doughnut } from "react-chartjs-2"
import 'chart.js/auto';
import { Button, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';



export const PollTrends = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState("all");
    // console.log(type)

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
            const labels = data.map((val) => val.choice ? 'Yes' : 'No');
            const votesData = data.map(obj => obj.count);
            setBarData({
                labels,
                datasets: [
                    {
                        label: "Votes",
                        data: votesData,
                        backgroundColor: ["#E38282", "#89D788"],
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
                    labels: lineGraphData?.map((val, index) => ({ id: index, value: val?.date?.split("T")[0] })),
                    datasets: [
                        {
                            label: type === "true" ? "Voted" : "Not Voted",
                            data: lineGraphData?.map((obj) => {
                                return obj.count;
                            }),
                            borderColor: type === "true" ? "#89D788" : "#E38282",
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
                        borderColor: "#89D788",
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
                        borderColor: "#E38282",
                        tension: 0.1,
                    },
                ],

            });
        }
    }, [type, lineGraphData])

    const [doughnutData, setDoughnutData] = useState({
        labels: null,
        datasets: [],
    })
    useEffect(() => {
        if (data) {
            const labels = data?.map((val) => val.choice ? 'Yes' : 'No');

            const votesData = data?.map(val => val.count);
            setDoughnutData({
                labels,
                datasets: [
                    {
                        label: "Votes",
                        data: votesData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            })
        }
    }, [data])

    return (
        <div className='bg-[#F8FAFF] w-full'>
            <div className='lg:flex block'>
                <div className='xl:w-[45%] lg:w-[50%] w-full'>
                    <div className='py-[28px] lg:px-[30px] px-[15px]'>
                        <AllData />
                    </div>
                    <div className='bg-white lg:pt-6 lg:pr-8  lg:flex xl:max-w-[80%] max-w-[95%] mx-auto rounded-xl px-5 shadow1'>
                        <div className='xl:w-[40%] lg:w-[60%] mx-auto w-[90%] py-2 '>
                            <Doughnut data={doughnutData} />
                        </div>
                        <div className='lg:py-[70px] py-4'>
                            <div className='text-[18px] lg:text-left text-center pl-2 font-[500]'>
                                Poll result:
                            </div>
                            <div className='pt-[8px] lg:text-left text-center'>
                                {
                                    data && data?.map((val, index) => {
                                        return (
                                            <div key={index} className='pt-[3px]'>
                                                Total {val.choice ? "yes" : "no"}  count: {val.count}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='lg:w-[55%] xl:pl-[130px] lg:pl-[50px] px-4 lg:px-0 pt-[30px]  lg:pr-[35px]'>
                    <div className='shadow1 rounded-lg h-fit lg:max-w-[90%]  bg-white'>
                        <div className='pt-[15px] px-[25px] w-[95%] lg:pb-0 pb-2'>
                            <div className='lg:text-center lg:pl-7 font-[500] pb-4 text-[18px]'>
                                Bar graph to show the number of total votes
                            </div>
                            <BarChart chartData={barData} />
                        </div>
                    </div>
                    <div className='shadow1 rounded-lg mb-[15px] 1xl:mt-[20px] lg:mt-14 mt-10 bg-white'>
                        <div className='pt-[20px] lg:pl-[20px] lg:px-0 px-3 pb-[30px] lg:w-[90%]   lg:h-[80%]'>
                            <div className='lg:text-center lg:pl-7 font-[500] pb-4 text-[18px]'>
                          Line graph to show the number of votes on each date   
                            </div>
                            <LineChart chartData={lineData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AllData = () => {
    const { allPolls } = useSelector(state => state?.poll);
    return (
        <div className='shadow1 max-h-[450px] overflow-y-auto rounded-xl bg-white'>
            <div className=''>
                <h1 className='text-[20px] font-[500] text-black text-center py-3'>Total votes</h1>
                <table className='w-[100%]'>
                    <thead className='text-[18px] font-[400]'>
                        <tr className=''>
                            <th className='py-2 text-[20px] font-[500]'>{allPolls?.fields[1]?.name}</th>
                            <th className='py-2 text-[20px] font-[500]'>{allPolls?.fields[2]?.name}</th>
                            <th className='py-2 text-[20px] font-[500]'>{allPolls?.fields[3]?.name}</th>
                        </tr>
                    </thead>
                    <tbody className='lg:text-center'>
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
                                
                                        <tr
                                            key={index}
                                            className={`${row.choice ? 'text-green-500' : 'text-red-500'} border border-b-gray-200 cursor-pointer rounded-lg duration-300`}

                                        >
                                            <td className='lg:px-6 lg:pl-0 pl-5 py-3'>{row.name}</td>
                                            <td className='lg:px-6 lg:pl-0 pl-5 py-3' >{correctChoice} </td>
                                            <td className='lg:px-6 lg:pl-0 pl-14 py-3'>{formattedDate}</td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
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
                    color: ["#E38282", "#89D788"],
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

