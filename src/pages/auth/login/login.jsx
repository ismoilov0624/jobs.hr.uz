import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./service/useLogin.js";
import { saveState } from "../../../config/storage.js";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "./login.scss";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();

  const submit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        Cookies.set("user_token", res.accessToken, { expires: 1 });
        saveState("user", res.user);
        navigate("/", { replace: true });
      },
    });
    reset();
  };

  return (
    <div className="login-container">
      <Link to="/" className="home-link">
        🏠 Home
      </Link>

      <form onSubmit={handleSubmit(submit)} className="login-form">
        <h2 className="title">Login</h2>

        <div>
          <input
            {...register("phone")}
            placeholder="Phone Number"
            className="input"
          />
        </div>

        <div>
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="input"
          />
        </div>

        <button type="submit" className="submit-btn">
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};
