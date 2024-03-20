import {ITimes, IRegisteredTime} from "@/types";

type IProps = {
    timeData: ITimes,
    RegisteredTimes: IRegisteredTime
};

export function RegisteredTimeSection(props: IProps) {
    return (
        <section className={'w-screen flex justify-center'}>
            <div className={"flex flex-row w-8/12 justify-around"}>
                <ul className={"flex flex-col"}>
                    <li><h1 className={"font-bold text-xl"}>Entry Time</h1></li>
                    <li><h1 className={"font-bold text-xl"}>Launch Start</h1></li>
                    <li><h1 className={"font-bold text-xl"}>Launch End</h1></li>
                    <li><h1 className={"font-bold text-xl"}>Exit Time</h1></li>
                </ul>
                <ul className={"flex flex-col"}>
                    <li>
                        {props.RegisteredTimes.entryTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400"}>{props.timeData.entryTime}</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.entryTime}</h1>}
                    </li>
                    <li>
                        {props.RegisteredTimes.launchTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400"}>LaunchStart</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.launchTimeStart}</h1>}
                    </li>
                    <li>
                        {props.RegisteredTimes.launchTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400"}>LaunchEnd</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.launchTimeEnd}</h1>}
                    </li>
                    <li>
                        {props.RegisteredTimes.exitTime === undefined ?
                            <h1 className={"font-bold text-xl text-neutral-400"}>{props.timeData.exitTime}</h1> :
                            <h1 className={"font-bold text-xl"}>{props.RegisteredTimes.exitTime}</h1>}
                    </li>
                </ul>
            </div>
        </section>);
}