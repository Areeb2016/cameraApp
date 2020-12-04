import {ADD_IMAGE, DELETE_IMAGE} from './types'

export const addImage = (image) => (
    {
        type:ADD_IMAGE,
        data:image 
    }
);

export const deleteImage = (key) => (
    {
        type:DELETE_IMAGE,
        key:key
    }
);