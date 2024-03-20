"use client";
import React, {useState} from 'react';
import {Button} from "@mui/material";
import {ICompany, IUser} from "@/types";
import {ArrowLeft, AtSign, Crown, Delete, Mails, Phone} from "lucide-react";
import {TextField, Alert, Fade, Zoom} from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import {axiosGetHandler, axiosPostHandler} from "../../../../utils/axios";
import Dropdown from "@/components/shared/Dropdown";
import AddUserToCompanyModal from "@/app/company/AddUserToCompanyModal/AddUserToCompanyModal";
import Link from "next/link";


type props = {
    data: ICompany,
    refreshUsers: Promise<void>
}

function CompanyUsersList({data, refreshUsers}: props) {
    const [companyUsers, setCompanyUsers] = useState<IUser[] | undefined>(data.users);
    const [showBanner, setShowBanner] = useState(false);
    // add user modal handlers
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    // updates list once the modal is closed
    const handleClose = () => {
        setOpen(false);
        updateUserData();
    };

    const manageShowBanner = async () => {
        updateUserData(); // updating user data with the change that just was made
        setShowBanner(true);
        setTimeout(() => {
            setShowBanner(false);
        }, 3000);
    };

    // retrieves updated userData
    const updateUserData = async () => {
        try {
            data = await axiosGetHandler(`company?id=${data.id}`);
            setCompanyUsers(data.data.company.users);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className={'w-screen mb-2'}>
            <Link href={'/'}><ArrowLeft size={48} className={'font-extrabold absolute ml-4 mt-[2%] text-zinc-800 hover:text-black transition cursor-pointer'} ></ArrowLeft></Link>
            <div
                className={'bg-slate-900 h-auto w-[80%] mx-auto rounded mt-[2rem] text-center flex flex-col pb-[2rem] shadow-2xl'}>
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
                        {(props) => renderRow(props, companyUsers, manageShowBanner)}
                    </FixedSizeList>
                    <div className={'flex flex-col text-center mt-[1rem] h-[5rem]'}>
                        <Button variant={'outlined'} color={'success'}
                                className={'rounded-3xl text-white border-white w-[2rem] mx-auto mb-[1rem]'}
                                onClick={handleOpen}>+</Button>
                        <Zoom in={showBanner} className={'mb-6 w-auto h-[4rem] mx-auto'}>{DeleteBanner}</Zoom>
                    </div>
                </section>
            </div>
            <AddUserToCompanyModal isOpen={open} handleClose={handleClose} companyId={data.id}/>
        </div>
    );
}

// renders users in the users-list
function renderRow(props: ListChildComponentProps, data: IUser[] | undefined, showBanner: Promise<void>) {
    const {index, style} = props;

    async function unassignUserToCompany(id: number) {
        const payload = {
            "id": id,
            "user": {
                "companyId": null
            }

        };
        const res = await axiosPostHandler('user', payload);
        if (res.status == 200) {
            // @ts-ignore
            showBanner();
            return;
        }
    }

    async function updateUserRole(id: number, role: number): Promise<void> {
        const payload = {
            "id": id,
            "user": {
                "role": role
            }

        };
        const res = await axiosPostHandler('user', payload);
        console.log(res);
        if (res.status == 200) {
            // @ts-ignore
            console.log("ok");
            return;
        }
    }

    return (
        <ListItem style={style} key={index} component="div" disablePadding className={'my-[0.5rem]'}>
            <ListItemButton className={'flex cursor-default'}>
                <ListItemText className={'w-[60%]'} primary={`${data[index]?.name}`}/>
                <ListItemText className={'w-[26%] mr-[1rem]'}>{data[index]?.role < 3 ? (
                    <Dropdown callback={updateUserRole} id={data[index]?.id}
                              role={data[index]?.role}/>) : ''} </ListItemText>
                <ListItemText
                    className={'w-[10%] text-end text-red-700 text-bold text-xl cursor-pointer hover:text-red-500 transition'}>{data[index].role < 3 ?
                    <Delete onClick={(() => unassignUserToCompany(data[index].id))}/> : (
                        <Crown className={'text-black'}/>)} </ListItemText>
            </ListItemButton>
        </ListItem>
    );
}


const DeleteBanner = (
    <Alert variant={'filled'} severity="success" color="warning"
           className={'w-[10rem] mx-auto transform transition'}>User removed</Alert>
);


export default CompanyUsersList;