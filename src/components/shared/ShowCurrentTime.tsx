import React, {useEffect, useState} from 'react';
import {cn} from "../../../utils";

type IProps = {
    className?: string
}

function ShowCurrentTime(props: IProps) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // updating time after 1/2 second
    useEffect(() => {
        setInterval(() => setCurrentDate(new Date()), 30000);
    }, []);
    return (
        <h1 className={cn('text-center', props.className)}> {currentDate.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        })}
        </h1>
    );
}

export default ShowCurrentTime;