import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api.js";
import useAuthStore from "../../store/authStore.js";
import {useNavigate} from "react-router-dom";
import "./Login.css";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const setToken = useAuthStore((state) => state.setToken);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/auth/login", data);
            const token = response.data.accessToken;

            if (!token) {
                alert("Login failed: No token received");
                return;
            }

            setToken(token);
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                <input {...register("username")} placeholder="Username" className="login-input"/>
                <p className="error-message">{errors.username?.message}</p>

                <input {...register("password")} type="password" placeholder="Password" className="login-input"/>
                <p className="error-message">{errors.password?.message}</p>

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
