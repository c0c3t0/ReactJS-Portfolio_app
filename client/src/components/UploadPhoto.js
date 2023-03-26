import { useForm } from "../hooks/useForm";

export default function UploadPhoto({onUploadPhotoSubmit}) {

    const {values, changeHandler, onSubmit} = useForm({
        category: '',
        img: '',
        camera: '',
        ISO: '',
    }, onUploadPhotoSubmit)

    return (
        <section id="create-page" className="auth portfolio-text">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">

                    <h1>Upload Photo</h1>

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" placeholder="Enter game category..." values={values.category} onChange={changeHandler} />

                    <label htmlFor="img">Image:</label>
                    <input type="text" id="img" name="img" placeholder="Upload a photo..." values={values.img} onChange={changeHandler} />

                    <label htmlFor="levels">Camera:</label>
                    <input type="text" id="camera" name="camera" placeholder="1" values={values.camera} onChange={changeHandler} />

                    <label htmlFor="ISO">ISO:</label>
                    <input type="text" id="ISO" name="ISO" placeholder="1" values={values.ISO} onChange={changeHandler} />

                    <input className="btn submit" type="submit" defaultValue="Upload Photo" />
                </div>
            </form>
        </section>
    );
};