import { requestFactory } from './requester';

const baseUrl = 'http://localhost:3030/data/comments';

export const commentsServiceFactory = (token) => {
    const request = requestFactory(token);

    const getAllComments = async (photoId) => {
        const searchQuery = encodeURIComponent(`photoId="${photoId}"`);
        const relationQuery = encodeURIComponent(`author=_ownerId:users`);

        const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
        const comments = Object.values(result);

        return comments;
    }

    const addComment = async (photoId, comment) => {
        const result = await request.post(baseUrl, { photoId, comment });

        return result;
    }

    const editComment = async (commentId, data) => request.put(`${baseUrl}/${commentId}`, data);

    const deleteComment = async (commentId) => request.delete(`${baseUrl}/${commentId}`);

    return {
        getAllComments,
        addComment,
        editComment,
        deleteComment
    };
}


// import { requestFactory } from './requester';

// const baseUrl = 'http://localhost:3030/data/comments';


// const request = requestFactory();

// export const getAllComments = async (photoId) => {
//     const searchQuery = encodeURIComponent(`photoId="${photoId}"`);
//     const relationQuery = encodeURIComponent(`author=_ownerId:users`);

//     const result = await request.get(`${baseUrl}?where=${searchQuery}&load=${relationQuery}`);
//     const comments = Object.values(result);

//     return comments;
// };

// export const addComment = async (photoId, comment) => {
//     const result = await request.post(baseUrl, { photoId, comment });

//     return result;
// };

// export const deleteComment = async (commentId) => request.delete(`${baseUrl}/${commentId}`);
