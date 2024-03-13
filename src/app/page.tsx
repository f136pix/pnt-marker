'use client';
import Image from 'next/image';
import {useSession} from 'next-auth/react';
import jwt from 'jsonwebtoken';
import Header from '@/components/shared/Header';
import {useAuth} from '@/context/AuthProvider';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import {Snackbar, Button} from '@mui/material';
import useSWR from 'swr';
import {fetcher} from '../../utils';
import {IUser} from '@/types';
import ScreenWrapper from "../../utils/components/ScreenWrapper";
import RegisterTimeSection from "@/components/shared/RegisterTimeSection";

export default function Home() {
    const {user} = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    // @ts-ignore
    const wasLogged = searchParams.get('logged');
    const [showLoggedToast, setShowLoggedToast] = useState(false);

    // checks if toast must be showed
    useEffect(() => {
        checkIfWasLogged();
        //console.log(user);
    }, []);

    const checkIfWasLogged = () => {
        if (wasLogged) {
            setShowLoggedToast(true);
        }
    };

    const handleWasLoggedToastClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowLoggedToast(false);
    };

    return (
        <ScreenWrapper className={'bg-gray-100'}>
            <Header className={'mb-[4rem]'}/>
            <RegisterTimeSection userId={user?.id}/>
            <Snackbar
                open={showLoggedToast}
                autoHideDuration={5000}
                onClose={handleWasLoggedToastClose}
                message="User logged in"
                className={'bg-green-600 text-black font-bold'}
                ContentProps={{
                    classes: {
                        root: 'bg-green-600 text-black font-bold',
                    },
                }}
            />
        </ScreenWrapper>
    );
}
