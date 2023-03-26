import PortfolioItem from './PortfolioItem.js'

export default function Portfolio({ photos }) {
    return (
        <div className="portfolio-text">
            <div className="container-fluid pt-10">
                <div className="row justify-content-md-center ">
                    <div className="col-md-10 col-sm-12">
                        <div className="card-columns">
                            {photos.map(photo => <PortfolioItem key={photo._id} {...photo} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};