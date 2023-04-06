import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Register } from "./components/Register";
import { PhotoDetails } from './components/PhotoDetails';
import { PhotoEdit } from './components/PhotoEdit';
import { Portfolio } from './components/Portfolio';
import { PhotoUpload } from './components/PhotoUpload';
import { Navigation } from './components/Navigation';
import { OwnerPhotos } from './components/OwnerPhotos';
import { RouteGuard } from './components/RouteGuard';

function App() {
    return (
        <AuthProvider>
            <DataProvider>
                <Navigation />
                <Routes>
                    <Route path='/' element={<Portfolio />} />
                    <Route path='/photos/:photoId' element={<PhotoDetails />} />

                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/logout' element={<Logout />} />

                    <Route element={<RouteGuard />}>
                        <Route path='/upload' element={<PhotoUpload />} />
                        <Route path='/my-photos' element={<OwnerPhotos />} />
                        <Route path='/photos/edit/:photoId' element={<PhotoEdit />} />
                    </Route>
                </Routes>
            </DataProvider>
        </AuthProvider>
    );
}

export default App;
