'use client';
import React, {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {registerCompanySchema} from '../../../../../utils/validation';
import {signIn} from 'next-auth/react';
import {cn, fetcher, postFetcher} from '../../../../../utils';
import {ArrowRight, Plus} from 'lucide-react';
import Link from 'next/link';
import {z} from 'zod';
import { Snackbar, Slide } from '@mui/material';

import {
    Button,
    Box,
    FormControl,
    TextField,
    FormHelperText,
} from '@mui/material';
import {Controller, useForm} from 'react-hook-form';
import useSWR from "swr";
import {Dropzone, DropzoneIdle, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {Group, rem, Text} from "@mantine/core";
import {DropzoneImg} from "@/components/shared/DropzoneImg";
import {axiosPostHandler} from "../../../../../utils/axios";
import {useAuth} from "@/context/AuthProvider";

type FormFields = z.infer<typeof registerCompanySchema>;
type props = {
    className?: string;
};

function CreateCompanyForm({className}: props) {
    const {user} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [postData, setPostData] = useState('');
    // controlling img value
    const [imgValue, setImgValue] = useState();
    const [showImg, setShowImg] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<false | string>(false);

    // react form-hook
    const {control, handleSubmit} = useForm<FormFields>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: zodResolver(registerCompanySchema),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            image: ''
        },
    });

    const submitRegister = async(values) => {
        setIsLoading(true);

        const payload = values;
        payload.userEmail = user.email;

        try{
        const res = await axiosPostHandler('company', payload);
        console.log(res);
        } catch (err) {
            if(err.error == 'user already signed to a company') {
                setErrMsg('User already signed to a company');
                return;
            }
            setErrMsg('There was a error');
            return;
        }

        setIsLoading(false);
        setShowImg(true);

    };

    const handleImgDrop = async(img) => {
        const formData = new FormData();
         formData.append('image', img[0]);
         try{
        const res = await axiosPostHandler('upload-company-img', formData,  { "Content-Type": 'multipart/form-data' });
        console.log(res);}
        catch (err) {
             console.log(err);
        }

        // fetch('http://MY_UPLOAD_SERVER.COM/api/upload', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     },
        //     body: formData
        // })
    };

    const handleToastClose = () => {
        setErrMsg(false);
        setIsLoading(false);
    };

    return (
        
        <div className={cn('', className)}>
            {!showImg ?
            <form
                className={'flex'}
                noValidate
                onSubmit={handleSubmit(submitRegister)}
            >
                <Box
                    className={
                        'flex flex-col mx-auto rounded text-neutral-400 bg-slate-300 shadow-2xl'
                    }
                    sx={{display: 'flex', gap: '1rem', p: '1rem'}}
                >
                    <Controller
                        name="name"
                        control={control}
                        render={({
                                     field: {value, onChange, onBlur, ref},
                                     fieldState: {error},
                                 }) => (
                            <FormControl className={'h-[5rem]'}>
                                <TextField
                                    variant={'standard'}
                                    id={'Name'}
                                    name={'Name'}
                                    label={'Company Name'}
                                    placeholder="Microsoft"
                                    inputRef={ref}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={Boolean(error)}
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({
                                     field: {value, onChange, onBlur, ref},
                                     fieldState: {error},
                                 }) => (
                            <FormControl className={'h-[5rem]'}>
                                <TextField
                                    variant={'standard'}
                                    id={'Email'}
                                    name={'Email'}
                                    label={'Email'}
                                    placeholder="microsoft@mail.com"
                                    inputRef={ref}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={Boolean(error)}
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({
                                     field: {value, onChange, onBlur, ref},
                                     fieldState: {error},
                                 }) => (
                            <FormControl className={'h-[5rem]'}>
                                <TextField
                                    variant={'standard'}
                                    id={'Phone'}
                                    name={'Phone'}
                                    label={'Phone'}
                                    placeholder="43 93324-7878"
                                    inputRef={ref}
                                    value={value}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    error={Boolean(error)}
                                />
                                <FormHelperText
                                    sx={{
                                        color: 'error.main',
                                    }}
                                >
                                    {error?.message ?? ''}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                    <Button
                        color={'primary'}
                        className={
                            'px-8 py-1 border bg-gray-900 border-gray-600 hover:border-gray-600 rounded-lg text-slate-200 hover:bg-transparent hover:text-black'
                        }
                        variant={'outlined'}
                        type="submit"
                        role={'button'}
                        name={'Login'}
                    >
                        {!isLoading ? <Plus/> : <h1>Creating...</h1> }
                    </Button>
                </Box>
            </form>
                      :
                <div className={'flex flex-col justify-center w-8/12 mx-auto'}>
                    <DropzoneImg handleDropImg={handleImgDrop}></DropzoneImg>
                    <Button variant={'outlined'} className={'w-[50%] mx-auto mt-[4rem]'}><Link href={'/'}>Continue without logo</Link></Button>
                </div>
                    }

            <Snackbar
                open={errMsg !== false}
                autoHideDuration={4000}
                onClose={handleToastClose}
                message="User already signed to a company"
                className={'bg-red-600 text-black font-bold'}
                ContentProps={{
                    classes: {
                        root: 'bg-red-600 text-black font-bold',
                    },
                }}
            />
                    </div>
    );
}

export default CreateCompanyForm;
