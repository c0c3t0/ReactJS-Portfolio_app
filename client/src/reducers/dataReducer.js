export const dataReducer = (state, action) => {
    switch (action.type) {
        case 'PHOTOS_FETCH':
            // return Object.assign({}, action.payload);
            return { ...action.payload };
        case 'COMMENT_ADD':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload,
                        author: {
                            email: action.userEmail,
                        }
                    }
                ],
            }
        default:
            return state;
    }
};