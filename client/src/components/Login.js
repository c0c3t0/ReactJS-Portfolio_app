import { Link } from "react-router-dom";

import { useAuthContext } from "../contexts/AuthContext";

import { useForm } from "../hooks/useForm";

export const Login = () => {
    const { onLoginSubmit } = useAuthContext();

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: ''
    }, onLoginSubmit);
    return (
        <section className="auth portfolio-text">
            <form method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="forms">
                        <h3 className="rock-salt title">Login</h3>
                        <div className="label-input-container">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="label-input-container">
                            <label htmlFor="login-pass">Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="btn-container">
                            <button className="button">Login</button>
                            <p className="field">
                                <span className="link"><Link to="/register">Don't have profile?</Link></span>
                            </p>
                        </div>
                    </div>
                </div>
            </form>
        </section>
    );
};