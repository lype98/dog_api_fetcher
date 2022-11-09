import { DogBreedsResponseJSON, DogImagesResponseJSON } from './types';

export const fetchDogBreedList = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const responseJSON: DogBreedsResponseJSON = await response.json();

    if (responseJSON.status !== 'success') throw new Error('failed to fetch');
    const fullBreedList = responseJSON.message;
    return fullBreedList;
};

export const fetchDogImages = async (breed: string, subBreed: string, amount: string) => {
    const subBreedText = subBreed ? '/' + subBreed : '';
    const response = await fetch(`https://dog.ceo/api/breed/${breed}${subBreedText}/images/random/${amount}`);
    const responseJSON: DogImagesResponseJSON = await response.json();

    if (responseJSON.status !== 'success') throw new Error('failed to fetch images');
    const imageList = responseJSON.message;
    return imageList;
};
