import { useEffect, useState } from "react";
import * as likesService from '../services/likesService';
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";


export const Likes = () => {
    const { userId, isAuthenticated } = useAuthContext();
    const { photoId } = useParams();

    const [like, setLike] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        likesService.getLikesCount(photoId)
            .then((likesResult) => {
                setLike(likesResult);
            });
    }, [photoId]);

    const onLikeClick = () => {
        const currentLike = like.find((x) => x._ownerId === userId);

        if (currentLike) {
            setLike((state) => state.filter((x) => x._id !== currentLike._id));
            setIsLiked(false);
            likesService.dislike(currentLike._id, userId);

        } else {
            likesService.addLike(photoId, userId)
                .then((result) => {
                    setLike((state) => [...state, result]);
                    setIsLiked(true);
                });
        };
    };

    return (
        <div className="likes">
            <div className="like">
                <h5><b>{like.length} Likes</b></h5>
                {isAuthenticated
                    ? <span className={isLiked ? "liked" : "disliked"} onClick={onLikeClick}><i className="fa-solid fa-heart"></i></span>
                    : <p className="container"><Link to="/login">Sign in to like this photo</Link></p>}
            </div>
        </div>
    );
};