import React, {useEffect, useState} from 'react';
import {AlarmClock} from "lucide-react";
import {Button} from "@mui/material";
import ShowCurrentTime from "@/components/shared/ShowCurrentTime";
import {ITimes} from "@/types";
import {axiosGetHandler} from "../../../utils/axios";

type IProps = {
    userId: number
}

function RegisterTimeSection(props: IProps) {
    const [timeData, setTimeData] = useState<ITimes>();

    const retrieveUserTimes = async () => {
        try {
            const data = await axiosGetHandler(`time?userId=${props.userId}`);

            console.log('data : ',data);
            console.log('userId: ',props.userId);
        } catch (err) {
            console.log(err);
        }
    };

    // retrieving user times
    useEffect(() => {
        retrieveUserTimes();
    }, []);

    return (
        <section className={'flex flex-col'}>
            <div className={'w-screen'}>
                <ShowCurrentTime className={'font-bold text-[3rem]'}/>
                <AlarmClock className={'mx-auto'} size={300}/>
            </div>
            <div>
                <Button>Add your times</Button>
            </div>
        </section>
    );
}

export default RegisterTimeSection;