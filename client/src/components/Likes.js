import { useEffect, useState } from "react";
import * as likesService from '../services/likesService';
import { useParams } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";


export const Likes = ({ photo }) => {
    const { userId } = useAuthContext();
    const { photoId } = useParams();

    const [like, setLike] = useState([]);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        likesService.getLikesCount(photoId)
            .then((likesResult) => {
                setLike(likesResult);
                // setLike((state) => state.filter((x) => x.photoId === photoId));
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
                <span className={isLiked ? "liked" : "disliked"} onClick={onLikeClick}><i className="fa-solid fa-heart"></i></span>
            </div>
        </div>
    );
};