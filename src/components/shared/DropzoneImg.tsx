import { Group, Text, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import React from "react";
import {Snackbar} from '@mui/material';
export function DropzoneImg({handleDropImg}) {
    const handleToastClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <Dropzone
            className={'bg-blue-300 rounded text-center'}
            onDrop={(files) =>
                handleDropImg(files)
            }
            onReject={(files) =>
                <Snackbar
                    open={true}
                    autoHideDuration={4000}
                    onClose={handleToastClose}
                    message="Image not accepted"
                    className={'bg-red-600 text-black font-bold'}
                    ContentProps={{
                        classes: {
                            root: 'bg-red-600 text-black font-bold',
                        },
                    }}
                />
            }
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
        >
            <Group className={''}>
                <div className={'text-center w-full p-4 cursor-pointer'}>
                    <h1 className={'text-center font-bold'}>
                        Drag images here or click to select files
                    </h1>
                    <Text
                        size="sm"
                        color="dimmed"
                        inline
                        mt={7}
                    >
                        Attach your company logo
                    </Text>
                </div>
            </Group>
        </Dropzone>
    );
}