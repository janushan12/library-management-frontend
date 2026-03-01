import { useState } from "react";
import API from "../services/api";

interface Props {
    onRegistered: () => void;
    onSwitchToLogin: () => void;
}

const Register = ({ onRegistered, onSwitchToLogin }: Props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const register = async () => {
        try {
            await API.post("/auth/register", {
                username,
                passwordHash: password
            });
            const res = await API.post("/auth/login", {
                username,
                passwordHash: password
            });
            localStorage.setItem("token", res.data.token);
            onRegistered();
        } catch (error: any) {
            alert("Registration failed: " + error.message);
        }
    }
    return (
        <div className="auth-card">
            <h2 className="auth-title">Create Account</h2>
            <input type= "text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button className="btn btn-primary auth-btn" onClick={register}>Register</button>
            <p className="auth-switch">
                Already have an account? {""} <span onClick={onSwitchToLogin}>Login</span>
            </p>
        </div>
    )
}

export default Register;