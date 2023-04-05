// import { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const CommentsContext = createContext();

// export const CommentProvider = ({ children }) => {
//     const navigate = useNavigate();
//     const [comments, setComments] = useState([]);
//     const commentsService = photosServiceFactory();

//     useEffect(() => {
//         dataService.getAllPhotos()
//             .then(result => {
//                 setComments(result)
//             })
//     }, []);

//     const onUploadPhotoSubmit = async (data) => {
//         const newPhoto = await dataService.uploadPhoto(data);
//         setComments(state => [...state, newPhoto]);
//         navigate('/');
//     };

//     const onPhotoEditSubmit = async (values) => {
//         const result = await dataService.editPhoto(values._id, values);
//         setComments(state => state.map(x => x._id === values._id ? result : x));
//         navigate(`/photos/${values._id}`);
//     };

//     const deletePhoto = (photoId) => {
//         setComments(state => state.filter(photo => photo._id !== photoId));
//     };

//     const getPhoto = (photoId) => {
//         return photos.find(photo => photo._id === photoId);
//     };

//     const contextValues = {
//         photos,
//         onUploadPhotoSubmit,
//         onPhotoEditSubmit,
//         deletePhoto,
//         getPhoto,
//     };

//     return (
//         <DataContext.Provider value={contextValues}>
//             {children}
//         </DataContext.Provider>
//     );
// };

// export const useDataContext = () => {
//     const context = useContext(DataContext);

//     return context;
// };