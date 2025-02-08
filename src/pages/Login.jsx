import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../services/api";
import useAuthStore from "../store/authStore";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema),
    });
    const setToken = useAuthStore((state) => state.setToken);

    const onSubmit = async (data) => {
        try {
            const response = await api.post("/auth/login", data);
            setToken(response.data.accessToken);
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username")} placeholder="Username"/>
            <p>{errors.username?.message}</p>
            <input {...register("password")} type="password" placeholder="Password"/>
            <p>{errors.password?.message}</p>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
