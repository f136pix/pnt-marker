import {ITimes, IRegisteredTime} from "@/types";

type IProps = {
    timeData: ITimes,
    RegisteredTimes: IRegisteredTime
};

type ITimeComponentTypes = {
    Labels: string;
    Times: string;
}[];

function TimeComponent(data: ITimeComponentTypes) {
    return (
        <div>
            {
                data.map((item) => {
                        return (
                            <div>
                                <li><h1 className={"font-bold text-xl text-white"}>{item.Labels}</h1></li>
                                <li>
                                    {props.RegisteredTimes.entryTime === undefined ?
                                        <h1 className={"font-bold text-xl text-neutral-400 border-2 border-neutral-400 rounded-full"}>{props.timeData.entryTime}</h1> :
                                        <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.entryTime}</h1>}
                                </li>
                            </div>
                        )
                    }
                )
            }
        </div>
    )
}

const mappingValues = [{
    label: 'Entry Time',
    time: 'entryTime'
}, {
    label: 'Launch Start',
    time: 'launchTimeStart'
}, {
    label: 'Launch End',
    time: 'launchTimeEnd'
}, {
    label: 'Exit Time',
    time: 'exitTime'
}];

export function RegisteredTimeSection(props: IProps) {
    return (
        <section className={'w-screen flex justify-center'}>
            <div className={"flex flex-row w-8/12 justify-around text-center"}>
                <div>
                    <li><h1 className={"font-bold text-xl text-white"}>Entry Time</h1></li>
                    <li>
                        {props.RegisteredTimes.entryTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400 border-2 border-neutral-400 rounded-full"}>{props.timeData.entryTime}</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.entryTime}</h1>}
                    </li>
                </div>
                <div>
                    <li><h1 className={"font-bold text-xl text-white"}>Launch Start</h1></li>
                    <li>
                        {props.RegisteredTimes.entryTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400 border-2 border-neutral-400 rounded-full"}>{props.timeData.entryTime}</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.launchTimeStart}</h1>}
                    </li>
                </div>
                <div>
                    <li><h1 className={"font-bold text-xl text-white"}>Launch End</h1></li>
                    <li>
                        {props.RegisteredTimes.entryTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400 border-2 border-neutral-400 rounded-full"}>{props.timeData.entryTime}</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.LAu}</h1>}
                    </li>
                </div>
                <div>
                    <li><h1 className={"font-bold text-xl text-white"}>Launch Start</h1></li>
                    <li>
                        {props.RegisteredTimes.entryTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400 border-2 border-neutral-400 rounded-full"}>{props.timeData.entryTime}</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.launchTimeStart}</h1>}
                    </li>
                </div>
            </div>
        </section>);
}
