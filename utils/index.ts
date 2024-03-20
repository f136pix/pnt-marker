import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {useSession} from 'next-auth/react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function decodeToken(token: string) {
    const decodedJwt = await jwt.decode(
        token,
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    );
    return decodedJwt;
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const postFetcher = (url: string, data: any) =>
    axios.post(url, data).then((res) => res.data);

type IRawTime = {
    $H: number;
    $m: number;
};

export const timeFormatter = (time: IRawTime) => {
    console.log(time);
    let formattedHour: string;
    let formattedMinute : string;
    if (time.$H < 10) {
        formattedHour = `0${time.$H}`;
    } else {
        formattedHour = String(time.$H);
    }
    if(time.$m < 10) {
        formattedMinute = `0${time.$m}`;
    } else {
        formattedMinute = String(time.$m);
    }
    return `${formattedHour}:${formattedMinute}`;
};

export const addZero = (number: number) => {
    if (number < 10) {
        return `0${number}`;
    }
    return number;
};