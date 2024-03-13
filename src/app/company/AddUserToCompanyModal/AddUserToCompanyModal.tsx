"use client";
import React, {useEffect, useState} from 'react';
import {
    Button,
    Modal,
    Box,
    Typography,
    Backdrop,
    Fade,
    ListItem,
    ListItemText,
    ListItemButton,
} from '@mui/material';
import {axiosGetHandler, axiosPostHandler} from "../../../../utils/axios";
import {IUser} from "@/types";
import {ListChildComponentProps, FixedSizeList} from "react-window";
import {PlusCircle} from "lucide-react";


type IProps = {
    isOpen: boolean,
    handleClose: () => void,
    companyId : number
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#4e5a65',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddUserToCompanyModal({isOpen, handleClose, companyId}: IProps) {
    const [users, setUsers] = useState<IUser[]>([]);
    const retrieveUnasignedUsersData = async () => {
        try {
            const data = await axiosGetHandler(`user?noCompany=true`);
            console.log(data.data.users);
            setUsers(data.data.users);
        } catch (err) {
            console.log(err);
        }
    };

    const manageUpdate = () => {
       retrieveUnasignedUsersData() ;
    };

    useEffect(() => {
        retrieveUnasignedUsersData();
    }, [isOpen]);

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={isOpen}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h1 className={'font-bold text-[1.5rem] text-neutral-200'}>Add users to your company</h1>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{mt: 2}}>
                            <FixedSizeList
                                height={300}
                                width={360}
                                itemSize={46}
                                itemCount={users?.length}
                                overscanCount={5}
                                className={'mx-auto rounded'}
                            >
                                {(props) => renderRow(props, users, manageUpdate, companyId)}
                            </FixedSizeList>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


function renderRow(props: ListChildComponentProps, data: IUser[] | undefined, updateList: Promise<void>, companyId: number) {
    const {index, style} = props;

    async function assignUserToCompany(id: number) {
        const payload = {
            "id": id,
            "user": {
                "companyId": companyId
            }

        };
        const res = await axiosPostHandler('user', payload);
        if (res.status == 200) {
            // @ts-ignore
            updateList();
            return;
        }
    }

    return (
        <ListItem style={style} key={index} component="div" disablePadding className={'my-[0.5rem]'}>
            <ListItemButton className={'flex cursor-default text-neutral-200'}>
               <ListItemText>{data[index]?.name}</ListItemText>
                <ListItemText className={'text-green-400 hover:text-green-600'}><PlusCircle size={20} className={'mx-auto cursor-pointer'} onClick={(() => assignUserToCompany(data[index]?.id))}/></ListItemText>
            </ListItemButton>
        </ListItem>
    );
}

export default AddUserToCompanyModal;

