import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useForm } from "../hooks/useForm";

export default function Login() {
    const { onLoginSubmit } = useContext(AuthContext);

    const { values,
        changeHandler,
        onSubmit } = useForm({
            email: '',
            password: ''
        }, onLoginSubmit);
    return (
        <section id="login-page" className="auth portfolio-text">
            <form id="login" method="POST" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Sokka@gmail.com"
                        name="email"
                        value={values.email}
                        onChange={changeHandler}
                    />

                    <label htmlFor="login-pass">Password:</label>
                    <input
                        type="password"
                        id="login-password"
                        name="password"
                        value={values.password}
                        onChange={changeHandler}
                    />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <Link to="/">here</Link></span>
                    </p>
                </div>
            </form>
        </section>
    )
}