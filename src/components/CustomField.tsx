import { TextField } from '@mui/material';
import CustomGrid from './CustomGrid';

function CustomField({ title, value, error, onChange }: { title: string; value: string; error: boolean; onChange: (value: string) => void }) {
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <CustomGrid title={title}>
            <TextField
                error={error}
                variant="outlined"
                value={value}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                type="number"
                fullWidth
                onChange={changeHandler}
            />
        </CustomGrid>
    );
}

export default CustomField;
