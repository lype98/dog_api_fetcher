import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(() => ({
    btnPadding: {
        padding: '15px 15px',
    },
    marginContainer: {
        margin: '2%',
    },
    gridAlign: {
        marginTop: '1em',
        paddingRight: '2em',
        alignSelf: 'end',
    },
    textEnd: {
        '@media screen and (max-width:899px)': {
            textAlign: 'end',
        },
    },
}));
