import { useState } from "react";
import "./Login.scss"
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Valores quemados para simulación
    const mockEmail = "test@My Data-Lab.com";
    const mockPassword = "123456";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === mockEmail && password === mockPassword) {
            navigate("/dashboard");
        } else {
            alert("Email o password incorrectos");
        }
    };

    return (
        <div className={`login-container ${isRegister ? "active" : ""}`}>
            <h1 className="login-title">My Data-Lab</h1>
            <div className="wrapper">
                <div className="forms-wrapper">
                    {/* Formulario Login */}
                    <div className="form-box login">
                        <h2>Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="input-box">
                                <span className="icon">
                                    <span className="material-icons">mail</span>
                                </span>
                                <input type="text" required value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                                <label>Email</label>
                            </div>

                            <div className="input-box">
                                <span className="icon">
                                    <span className="material-icons">lock</span>
                                </span>
                                <input type="password" required value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                <label>Password</label>
                            </div>

                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" /> Remember me
                                </label>
                                <a href="#">Forgot Password?</a>
                            </div>

                            <button type="submit" className="btn">Login</button>
                        </form>
                    </div>


                    <div className="fill">
                        {!isRegister ? (
                            <>
                                <h2>¡Hola!</h2>
                                <p>¿Aún no tienes cuenta?</p>
                                <button className="btn2" onClick={() => setIsRegister(true)}>Register</button>
                            </>
                        ) : (
                            <>
                                <h2>¡Bienvenido de nuevo!</h2>
                                <p>¿Ya tienes cuenta?</p>
                                <button className="btn2" onClick={() => setIsRegister(false)}>Login</button>
                            </>
                        )}
                    </div>

                    {/* Formulario Registro */}
                    <div className="form-box register">
                        <h2>Registration</h2>
                        <form action="#">
                            <div className="input-box">
                                <span className="icon">
                                    <span className="material-icons">person</span>
                                </span>
                                <input type="text" required />
                                <label>Username</label>
                            </div>

                            <div className="input-box">
                                <span className="icon">
                                    <span className="material-icons">mail</span>
                                </span>
                                <input type="text" required />
                                <label>Email</label>
                            </div>

                            <div className="input-box">
                                <span className="icon">
                                    <span className="material-icons">lock</span>
                                </span>
                                <input type="password" required />
                                <label>Password</label>
                            </div>

                            <div className="input-box">
                                <span className="icon">
                                    <span className="material-icons">lock</span>
                                </span>
                                <input type="password" required />
                                <label>Confirm Password</label>
                            </div>

                            <div className="remember-forgot">
                                <label>
                                    <input type="checkbox" /> I agree to the terms &amp; conditions
                                </label>
                            </div>

                            <button type="submit" className="btn">Register</button>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
