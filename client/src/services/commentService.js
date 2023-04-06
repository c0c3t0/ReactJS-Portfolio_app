import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';
const request = requestFactory();

export const getAllComments = async (photoId) => {
    const searchQuery = encodeURIComponent(`photoId="${photoId}"`);
    const relationQuery = encodeURIComponent(`author=_ownerId:users`);

    const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
    const comments = Object.values(result);

    return comments;
};

export const addComment = async (photoId, comment) => {
    const result = await request.post(baseUrl, { photoId, comment });

    return result;
};