import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useDataContext } from "../contexts/DataContext";

import { useForm } from "../hooks/useForm";
import { useService } from "../hooks/useService";
import { photosServiceFactory } from "../services/dataService";

export const PhotoEdit = () => {
    const { onPhotoEditSubmit } = useDataContext();
    const { photoId } = useParams();
    const dataService = useService(photosServiceFactory);

    const { values, changeHandler, onSubmit, changeValues } = useForm({
        category: '',
        img: '',
        camera: '',
        ISO: '',
    }, onPhotoEditSubmit);

    useEffect(() => {
        dataService.getPhotoById(photoId)
            .then(result => {
                changeValues(result);
            });
    }, [photoId]);

    return (
        <section id="create-page" className="auth portfolio-text">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">
                    <div className="forms">
                        <h3 className="rock-salt title">Edit Photo</h3>
                        <div className="label-input-container">
                            <label htmlFor="category">Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={values.category}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="label-input-container">
                            <label htmlFor="img">Image:</label>
                            <input
                                type="text"
                                name="img"
                                value={values.img}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="label-input-container">
                            <label htmlFor="levels">Camera:</label>
                            <input
                                type="text"
                                name="camera"
                                value={values.camera}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="label-input-container">
                            <label htmlFor="ISO">ISO:</label>
                            <input
                                type="number"
                                name="ISO"
                                value={values.ISO}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="btn-container">
                            <button className="button">Edit Photo</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};