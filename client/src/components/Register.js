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
        <section className="content auth portfolio-text">
            <form method="post" onSubmit={onSubmit}>
                <div className="container">
                    <div className="forms">
                        <h3 className="rock-salt title">Register</h3>

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

                        <div className="label-input-container">
                            <label htmlFor="con-pass">Repeat Password:</label>
                            <input
                                type="password"
                                name="rePass"
                                value={values.rePass}
                                onChange={changeHandler}
                            />
                        </div>

                        <div className="btn-container">
                            <button className="button" type="submit">Register</button>
                            <p className="field">
                                <span className="link"><Link to="/login">Already have profile?</Link></span>
                            </p>
                        </div>
                    </div>

                </div>
            </form>
        </section>

    );
};