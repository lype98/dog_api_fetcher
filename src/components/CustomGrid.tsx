import { Grid, Typography } from '@mui/material';
import { useStyles } from '../mui-style';

function CustomGrid({ title, className, children }: { title?: string; className?: string; children: React.ReactNode }) {
    const { classes, cx } = useStyles();

    return (
        <Grid item xs={6} md={3} className={cx(...[className], classes.gridAlign)}>
            {title ? <Typography>{title}</Typography> : null}
            {children}
        </Grid>
    );
}

export default CustomGrid;
