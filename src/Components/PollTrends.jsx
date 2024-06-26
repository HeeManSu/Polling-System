import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allData, barChartData, lineChartData } from '../redux/store';
import { Bar, Line, Doughnut } from "react-chartjs-2"
import 'chart.js/auto';
import { Button, Input } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/index';
import { useRef } from 'react';


export const PollTrends = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState("all");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [page, setPage] = useState(1);
    const { total } = useSelector(state => state?.poll);
    const { allPolls } = useSelector(state => state?.poll);



    console.log(allPolls)

    const [fetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        if (allPolls) {
            setFetchedData((prev) => [...prev, ...allPolls]);
        }
    }, [allPolls])
    console.log(fetchedData)


    const scrollRef = useRef();


    useEffect(() => {
        const today = new Date();
        const fourDaysAgo = new Date(today);
        fourDaysAgo.setDate(today.getDate() - 4);

        const formattedToday = today.toISOString().split("T")[0];
        const formattedFourDaysAgo = fourDaysAgo.toISOString().split("T")[0];

        setStartDate(formattedFourDaysAgo);
        setEndDate(formattedToday);
    }, []);

    useEffect(() => {
        dispatch(allData(page));
        dispatch(barChartData());
        dispatch(lineChartData({ type }))
    }, [page, type])

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
            // console.log(lineGraphData)
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
            // console.log(lineGraphData)
            const votedYesDates = [];
            const votedNoDates = [];
            if (startDate && endDate) {
                lineGraphData?.countYes?.forEach((obj) => {
                    const date = obj.date.split("T")[0];
                    if (date >= startDate && date <= endDate) {
                        votedYesDates.push(date);
                    }
                });

                lineGraphData?.countNo?.forEach((obj) => {
                    const date = obj.date.split("T")[0];
                    if (date >= startDate && date <= endDate) {
                        votedNoDates.push(date);
                    }
                });
            } else {
                lineGraphData?.countYes?.map((obj) => votedYesDates.push(obj.date.split("T")[0]));
                lineGraphData?.countNo?.map((obj) => votedNoDates.push(obj.date.split("T")[0]));
            }
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
    }, [type, lineGraphData, startDate, endDate]);


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

    const selectPageHandler = (selectedPage) => {
        setPage(selectedPage);
    }

    const handleScroll = async () => {

        
        const scrollY = scrollRef.current.scrollTop;
        const clientHeight = scrollRef.current.clientHeight;
        const scrollHeight = scrollRef.current.scrollHeight;
        console.log("scrollY", scrollY)
        console.log("clientHeight", clientHeight)
        console.log("scrollHeight", scrollHeight)


        try {
            if (scrollHeight <= scrollY + 1 + clientHeight) {
                setPage((prev) => prev + 1)
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        const scrollRefElement = scrollRef.current; 
        scrollRefElement.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='bg-[#F8FAFF] w-full'>
            <div className='lg:flex block'>
                <div className='xl:w-[45%] lg:w-[50%] w-full'>
                    <div className='my-[8px] rounded-xl  shadow1 bg-white lg:mx-[30px] mx-[15px]'>
                        <h1 className='text-[20px] font-[500] text-black text-center py-2'>Total votes</h1>
                        <div className='text-[18px] flex lg:mx-[30px] mx-[15px] justify-around font-[400]'>
                            <h1 className='py-2 text-[18px] font-[500]'>Name</h1>
                            <h1 className='py-2 text-[18px] font-[500]'>Choice</h1>
                            <h1 className='py-2 text-[18px] font-[500]'>Date</h1>
                        </div>
                        <div className=' rounded-xl    lg:mx-[30px] mx-[15px]'>
                            <div ref={scrollRef} className=' h-[400px] overflow-y-auto '>
                                <div className=''>
                                    <table className='w-[100%]'>

                                        <tbody className='lg:text-center'>
                                            {
                                                fetchedData?.length > 0 && fetchedData?.map((row, index) => {
                                                    const date = new Date(row.date);
                                                    const year = date.getFullYear();
                                                    const month = String(date.getMonth() + 1).padStart(2, '0');
                                                    const day = String(date.getDate()).padStart(2, '0');
                                                    var correctChoice = "yes";
                                                    if (row.choice === false) {
                                                        correctChoice = "no";
                                                    }
                                                    const formattedDate = `${day}-${month}-${year}`;
                                                    return (
                                                        <tr
                                                            key={index}
                                                            className={`${row.choice ? 'text-green-500' : 'text-red-500'} border border-b-gray-200 cursor-pointer rounded-lg duration-300`}
                                                        >
                                                            <td className='lg:px-6 lg:pl-0 pl-5 py-[9px]'>{row.name}</td>
                                                            <td className='lg:px-6 lg:pl-0 pl-5 py-[9px]' >{correctChoice} </td>
                                                            <td className='lg:px-6 lg:pl-0 pl-14 py-[9px]'>{formattedDate}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* <div className='flex items-center justify-around py-3'>
                                <div className=" ">
                                    <div>
                                        {page !== 1 && (
                                            <button onClick={() => selectPageHandler(page - 1)} className="flex text-[#146eb4] text-[18px] items-center">
                                                <ChevronLeftIcon className="h-6 w-6" />
                                                Prev
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    {typeof total === 'number' && Array(Math.ceil(total / 10)).fill().map((_, index) => (
                                        <span
                                            onClick={() => selectPageHandler(index + 1)}
                                            className={`${page === index + 1
                                                ? "bg-[#146eb4] px-[5px] py-[5px] text-white rounded-full"
                                                : "text-[#146eb4]"
                                                } text-[18px] hover:cursor-pointer md:ml-[22px] ml-[17px]`}
                                            key={index}
                                        >
                                            {index + 1}
                                        </span>
                                    ))}
                                </div>
                                <div>
                                    {page !== 5 && (
                                        <button onClick={() => selectPageHandler(page + 1)} className="flex text-[#146eb4] text-[18px]  items-center">
                                            Next
                                            <ChevronRightIcon className="h-6 w-6" />
                                        </button>
                                    )}
                                </div>

                            </div> */}
                        </div>
                    </div>
                    <div className='bg-white lg:pt-4 lg:mt-5 lg:pr-8  lg:flex xl:max-w-[80%] max-w-[95%] mx-auto rounded-xl px-5 shadow1'>
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
                    <div
                        className='shadow1 rounded-lg mb-[4px] lg:mt-3 mt-10 bg-white'>
                        <div className='pt-[20px] lg:pl-[20px] lg:px-0 px-3 pb-[10px] lg:w-[95%]   lg:h-[80%]'>
                            <div
                                className='flex justify-between items-center'>
                                <div className='lg:text-center lg:pl-7 font-[500] pb-4 text-[18px]'>
                                    Shows the number of votes on each date
                                </div>
                                <div className="flex justify-center mb-4">
                                    <Button
                                        type='button'
                                        onClick={() => setDropdownOpen(!dropdownOpen)}

                                        bg={'blue.400'}
                                        textColor={'white'}
                                        _hover={{
                                            backgroundColor: "blue.500"
                                        }}
                                    >
                                        Filter Date
                                    </Button>
                                    {dropdownOpen && (
                                        <div className="absolute shadow1  bg-white mt-12 mr-56 z-50  rounded  my-4">
                                            <div className='flex px-5 py-5'>
                                                <div>
                                                    <label className='text-[15px] font-[500] text-gray-500'>Start date</label>
                                                    <Input
                                                        marginTop={'2'}
                                                        className='border border-red-400'
                                                        type='date'
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                    />
                                                </div>
                                                <span className='text-black text-[15px] font-[500]'>to</span>
                                                <div className=''>
                                                    <label className='text-[15px] pl-[102px] font-[500] text-gray-500'>End date</label>
                                                    <Input
                                                        marginTop={'2'}
                                                        className='border border-red-400'
                                                        type='date'
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <LineChart chartData={lineData} />
                        </div>
                    </div>
                </div>
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

