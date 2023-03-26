import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useService } from "../hooks/useService";
import { dataServiceFactory } from "../services/dataService";

export default function PhotoDetails() {
    const [info, setInfo] = useState([]);
    const { id } = useParams();
    const dataService = useService(dataServiceFactory);

    useEffect(() => {
        dataService.getPhotoById(id)
            .then((info) => {
                setInfo(info);
                console.log(info.img);
            }).catch((err) => {
                console.error(err);
            });
    }, [id]);

    return (
        <>
            <div className="portfolio-details">
                <div className="img-container">
                    <img src={`../../${info.img}`} alt="" className="card-img-top big-img" />
                </div>
            </div>
            <hr />
            <div className="details">
                <p><b>Category:</b> {info.category}</p>
                <p><b>Camera:</b> {info.camera}</p>
                <p><b>ISO:</b> {info.ISO}</p>
            </div>
            <hr />
            <div className="feedback">
                <div className="comments">
                    <h5><b>Comments (count)</b></h5>
                    <form action="" method="post">
                        <div>
                            <label htmlFor="comments">Write your comment</label>
                            <textarea name="comments" id="comments">

                            </textarea>
                        </div>
                        <input type="submit" defaultValue="Submit" />
                    </form>
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

