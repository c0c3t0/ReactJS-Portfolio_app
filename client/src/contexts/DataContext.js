import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { photosServiceFactory } from '../services/dataService';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const dataService = photosServiceFactory();

    useEffect(() => {
        dataService.getAllPhotos()
            .then(result => {
                setPhotos(result)
            })
    }, []);

    const onUploadPhotoSubmit = async (data) => {
        const newPhoto = await dataService.uploadPhoto(data);
        setPhotos(state => [...state, newPhoto]);
        navigate('/');
    };

    const onPhotoEditSubmit = async (values) => {
        const result = await dataService.editPhoto(values._id, values);
        setPhotos(state => state.map(x => x._id === values._id ? result : x));
        navigate(`/photos/${values._id}`);
    };

    const deletePhoto = (photoId) => {
        setPhotos(state => state.filter(photo => photo._id !== photoId));
    };

    const getPhoto = (photoId) => {
        return photos.find(photo => photo._id === photoId);
    };

    const getOwnerPhotos = (userId) => {
        return photos.filter(photo => photo._ownerId === userId);
    };

    const contextValues = {
        photos,
        onUploadPhotoSubmit,
        onPhotoEditSubmit,
        deletePhoto,
        getPhoto,
        getOwnerPhotos
    };

    return (
        <DataContext.Provider value={contextValues}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);

    return context;
};