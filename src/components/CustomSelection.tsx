import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CustomGrid from './CustomGrid';

function CustomSelection({
    title,
    value,
    data,
    error,
    onChange,
}: {
    title: string;
    value: string;
    data: string[];
    error: boolean;
    onChange: (value: string) => void;
}) {
    const changeHandler = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value);
    };

    return (
        <CustomGrid title={title}>
            <FormControl error={error} fullWidth>
                <Select value={value} onChange={changeHandler} displayEmpty defaultValue="Select">
                    <MenuItem value="" disabled>
                        <em>Select</em>
                    </MenuItem>
                    {data.map((breed, index) => (
                        <MenuItem key={index} value={breed}>
                            {breed}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </CustomGrid>
    );
}

export default CustomSelection;
