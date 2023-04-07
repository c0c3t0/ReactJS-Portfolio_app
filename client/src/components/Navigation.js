import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export const Navigation = () => {
    const { isAuthenticated } = useContext(AuthContext);
    return (
        <div className="navigation container-fluid">
            <div className="row justify-content-md-center ">
                <div className="col-md-10 col-sm-12">
                    <nav className="navbar navbar-default">
                        <Link className="navbar-brand" to="/">
                            <p>Pro Photos</p>
                        </Link>
                        <nav className="overlay-menu">
                            <ul className="nav-container">
                                <li> <NavLink to="/">Portfolio</NavLink></li>
                                {isAuthenticated && (
                                    <>
                                        <li> <NavLink to="/upload" className={({isActive})=>{return (isActive ? 'active' : '')}}>Upload Photo</NavLink></li>
                                        <li> <NavLink to="/my-photos" className={({isActive})=>{return (isActive ? 'active' : '')}}>My Photos</NavLink></li>
                                        <li> <NavLink to="/logout" className={({isActive})=>{return (isActive ? 'active' : '')}}> Logout</NavLink></li>
                                    </>
                                )}
                                {!isAuthenticated && (
                                    <>
                                        <li> <NavLink to="/login">Login</NavLink></li>
                                        <li> <NavLink to="/register">Register</NavLink></li>
                                    </>
                                )}
                            </ul>
                        </nav>
                    </nav>
                </div>
            </div>
        </div>
    );
};