import React, {useState} from 'react';
import {
    Button,
    Modal,
    Box,
    Typography,
    Backdrop,
    Fade,
    FormControl,
    TextField,
    FormHelperText
} from '@mui/material';
import {brown} from '@mui/material/colors';
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {timeValidationSchema} from "../../../utils/validation";
import {z} from "zod";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {postFetcher, timeFormatter} from "../../../utils";
import Alert from '@mui/material/Alert';

type IProps = {
    isOpen: boolean,
    userId: number,
    handleClose: () => void
};

const blueBg = brown[200];
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: blueBg,
    boxShadow: 24,
    borderRadius: 5,
};

function AddTimesToUserModal({isOpen, userId, handleClose}: IProps) {
    const [errMsg, setErrMsg] = useState<String | null>(null);

    // dont use any formfields here
    const {control, handleSubmit} = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const submitValues = (values: any) => {
        // if statement checking if times are valid
        if (!values.entryTime || !values.exitTime || !values.launchTime) {
            console.log('invalid times');
            setErrMsg('Please fill all the fields');
            return;
        }
        if (values.entryTime > values.exitTime) {
            setErrMsg('Entry time must be before exit time');
            return;
        }

        setErrMsg(null);
        const launchTime = timeFormatter(values.launchTime);
        const entryTime = timeFormatter(values.entryTime);
        const exitTime = timeFormatter(values.exitTime);

        console.log({entryTime, exitTime, launchTime, userId});
        postFetcher('/api/time', {entryTime, exitTime, launchTime, userId}).then(
            (response) => {
                console.log(response);
                handleClose();
            }
        );
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                <h1 className={'font-bold text-[1.5rem] text-black pl-8 pt-4 mb-4'}>Add the working times</h1>
                            </Typography>
                            <form className={'flex'} noValidate onSubmit={handleSubmit(submitValues)}>
                                <Box
                                    className={'flex flex-col mx-auto'}
                                    sx={{display: 'flex', gap: '1rem', p: '1rem'}}
                                >
                                    <Controller
                                        name="entryTime"
                                        control={control}
                                        render={({
                                                     field: {value, onChange, onBlur, ref},
                                                     fieldState: {error},
                                                 }) => (
                                            <FormControl className={'h-[5rem]'}>
                                                <TimePicker
                                                    className={'shadow'}
                                                    label="Entry time"
                                                    name={'Email'}
                                                    onChange={onChange}
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
                                        name="exitTime"
                                        control={control}
                                        render={({
                                                     field: {value, onChange, onBlur, ref},
                                                     fieldState: {error},
                                                 }) => (
                                            <FormControl className={'h-[5rem]'}>
                                                <TimePicker
                                                    className={'shadow'}
                                                    label="Exit time"
                                                    name={'Email'}
                                                    inputRef={ref}
                                                    value={value}
                                                    onChange={onChange}
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
                                        name="launchTime"
                                        control={control}
                                        render={({
                                                     field: {value, onChange, onBlur, ref},
                                                     fieldState: {error},
                                                 }) => (
                                            <FormControl className={'h-[5rem]'}>
                                                <TimePicker
                                                    className={'shadow'}
                                                    label="Hours for Launch"
                                                    name={'Email'}
                                                    ampm={false}
                                                    inputRef={ref}
                                                    value={value}
                                                    onChange={onChange}
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
                                    {errMsg ?
                                        <Alert severity="error" style={{ position: 'absolute', top: '110%', left: '50%', transform: 'translate(-50%, -50%)', width: '110%', textAlign: 'center'}}>{errMsg}</Alert>
                                        :
                                        null}
                                    <Button type={'submit'} variant={'contained'} color={'success'} className={'bg-green-800'}>Enviar</Button>
                                </Box>
                            </form>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </LocalizationProvider>
    );
}

export default AddTimesToUserModal;