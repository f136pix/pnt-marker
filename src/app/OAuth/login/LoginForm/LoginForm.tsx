"use client"

import React from 'react';
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useForm, Controller} from "react-hook-form";
import {loginValidationSchema} from "../../../../../utils/validation";
import {Button, Box, FormControl, TextField, FormHelperText} from '@mui/material'
import {signIn} from "next-auth/react";
import {cn} from "../../../../../utils";
import {className} from "postcss-selector-parser";
import Link from "next/link";
import {ArrowRight} from "lucide-react";

type FormFields = z.infer<typeof loginValidationSchema>

function LoginForm({className}) {
    // react form-hook
    const {control, handleSubmit} = useForm<FormFields>({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: zodResolver(loginValidationSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const handleOAuthSignin = (e) => {
        e.preventDefault()
        signIn("google")
    }

    const submitLogin = () => {
        console.log('logado')
    }

    return (
        <div className={cn('', className)}>
            <form className={'flex'} noValidate onSubmit={handleSubmit(submitLogin)}>
                <Box className={'flex flex-col mx-auto'} sx={{display: 'flex', gap: '1rem', p: '1rem'}}>
                    <Controller
                        name="email"
                        control={control}
                        render={({
                                     field: {value, onChange, onBlur, ref},
                                     fieldState: {error},
                                 }) => (
                            <FormControl className={'h-[5rem]'}>
                                <TextField
                                    variant={'filled'}
                                    id={"Email"}
                                    name={"Email"}
                                    label={"Email"}
                                    placeholder="youremail@mail.com"
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
                        name="password"
                        control={control}
                        render={({
                                     field: {value, onChange, onBlur, ref},
                                     fieldState: {error},
                                 }) => (
                            <FormControl className={'h-[5rem]'}>
                                <TextField
                                    variant={'filled'}
                                    id={"Password"}
                                    name={"Password"}
                                    label={"Password"}
                                    placeholder="*******"
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
                    <Button color={'primary'} className={'px-8 py-1 border bg-gray-900 border-gray-600 hover:border-gray-600 rounded-lg text-slate-200 hover:bg-transparent hover:text-black'} variant={'outlined'} type="submit" role={'button'} name={'Login'}><ArrowRight/></Button>
                </Box>
            </form>
            <h3>Dont´t have a account? <Link href={"http://localhost:3000/OAuth/register"} className={'text-blue-700 hover:underline'}>Sign Up</Link></h3>
            <div className="flex items-center justify-center">
                <button
                    href={"#"} onClick={handleOAuthSignin} className="bg-gray-900 mt-10 px-8 py-4 border flex gap-2 border-slate-200 rounded-lg text-slate-200 hover:bg-transparent hover:text-black hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy"
                         alt="google logo"/>
                    <span>Login with Google</span>
                </button>
            </div>
        </div>
    );
}

export default LoginForm;