import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Button, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react';
import { createNewPoll } from '../redux/store';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

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
        <div className='w-full h-screen bg-blue-50'>
            <div className='pt-[60px]'>
                <h1 className='text-center  text-[40px] font-[700]'>Voice Your Choice: Your Vote Truly Counts!</h1>

                <div className='bg-white rounded-lg w-[25%] mx-auto mt-[120px]'>
                    <h1>Polling System</h1>
                    <form onSubmit={submitHandler}>
                        <div>
                            <h1> Name</h1>
                            <Input
                                type='text'
                                required
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <RadioGroup value={vote} onChange={(val) => setVote(val)}>
                                <Stack direction='row'>
                                    <Radio
                                        defaultChecked
                                        value='yes'>Yes</Radio>
                                    <Radio value='no'>No</Radio>
                                </Stack>
                            </RadioGroup>
                        </div>
                        <Button
                            type="submit"
                        >Submit</Button>
                    </form>
                    <Link to={"/trends"}>
                        <Button
                            type='button'
                        >Analysis</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default CreatePoll