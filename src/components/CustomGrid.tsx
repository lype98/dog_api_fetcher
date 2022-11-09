import { Grid, Typography } from '@mui/material';

function CustomGrid({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Grid item xs={3}>
            <Typography>{title}</Typography>
            {children}
        </Grid>
    );
}

export default CustomGrid;
