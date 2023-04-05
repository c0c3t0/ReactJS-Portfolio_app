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

                    <h1>Edit Photo</h1>

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" 
                     value={values.category} onChange={changeHandler} />

                    <label htmlFor="img">Image:</label>
                    <input type="text" id="img" name="img" 
                    value={values.img} onChange={changeHandler} />

                    <label htmlFor="levels">Camera:</label>
                    <input type="text" id="camera" name="camera" 
                    value={values.camera} onChange={changeHandler} />

                    <label htmlFor="ISO">ISO:</label>
                    <input type="text" id="ISO" name="ISO" 
                    value={values.ISO} onChange={changeHandler} />

                    <input className="btn submit" type="submit" value="Edit Photo" />
                </div>
            </form>
        </section>
    );
};