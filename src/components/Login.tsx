import { useState } from "react";
import API from "../services/api";

interface Props {
    onLogin: () => void;
    onSwitchToRegister: () => void;
}

const Login = ({ onLogin, onSwitchToRegister }: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        const res = await API.post("/auth/login", {
            username,
            passwordHash: password
        });

        localStorage.setItem("token", res.data.token);
        onLogin();
    };

    return (
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>

                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-primary auth-btn" onClick={login}>Login</button>
                <p className="auth-switch">
                    New User? {""} <span onClick={onSwitchToRegister}>Register</span>
                </p>
            </div>
    );
}

export default Login;