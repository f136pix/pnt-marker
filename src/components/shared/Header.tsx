'use client';
import React from 'react';
import {Button} from '@mui/material';
import {signOut} from 'next-auth/react';
import {LogOut, Settings, Settings2, Users} from 'lucide-react';
import {usePathname, useRouter} from 'next/navigation';
import {IUser} from '@/types';
import {useAuth} from '@/context/AuthProvider';
import Link from 'next/link';

function Header() {
    const router = useRouter();
    const {user} = useAuth();
    const pathname = usePathname();

    const handleOAuthSignOut = () => {
        //e.preventDefault()
        signOut();
    };

    let headerTxt = 'Create company';
    if (pathname == '/company/create') {
        headerTxt = ' ';
    }

    return (
        <nav
            className={
                'bg-slate-900 h-[4rem] flex flex-row justify-between w-screen items-center'
            }
        >
            <div
                className={
                    'w-4/12 content-center flex justify-center content-center items-center'
                }
            >
                <h1
                    className={'text-slate-300 hover:text-slate-500 w-6/12 text-center'}
                >
                    {user?.name}
                </h1>{' '}
                {user?.companyId ? (
                    <a className={'text-slate-300 hover:text-slate-500 w-6/12 text-center'}>{'#' + user.companyId}</a>
                ) : (
                    <Button className={'ml-[1rem] content-center w-6/12 text-center'}>
                        <Link href={'/company/create'}>{headerTxt}</Link>
                    </Button>
                )}
            </div>
            <div className={'w-4/12 flex justify-center'}>
                <h1 className={'text-[3rem] mb-[1.5%] cursor-pointer text-slate-200'}>
                    <a href={'https://github.com/'}>pnt-Mrkr</a>
                </h1>
            </div>

            <div className={'w-4/12 flex justify-around'}>
                {user?.role > 1 ?
                    <Button className={''}>
                        <Link href={`/company/${user?.companyId}`}>
                            <Users
                                className={'content-center text-slate-300 hover:text-slate-500'}
                            />
                        </Link>
                    </Button> :
                    <></>}

                <Button className={''}>
                    <Settings2
                        className={'content-center text-slate-300 hover:text-slate-500'}
                    />
                </Button>
                <Button onClick={handleOAuthSignOut} className={''}>
                    <LogOut
                        className={'content-center text-slate-300 hover:text-slate-500'}
                    />
                </Button>
            </div>
        </nav>
    );
}

export default Header;
