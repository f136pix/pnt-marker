import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

type props = {
    callback: (id: number, role: number) => Promise<void>,
    id: number,
    role: number}

function Dropdown(props: props) {
    const [role, setRole] = React.useState(props.role);

    const handleChange = (event: SelectChangeEvent) => {
        setRole(event.target.value as number);
        props.callback(props.id, event.target.value as number);
    };

    return (
        <div className={'w-full'}>
            <FormControl fullWidth variant={'standard'}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={1}>User</MenuItem>
                    <MenuItem value={2}>Admin</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}

export default Dropdown;
