"use client";
import React from 'react';
import {Button} from "@mui/material";
import {ICompany, IUser} from "@/types";
import {AtSign, Delete, Mails, Phone} from "lucide-react";
import {TextField} from '@mui/material'
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';


type props = {
    data: ICompany
}

function CompanyUsersList({data} : props) {
    const companyUsers : IUser[] | undefined = data.users;
    const logData = () => {
        console.log(data);
    };

    return (
        <div className={'w-screen'}>
            <div className={'bg-slate-900 h-auto w-[80%] mx-auto rounded mt-[2rem] text-center flex flex-col pb-[2rem] shadow-2xl'}>
                <h1 className={'font-bold text-neutral-200 text-[4rem] uppercase'}>{data.name}</h1>
                <section className={'flex flex-col align-middle mt-[1rem] justify-center'}>
                    <div className={'flex w-full h-[3rem] bg-neutral-100 items-center hover:bg-neutral-300 transition'}>
                        <Mails size={15} className={'absolute ml-8'}/>
                        <h2 className={'w-[50%] mx-auto bg-transparent'}>{data.email}</h2>
                    </div>
                    <div className={'flex w-full h-[3rem] bg-neutral-100 items-center hover:bg-neutral-300 transition'}>
                        <Phone size={15} className={'absolute ml-8'}/>
                        <h2 className={'bg-transparent w-[50%] mx-auto'}>{data.phone}</h2>
                    </div>
                </section>
                <section>
                    <h1 className={'text-bold text-[3rem] text-neutral-400'}>Team Members</h1>
                        <FixedSizeList
                            height={300}
                            width={360}
                            itemSize={46}
                            itemCount={companyUsers?.length}
                            overscanCount={5}
                            className={'mx-auto bg-neutral-100 rounded'}
                        >
                            {(props) => renderRow(props, companyUsers)}
                        </FixedSizeList>
                    <div className={'flex flex-col text-center mt-[1rem]'}>
                    <a className={'text-neutral-200'}>Add users</a>
                    <Button variant={'outlined'} color={'success'} className={'rounded-3xl text-white border-white w-[2rem] mx-auto'}>+</Button>
                    </div>
                </section>
            </div>
        </div>
    );
}

// renders users in the users-list
function renderRow(props: ListChildComponentProps, data: IUser[], ) {
    const { index, style } = props;
    console.log(data[index]);
    return (
    <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton className={'flex cursor-default'}>
            <ListItemText className={'w-[90%]'} primary={`${data[index].name}`} />
            <ListItemText className={'w-[10%] text-end text-red-700 text-bold text-xl cursor-pointer hover:text-red-500 transition'}>{data[index].role < 3 ?<Delete/> : ''} </ListItemText>
        </ListItemButton>
    </ListItem>
    );

}

// renders add user list



export default CompanyUsersList;