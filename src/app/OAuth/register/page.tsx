"use client"
import React from 'react';
import LoginForm from "@/app/OAuth/login/LoginForm/LoginForm";
import {Button} from "@mui/material"
import {signIn} from "next-auth/react";
import SimpleFooter from "@/components/shared/SimpleFooter";
import RegisterForm from "@/app/OAuth/register/RegisterForm/RegisterForm";

function Page() {
    return (
        <div className={'font-bold flex flex-col text-center max-h-screen min-h-screen h-screen bg-slate-200'}>
            <h1 className={'text-[5rem] mt-[1rem] cursor-pointer'}><a href={'https://github.com/'}>pnt-Mrkr</a></h1>
            <RegisterForm className={'mt-[2rem]'}/>
            <SimpleFooter></SimpleFooter>
        </div>
    );
}



export default Page;
