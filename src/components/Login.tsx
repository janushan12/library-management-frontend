import { useState } from "react";
import API from "../services/api";

const Login = ({ onLogin }: any) => {
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
        <div className="login-page">
            <h2>Login</h2>
            <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary" onClick={login}>Login</button>
        </div>
    );
}

export default Login;