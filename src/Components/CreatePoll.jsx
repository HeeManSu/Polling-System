import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { createNewPoll } from '../redux/store';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import discrod from "../assets/discord.svg"
import twitter from "../assets/twitter.svg"
import github from "../assets/github.svg"
import linkedin from "../assets/linkedin.svg"
import wave2 from "../assets/wave2.svg"

const CreatePoll = () => {
    const [name, setName] = useState("");
    const [vote, setVote] = useState("yes");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        try {
            dispatch(createNewPoll({ name, vote }))
            toast.success("Vote Submitted successfully")
        } catch (error) {
            console.log("failed to dispatch data")
        }
    }
    return (
        <div className='w-full '>
            <div className='lg:flex'>
                <div className='backgroundimage lg:block hidden w-[52%]  h-[100vh] '>
                    <div className='text-white pl-[22px] pt-[18px] cursor-pointer font-[700] text-[24px]'>Taghash</div>
                    <div className='ml-[220px] cursor-pointer tracking-wider text-white text-[28px] font-[600] mt-[250px]'>Polling system</div>
                    <div className='flex pt-[300px] gap-6  ml-[170px]'>
                        <img className='cursor-pointer' src={linkedin} alt="no_image" />
                        <img className='cursor-pointer' src={twitter} alt="no_image" />
                        <img className='cursor-pointer' src={discrod} alt="no_image" />
                        <img className='cursor-pointer' src={github} alt="no_image" />
                    </div>
                </div>
                <div className='lg:w-[48%] w--full'>
                    <div className='lg:hidden block '>
                        <div className='text-white bg-blue-500 pb-4  pl-[22px] pt-[18px] cursor-pointer font-[700] text-[24px]'>Taghash</div>

                        {/* <hr className='bg-blue-500 h-16' /> */}

                        <img src={wave2} alt="" />
                    </div>
                    <div className='lg:pt-[60px] pt-[50px]'>
                        {/* <h1 className='text-center  text-[40px] font-[700]'>Voice Your Choice: Your Vote Truly Counts!</h1> */}
                        <div className='bg-white px-[18px] py-[20px] border-2 border-gray-100 rounded-lg lg:w-[25%]  lg:mx-auto mx-3 lg:mt-[150px] mt-[10px] min-w-[45%]'>
                            <h1 className='text-center text-[20px] font-[500]'>Polling System</h1>
                            <form onSubmit={submitHandler}>
                                <div className='pt-[12px]'>
                                    <h1 className=' text-[16px] font-[500]'> Name</h1>
                                    <Input
                                        marginTop={'1'}
                                        type='text'
                                        required
                                        placeholder='Enter your name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='pt-[8px]'>
                                    <h1 className=' text-[16px] font-[500]'> Choose your choice</h1>
                                    <RadioGroup className='pt-[5px]' value={vote} onChange={(val) => setVote(val)}>
                                        <Stack direction='row'>
                                            <Radio
                                                defaultChecked
                                                value='yes'>Yes</Radio>
                                            <Radio className='ml-5' value='no'>No</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </div>
                                <Button
                                    marginTop={'5'}
                                   
                                    bg={'blue.400'}
                                    textColor={'white'}
                                    _hover={{
                                        backgroundColor: "blue.500"
                                    }}
                                    type="submit"
                                >Submit</Button>
                                <Link to={"/trends"}>
                                    <Button
                                        marginTop={'5'}
                                        marginLeft={'8'}
                                        bg={'blue.400'}
                                        textColor={'white'}
                                        _hover={{
                                            backgroundColor: "blue.500"
                                        }}
                                        type='button'
                                    >Analysis</Button>
                                </Link>
                            </form>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default CreatePoll