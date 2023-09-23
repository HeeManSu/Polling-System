import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createNewPoll } from '../redux/store.js'
import { Input, Select } from '@chakra-ui/react';

const CreatePoll = () => {

    const [name, setName] = useState("");
    const [vote, setVote] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();


    const onSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.append("name", name);
        myForm.append("vote", vote);
        myForm.append("date", date);
        console.log(myForm.get("name"));
        console.log(myForm.get("vote"));
        console.log(myForm.get("date"));

        dispatch(createNewPoll(myForm))

    }



    return (
        <div className='w-full h-screen'>
            <div className='flex flex-col items-center'>
                <h1 className='text-center font-[700] text-[35px] pt-[25px]'>Polling System</h1>

                <form className='pt-20' onSubmit={onSubmitHandler}>
                    <div>
                        <label>Enter full name</label>
                        <Input
                            required
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Enter your name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Will you be willing to vote?</label>
                        <Select
                            required
                            value={vote}
                            onChange={(e) => setVote(e.target.value)}
                        >
                            <option value=''>Select an option</option>
                            <option value='Yes'>Yes</option>
                            <option value='No'>No</option>
                        </Select>

                    </div>
                    <div>
                        <label>Enter the date</label>
                        <Input
                            required
                            id='date'
                            name='date'
                            type='date'
                            placeholder='Select Date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePoll