import { useState, useEffect } from 'react';
import { Alert, Button, Grid, Snackbar } from '@mui/material';

import { Breeds } from './types';
import { fetchDogBreedList, fetchDogImages } from './remotes';
import { useStyles } from './mui-style';
import CustomSelection from './components/CustomSelection';
import CustomField from './components/CustomField';
import CustomImageList from './components/CustomImageList';

function App() {
    const { classes, cx } = useStyles();

    const [breedsList, setBreedsList] = useState<Breeds>({});
    const [subBreedList, setSubBreedList] = useState<string[]>([]);
    const [imageList, setImageList] = useState<string[]>([]);

    const [selectedBreed, setSelectedBreed] = useState('');
    const [selectedSubBreed, setSelectedSubBreed] = useState('');
    const [selectedNumber, setSelectedNumber] = useState('');

    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarError, setSnackBarError] = useState('');

    const [inputValidation, setInputValidation] = useState({
        breed: false,
        subBreed: false,
        imageAmount: false,
    });
    const [inputsHaveErrors, setInputsHaveErrors] = useState(false);

    const handleSelectedBreed = (value: string) => {
        setSelectedBreed(value);
        setInputValidation((prevState) => ({ ...prevState, breed: true }));
    };
    const handleSelectedSubBreed = (value: string) => {
        setSelectedSubBreed(value);
        setInputValidation((prevState) => ({ ...prevState, subBreed: true }));
    };
    const handleSelectedNumber = (value: string) => {
        setSelectedNumber(value);
        // invalid if number is 0 or less
        if (parseInt(value) <= 0) {
            return setInputValidation((prevState) => ({ ...prevState, imageAmount: false }));
        }
        setInputValidation((prevState) => ({ ...prevState, imageAmount: true }));
    };

    const toggleSnackBar = () => setSnackBarOpen(!snackBarOpen);

    const inputsValid = (): boolean => {
        // if subBreed input is invalid but there is nothing on the subBreedList that's fine
        if (inputValidation.breed === false || inputValidation.imageAmount === false || (inputValidation.subBreed === false && subBreedList.length > 0)) {
            return false;
        }
        return true;
    };

    const tryFetchDogAPI = async () => {
        try {
            const fullBreedList = await fetchDogBreedList();
            setBreedsList(fullBreedList);
        } catch (error) {
            console.error('unable to fetch from Dog API >>', error);
            setSnackBarError('unable to fetch from Dog API');
            setSnackBarOpen(true);
        }
    };

    const tryFetchDogImages = async () => {
        setImageList([]);
        if (inputsValid()) {
            try {
                const imageList = await fetchDogImages(selectedBreed, selectedSubBreed, selectedNumber);
                setImageList(imageList);
                setInputsHaveErrors(false);
            } catch (error) {
                console.error('unable to fetch images from Dog API >>', error);
                setSnackBarError('unable to fetch images from Dog API');
                setSnackBarOpen(true);
                setInputsHaveErrors(false);
            }
        } else {
            setInputsHaveErrors(true);
        }
    };

    // Fetch Dog API straight away
    useEffect(() => {
        tryFetchDogAPI();
    }, []);

    // when an input selection changes, remove the error border
    useEffect(() => {
        setInputsHaveErrors(false);
    }, [selectedBreed, selectedSubBreed, selectedNumber]);

    // when the breedList or the selectedBreed changes, set the subBreed to invalid and update the subBreedList
    useEffect(() => {
        setInputValidation((prevState) => ({ ...prevState, subBreed: false }));

        if (breedsList[selectedBreed]?.length) {
            setSubBreedList(breedsList[selectedBreed]);
            setSelectedSubBreed('');
        } else {
            setSubBreedList([]);
            setSelectedSubBreed('');
        }
    }, [breedsList, selectedBreed]);

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackBarOpen} onClose={toggleSnackBar} autoHideDuration={4000}>
                <Alert severity="error">{snackBarError}</Alert>
            </Snackbar>

            <Grid container gap={5} className={cx(classes.marginContainer)}>
                <CustomSelection
                    error={inputValidation.breed === false && inputsHaveErrors ? true : false}
                    title="Breed"
                    value={selectedBreed}
                    data={Object.keys(breedsList)}
                    onChange={handleSelectedBreed}
                ></CustomSelection>
                {subBreedList.length > 0 && (
                    <CustomSelection
                        error={inputValidation.subBreed === false && inputsHaveErrors ? true : false}
                        title="Sub Breed"
                        value={selectedSubBreed}
                        data={subBreedList}
                        onChange={handleSelectedSubBreed}
                    ></CustomSelection>
                )}
                <CustomField
                    error={inputValidation.imageAmount === false && inputsHaveErrors ? true : false}
                    title="Number of Images"
                    value={selectedNumber}
                    onChange={handleSelectedNumber}
                ></CustomField>
                <Button variant="outlined" onClick={tryFetchDogImages} className={cx(classes.shortBtn)}>
                    View Images
                </Button>
            </Grid>
            {imageList.length > 0 && <CustomImageList data={imageList}></CustomImageList>}
        </>
    );
}

export default App;
