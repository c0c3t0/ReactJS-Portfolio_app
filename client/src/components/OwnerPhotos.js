import { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useService } from "../hooks/useService";
import { photosServiceFactory } from "../services/dataService";
import { PortfolioItem } from "./PortfolioItem";

export const OwnerPhotos = () => {
    const photoService = useService(photosServiceFactory);
    const { userId } = useAuthContext();
    const [userPhotos, setUserPhotos] = useState([]);

    useEffect(() => {
        photoService.getUserPhotos(userId)
            .then(photos => {
                setUserPhotos(photos);
            });
    }, [userId]);

    return (
        <div className="portfolio-text">
            <div className="container-fluid pt-10">
                <div className="row justify-content-md-center ">
                    <div className="col-md-10 col-sm-12">
                        <div className="card-columns">
                            {userPhotos.map(photo => <PortfolioItem key={photo._id} {...photo} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

