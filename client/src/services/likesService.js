import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data';
const request = requestFactory();

export const getLikesCount = async (photoId) => {
    const result = await request.get(`${baseUrl}/likes?where=photoId%3D%22${photoId}%22&`);
    return result;
};

export const addLike = async (photoId, userId) => {
    const result = await request.post(`${baseUrl}/likes`, { photoId, userId });

    return result;
};

// export async function liked(photoId, userId) {
//     const result = await request.get(`${baseUrl}/likes?where=photoId%3D%22${photoId}%22%20and%20_ownerId%3D%22${userId}%22&count`, { photoId, userId });
//     return result;
// };

export async function dislike(likeId, userId) {
    const res = await request.delete(`${baseUrl}/likes/${likeId}?where=userId%3D%22${userId}%22&`);
    return res;
};