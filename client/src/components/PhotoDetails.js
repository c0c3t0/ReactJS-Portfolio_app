import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { photosServiceFactory } from '../services/dataService';
import { commentsServiceFactory } from '../services/commenstService';
import { useService } from '../hooks/useService';
import { useAuthContext } from '../contexts/AuthContext';

import { AddComment } from './AddComment';
import { dataReducer } from '../reducers/dataReducer';
import { useDataContext } from '../contexts/DataContext';


export const PhotoDetails = () => {
    const { photoId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const { deletePhoto } = useDataContext();
    const [photo, dispatch] = useReducer(dataReducer, {});
    const photoService = useService(photosServiceFactory);
    const commentService = useService(commentsServiceFactory);

    const navigate = useNavigate();


    useEffect(() => {
        Promise.all([
            photoService.getPhotoById(photoId),
            commentService.getAllComments(photoId)
        ]).then(([photoData, comments]) => {
            const photoState = {
                ...photoData,
                comments,
            };

            dispatch({ type: 'PHOTOS_FETCH', payload: photoState })
        });
    }, [photoId, photoService, commentService]);



    // const onCommentUpdate = () => {

    // }

    const isOwner = photo._ownerId === userId;

    const onDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const confirmation = confirm(`Are you sure you want to delete this photo?`);

        if (confirmation) {
            await photoService.deletePhoto(photo._id);
            deletePhoto(photo._id);
            navigate('/');
        };
    };

    const onCommentSubmit = async (values) => {
        const response = await commentService.addComment(photoId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            userEmail,
        });
    };


    const onDeleteCommentClick = async (commentId) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmation = confirm('Are you sure you want to delete this comment?');

        if (confirmation) {
            await commentService.deleteComment(commentId);

            navigate(`/photos/${photo._id}`);
        };
    };
    return (
        <>
            <div className="portfolio-details">
                <div className="img-container">
                    <img src={`../../${photo.img}`} alt="" className="card-img-top big-img" />
                </div>
                {isOwner && (
                    <div className="details-buttons">
                        <Link to={`/photos/edit/${photo._id}`} className="button yellow">Edit </Link>
                        <button className="button red" onClick={onDeleteClick}>Delete</button>
                    </div >
                )}
            </div>
            <hr />
            <div className="details">
                <p><b>Category:</b> {photo.category}</p>
                <p><b>Camera:</b> {photo.camera}</p>
                <p><b>ISO:</b> {photo.ISO}</p>
            </div>

            <hr />
            <div className="feedback">
                <div className="details-comments">
                    <h5>Comments:</h5>
                    {isAuthenticated
                        ? <AddComment onCommentSubmit={onCommentSubmit} />
                        : <p>login</p>}

                    <ul>
                        {photo.comments && photo.comments.map(comment => (
                            <li key={comment._id} className="comment">

                                <h6><i>{comment.author.email} says:</i></h6>
                                <p>{comment.comment}</p>
                                {(comment.author._id === userId) && (
                                    <div>
                                        <button className="yellow">Edit</button>
                                        <button className="button red" onClick={() => onDeleteCommentClick(comment._id)}>Delete</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {!photo.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                <div className="rating">
                    <div className="rate">
                        <h5><b>Rating: rate (count rates)</b></h5>


                        <input type="radio" id="star5" name="rate" defaultValue="5" />
                        <label htmlFor="star5" title="text">5 stars</label>

                        <input type="radio" id="star4" name="rate" defaultValue="4" />
                        <label htmlFor="star4" title="text">4 stars</label>

                        <input type="radio" id="star3" name="rate" defaultValue="3" />
                        <label htmlFor="star3" title="text">3 stars</label>

                        <input type="radio" id="star2" name="rate" defaultValue="2" />
                        <label htmlFor="star2" title="text">2 stars</label>

                        <input type="radio" id="star1" name="rate" defaultValue="1" />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                </div>
            </div>
        </>
    )
}

