"use client"
import React from 'react';
import {Button} from '@mui/material';
import {signOut} from "next-auth/react";
import {LogOut} from "lucide-react";
import {usePathname, useRouter} from 'next/navigation'
import {IUser} from "@/types";
import {useAuth} from "@/context/AuthProvider";
import Link from "next/link";

function Header() {
    const router = useRouter();
    const {user} = useAuth();
    const pathname = usePathname()

    const handleOAuthSignOut = () => {
        //e.preventDefault()
        signOut()
    }

    let headerTxt = 'Create company'
    if(pathname == '/company/create') {
        headerTxt = " "
    }
    
    return (
        <nav className={'bg-slate-900 h-[4rem] flex flex-row justify-between w-screen items-center'}>
            <div className={'w-4/12 content-center flex justify-center content-center items-center'}>
                <h1 className={'text-slate-300 hover:text-slate-500'}>{user?.name}</h1> {user?.companyId ? '#' + user.companyId :
                <Button className={'ml-[1rem] content-center'}><Link href={'/company/create'}>{headerTxt}</Link></Button>}
            </div>
            <div className={'w-4/12 flex justify-center'}>
                <h1 className={'text-[3rem] mb-[1.5%] cursor-pointer text-slate-200'}><a
                    href={'https://github.com/'}>pnt-Mrkr</a></h1>
            </div>

            <div className={'w-4/12 flex justify-center'}>
                <Button onClick={handleOAuthSignOut} className={''}>
                    <LogOut className={'content-center text-slate-300 hover:text-slate-500'}/>
                </Button>
            </div>
        </nav>
    );
}

export default Header;