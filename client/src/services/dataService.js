import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/photos';

export const photosServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAllPhotos = async () => {
        const result = await request.get(baseUrl);
        const photos = Object.values(result);

        return photos;
    };

    const getPhotoById = async (photoId) => {
        const photo = await request.get(`${baseUrl}/${photoId}`);

        return photo;
    };

    const uploadPhoto = async (photoData) => {
        const result = await request.post(baseUrl, photoData);
        return result;
    };

    const editPhoto = (photoId, data) => request.put(`${baseUrl}/${photoId}`, data);

    const deletePhoto = (photoId) => request.delete(`${baseUrl}/${photoId}`);

    const getUserPhotos = async (userId) => {
        const photos = await request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`);
        return photos;
    };

    return {
        getAllPhotos,
        getPhotoById,
        uploadPhoto,
        editPhoto,
        deletePhoto,
        getUserPhotos
    };
}