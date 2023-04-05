import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="navigation container-fluid">
            <div className="row justify-content-md-center ">
                <div className="col-md-10 col-sm-12">
                    <nav className="navbar navbar-default">
                        <Link className="navbar-brand" to="/">
                            <img src="../../assets/logo.png" height="50" alt="Logo" />
                        </Link>
                        <nav className="overlay-menu">
                            <ul>
                                <li> <Link to="/">Portfolio</Link></li>
                                <li> <Link to="/about">About</Link></li>
                                <li> <Link to="/blog">Blog</Link></li>
                                <li> <Link to="/contacts">Contacts</Link></li>
                                <li> <Link to="/offers">uslugi</Link></li>
                                {isAuthenticated && (<>
                                    <li> <Link to="/upload">Upload Photo</Link></li>
                                    <li> <Link to="/logout"> Logout</Link></li></>
                                )}
                                {!isAuthenticated && (
                                    <><li> <Link to="/login">Login</Link></li>
                                        <li> <Link to="/register">Register</Link></li></>
                                )}
                            </ul>
                        </nav>
                        {/* <div className="button_container" id="toggle"> */}
                        {/* <div className="overlay" id="overlay"> */}

                        {/* </div> */}
                        {/* </div> */}

                    </nav>
                </div>
            </div>
        </div>
    );
};