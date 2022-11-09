export type Breeds = {
    [breed: string]: string[] | [];
};

/**
 * Response structure of all breeds from Dog API
 * example:
 *
 * {
 *
 *   "message": {
 *
 *     "appenzeller": [],
 *     "australian": ["shepherd"],
 *     ...
 * },
 *
 * "status": "success"
 * }
 */
export interface DogBreedsResponseJSON {
    message: Breeds;
    status: string;
}

/**
 * Response structure of multiple dog images from Dog API
 */
export interface DogImagesResponseJSON {
    message: string[];
    status: string;
}
