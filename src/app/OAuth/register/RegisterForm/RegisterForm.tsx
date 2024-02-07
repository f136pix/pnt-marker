'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { registerValidationSchema } from '../../../../../utils/validation';
import {
  Button,
  Box,
  FormControl,
  TextField,
  FormHelperText,
} from '@mui/material';
import { cn } from '../../../../../utils';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

type FormFields = z.infer<typeof registerValidationSchema>;

function RegisterForm({ className }) {
  // react form-hook
  const { control, handleSubmit } = useForm<FormFields>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const submitRegister = () => {
    console.log('teste de registro');
  };

  return (
    <div className={cn('', className)}>
      <form
        className={'flex'}
        noValidate
        onSubmit={handleSubmit(submitRegister)}
      >
        <Box
          className={'flex flex-col mx-auto'}
          sx={{ display: 'flex', gap: '1rem', p: '1rem' }}
        >
          <Controller
            name="email"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl className={'h-[5rem]'}>
                <TextField
                  variant={'filled'}
                  id={'Email'}
                  name={'Email'}
                  label={'Email'}
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
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl className={'h-[5rem]'}>
                <TextField
                  variant={'filled'}
                  id={'Password'}
                  name={'Password'}
                  label={'Password'}
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
          <Controller
            name="confirmPassword"
            control={control}
            render={({
              field: { value, onChange, onBlur, ref },
              fieldState: { error },
            }) => (
              <FormControl>
                <TextField
                  variant={'filled'}
                  id={'Password'}
                  name={'Password'}
                  label={'Password'}
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
          <Button
            color={'primary'}
            className={
              'mt-[2rem] px-8 py-1 border bg-gray-900 border-gray-600 hover:border-gray-600 rounded-lg text-slate-200 hover:bg-transparent hover:text-black'
            }
            variant={'outlined'}
            type="submit"
            role={'button'}
            name={'Login'}
          >
            <ArrowRight />
          </Button>
        </Box>
      </form>
      <h3>
        Already have a account?{' '}
        <Link
          href={'http://localhost:3000/OAuth/login'}
          className={'text-blue-700 hover:underline'}
        >
          Sign In
        </Link>
      </h3>
    </div>
  );
}

export default RegisterForm;
