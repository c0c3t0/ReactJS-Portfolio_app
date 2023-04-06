import { useEffect, useReducer } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { photosServiceFactory } from '../services/dataService';
import * as commentService from '../services/commentService';
import { useService } from '../hooks/useService';
import { useAuthContext } from '../contexts/AuthContext';

import { CommentForm } from './CommentForm';
import { dataReducer } from '../reducers/dataReducer';
import { useDataContext } from '../contexts/DataContext';

export const PhotoDetails = () => {
    const { photoId } = useParams();
    const { userId, isAuthenticated, userEmail } = useAuthContext();
    const { deletePhoto } = useDataContext();
    const [photo, dispatch] = useReducer(dataReducer, {});
    const photoService = useService(photosServiceFactory)
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
            photoService.getPhotoById(photoId),
            commentService.getAllComments(photoId),
        ]).then(([photoData, comments]) => {
            const photoState = {
                ...photoData,
                comments,
            };
            
            dispatch({type: 'PHOTOS_FETCH', payload: photoState})
        });
    }, [photoId]);

    const onCommentSubmit = async (values) => {
        const response = await commentService.addComment(photoId, values.comment);

        dispatch({
            type: 'COMMENT_ADD',
            payload: response,
            userEmail,
        });
    };

    const isOwner = photo._ownerId === userId;

    const onDeleteClick = async () => {
        // eslint-disable-next-line no-restricted-globals
        const result = confirm(`Are you sure you want to delete this photo?`);

        if (result) {
            await photoService.deletePhoto(photo._id);

            deletePhoto(photo._id);

            navigate('/');
        }
    };

    return (
        <>
            <div className="portfolio-details">
                <div className="img-container">
                    <img src={`../../${photo.img}`} alt="" className="card-img-top big-img" />
                </div>
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
                    <h2>Comments:</h2>
                    <ul>
                        {photo.comments && photo.comments.map(x => (
                            <li key={x._id} className="comment">
                                <p>{x.author.email}: {x.comment}</p>
                            </li>
                        ))}
                    </ul>

                    {!photo.comments?.length && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {isOwner && (
                    <div className="buttons">
                        <Link to={`/photos/edit/${photo._id}`} className="button">Edit</Link>
                        <button className="button" onClick={onDeleteClick}>Delete</button>
                    </div>
                )};
                {isAuthenticated && <CommentForm onCommentSubmit={onCommentSubmit} />}
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

