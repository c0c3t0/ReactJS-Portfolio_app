import { useContext } from "react";
import { Link } from "react-router-dom";

import { useForm } from "../hooks/useForm";
import { AuthContext } from "../contexts/AuthContext";

export const Register = () => {
    const { onRegisterSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        rePass: '',
    }, onRegisterSubmit);

    return (
        <section id="register-page" className="content auth portfolio-text">
            <form id="register" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h4>Register</h4>
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        id="email"
                        name="email"
                        placeholder="maria@email.com"
                        value={values.email}
                        onChange={changeHandler}
                    />
                    <label htmlFor="pass">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        value={values.pasword}
                        onChange={changeHandler}
                    />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input
                        type="password"
                        name="rePass"
                        id="confirm-password"
                        value={values.rePass}
                        onChange={changeHandler}
                    />
                    <input className="btn submit" type="submit" value="Register" />
                    <p className="field">
                        <span>If you already have profile click <Link to="/login">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    );
};