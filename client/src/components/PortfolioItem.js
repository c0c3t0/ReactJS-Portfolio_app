import { Link } from 'react-router-dom';

export default function PortfolioItem({ _id, img }) {
    return (
        <div className="card card-hover h-100" >
            <div className="card-body">
                <Link to={`/photos/${_id}`}>
                    <img className="card-img-top" src={img} alt="" />
                    <div className="reveal h-100 p-2 d-flex ">
                        <div className="w-100 align-self-center">
                            <p>Details</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}


