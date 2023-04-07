import { useDataContext } from '../contexts/DataContext';
import { useForm } from '../hooks/useForm';

export const PhotoUpload = () => {
    const { onUploadPhotoSubmit } = useDataContext();

    const { values, changeHandler, onSubmit } = useForm({
        category: '',
        img: '',
        camera: '',
        ISO: '',
    }, onUploadPhotoSubmit);

    return (
        <section className="auth portfolio-text">
            <form method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="forms">
                        <h3 className="rock-salt title">Upload Photo</h3>
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
                            <button className="button">Upload Photo</button>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};
