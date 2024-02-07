'use client';
import React, { useEffect, useState } from 'react';
import LoginForm from '@/app/OAuth/login/LoginForm/LoginForm';
import { Button } from '@mui/material';
import { signIn } from 'next-auth/react';
import SimpleFooter from '@/components/shared/SimpleFooter';
import { useRouter, useSearchParams } from 'next/navigation';
import { Snackbar } from '@mui/material';

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // @ts-ignore
  const showToast = searchParams.get('toast');
  const [showToastMsg, setShowToast] = useState(false);
  useEffect(() => {
    checkIfShouldToast();
  }, []);

  const checkIfShouldToast = () => {
    if (showToast) {
      setShowToast(true);
    }
  };

  const handleToastClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowToast(false);
  };

  return (
    <div
      className={
        'font-bold flex flex-col text-center max-h-screen min-h-screen h-screen bg-slate-200'
      }
    >
      <h1 className={'text-[5rem] mt-[1rem] cursor-pointer'}>
        <a href={'https://github.com/'}>pnt-Mrkr</a>
      </h1>
      <LoginForm className={'mt-[2rem]'} />
      <Snackbar
        open={showToastMsg}
        autoHideDuration={4000}
        onClose={handleToastClose}
        message="Login to acess the site"
        className={'bg-red-600 text-black font-bold'}
        ContentProps={{
          classes: {
            root: 'bg-red-600 text-black font-bold',
          },
        }}
      />
      <SimpleFooter></SimpleFooter>
    </div>
  );
}

export default Page;
