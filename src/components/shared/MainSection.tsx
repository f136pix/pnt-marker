import React, {useEffect, useState} from 'react';
import {AlarmClock} from "lucide-react";
import {Button, TextField} from "@mui/material";
import ShowCurrentTime from "@/components/shared/ShowCurrentTime";
import {IRegisteredTime, ITimes} from "@/types";
import {axiosGetHandler} from "../../../utils/axios";
import AddTimesToUserModal from "@/components/modal/AddTimesToUserModal";
import {RegisteredTimeSection} from "@/components/shared/RegisteredTimeSection";


type IProps = {
    userId: number
}

const initialTime: IRegisteredTime = {
    id: 0,
    userId: 0,
    date: undefined,
    entryTime: undefined,
    exitTime: undefined,
    launchTime:undefined
};

function MainSection(props: IProps) {
    const [timeData, setTimeData] = useState<ITimes | false>();
    const [todayTimes, setTodayTimes] = useState<IRegisteredTime>(initialTime);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    // updates data once the modal is closed
    const handleClose = () => {
        setOpen(false);
        //updateData;
        setUserTimesDataFnc();
    };
    const retrieveTodayTimes = async (): Promise<IRegisteredTime | undefined> => {
        if (!props.userId) return; // if userId is not defined, return
        try {
            const data = await axiosGetHandler(`time/today?userId=${props.userId}`);
            return data.data.times;

        } catch (err: any) {
            if (err.response.status == 404) {
                return undefined;
            }
            return;
        }
    };

    const retrieveUserTimes = async (): Promise<ITimes | false | undefined> => {
        if (!props.userId) return; // if userId is not defined, return
        try {
            const data = await axiosGetHandler(`time?userId=${props.userId}`);
            return data.data.times;

        } catch (err: any) {
            if (err.response.status == 404) {
                return false;
            }
            return;
        }
    };

    const setUserTimesDataFnc = async () => {
        const data = await retrieveUserTimes();
        console.log('data', data);
        if (data !== undefined) {
            setTimeData(data);
        }
    };

    // retrieving user times
    useEffect(() => {
        setUserTimesDataFnc();
    }, [props.userId]); // updating when userId is recieved

    return (
        <section className={'flex flex-col h-screen'}>
            <div className={'w-screen'}>
                <ShowCurrentTime className={'font-bold text-[3rem]'}/>
                <AlarmClock className={'mx-auto'} size={300}/>
            </div>
            <div className={'w-screen flex justify-center mt-[2rem] p-2 bg-black h-full'}>
                <div>
                    {timeData == false &&
                        <div className={'flex flex-col'}>
                            <Button onClick={handleOpen} variant={"contained"}
                                    className={'hover:bg-slate-900 hover:text-white bg-neutral-500 text-black mx-auto font-bold mt-[3rem]'}>Add
                                your times</Button>
                            <a className={'mt-1 underline'}>Dont know your times? Contact the HR</a>

                        </div>}
                    {timeData &&
                        <RegisteredTimeSection timeData={timeData} RegisteredTimes={todayTimes}/>
                    }
                </div>
            </div>

            <AddTimesToUserModal isOpen={open} handleClose={handleClose} userId={props.userId}></AddTimesToUserModal>
        </section>
    )
        ;
}

export default MainSection;
