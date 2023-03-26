import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/photos';

export function dataServiceFactory(token) {
    const request = requestFactory(token);

    const getAllPhotos = async () => {
        const result = await request.get(baseUrl);
        const photos = Object.values(result);

        return photos;
    };

    const getPhotoById = async (id) => {
        const result = await request.get(`${baseUrl}/${id}`);

        return result;
    };

    const uploadPhoto = async (data) => {
        const result = await request.post(baseUrl, data);

        console.log(result);

        return result;
    };

    const editPhoto = (id, data) => request.put(`${baseUrl}/${id}`, data);

    const deletePhoto = (id) => request.delete(`${baseUrl}/${id}`);

    const addComment = async (id, data) => {
        const result = await request.post(`${baseUrl}/${id}/comments`, data);

        return result;
    };


    return {
        getAllPhotos: getAllPhotos,
        getPhotoById: getPhotoById,
        uploadPhoto: uploadPhoto,
        editPhoto: editPhoto,
        deletePhoto: deletePhoto,
        addComment,
    };
}

// const baseUrl = 'http://localhost:3030/data/photos';

// export async function getAll() {
//     const response = await fetch(baseUrl);
//     const data = await response.json();
//     console.log(data);
//     return data;
// };

// export async function getById(id) {
//     const response = await fetch(`${baseUrl}/${id}`);
//     const data = await response.json();

//     return data;
// };