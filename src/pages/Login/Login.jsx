import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import useAuthStore from "../../store/authStore.js";
import {useNavigate} from "react-router-dom";
import "./Login.css";
import {loginRequest} from "../../requests/auth.js";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const {login, user} = useAuthStore();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const user = await loginRequest(data)
        if (user) {
            login(user);
        }
    };

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user]);

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
