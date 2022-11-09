import { Grid, ImageList, ImageListItem } from '@mui/material';

function CustomImageList({ data }: { data: string[] }) {
    return (
        <Grid container width={'80%'} marginTop={'2em'}>
            <ImageList cols={6}>
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
