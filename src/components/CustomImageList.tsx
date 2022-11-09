import { Grid, ImageList, ImageListItem } from '@mui/material';
import { useStyles } from '../mui-style';

function CustomImageList({ data }: { data: string[] }) {
    const { classes, cx } = useStyles();

    return (
        <Grid container>
            <ImageList cols={7} rowHeight={'auto'} className={cx(classes.marginContainer)}>
                {data.map((url) => {
                    const fileName = url.match(/([^/]+)(?=\.\w+$)/)![0] ?? Math.random().toString(36).substring(2);
                    return (
                        <ImageListItem key={fileName}>
                            <img src={url} alt={fileName} loading="lazy" />
                        </ImageListItem>
                    );
                })}
            </ImageList>
        </Grid>
    );
}

export default CustomImageList;
