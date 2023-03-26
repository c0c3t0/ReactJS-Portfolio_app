import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

import Navigation from './components/Navigation';
import PhotoDetails from './components/PhotoDetails';
import Portfolio from './components/Portfolio';

import { AuthContext } from './contexts/AuthContext';

import { authServiceFactory } from './services/authService'
import { dataServiceFactory } from './services/dataService';
import UploadPhoto from './components/UploadPhoto';

function App() {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState({});
    const authService = authServiceFactory(user.accessToken);
    const dataService = dataServiceFactory(user.accessToken);

    useEffect(() => {
        dataService.getAllPhotos()
            .then((photos) => {
                setPhotos(photos);
                console.log(photos);
            }).catch((err) => {
                console.error(err);
            });
    }, []);


    const onLoginSubmit = async (data) => {
        const result = await authService.login(data);
        setUser(result);
        navigate('/');
    };

    const onRegisterSubmit = async (data) => {
        if (!data.email || !data.password || !data.rePass) {
            alert('All fields are required!');
            return;
        }
        if (data.password !== data.rePass) {
            alert('Passwords don\'t match!');
            return;
        }


        const result = await authService.register(data);
        setUser(result);
        navigate('/');
    };

    const onLogout = async () => {
        await authService.logout();

        // setUser({});
    };

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: user._id,
        userEmail: user.email,
        token: user.accessToken,
        isAuthenticated: !!user.accessToken
    };

    const onUploadPhotoSubmit = async (data) => {
        const newPhoto = await dataService.uploadPhoto(data);
        setPhotos(state => [...state, newPhoto]);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={context}>
            <Navigation />
            <Routes>
                <Route path='/' element={<Portfolio photos={photos} />} />
                <Route path='/photos/:id' element={<PhotoDetails />} />

                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/logout' element={<Logout />} />

                <Route path='/upload' element={<UploadPhoto onUploadPhotoSubmit={onUploadPhotoSubmit}/>} />
                {/* <Route path='/edit/:id' element={<EditItem />} /> */}
                {/* <Route path='/catalogue' element={<Catalogue />} /> */}
            </Routes>
            {/* <Portfolio photos={photos} /> */}
        </AuthContext.Provider>
    );
}

export default App;
