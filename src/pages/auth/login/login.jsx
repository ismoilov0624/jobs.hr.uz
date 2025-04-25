import React from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./service/useLogin.js";
import { saveState } from "../../../config/storage.js";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

        toast.success("Login successful! Welcome back", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Login failed! Please check your credentials.";

        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      },
    });
    reset();
  };

  return (
    <div className="login-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>

      <form onSubmit={handleSubmit(submit)} className="login-form">
        <h2 className="title">Kirish</h2>

        <div>
          <input
            {...register("phone")}
            placeholder="Telefon raqam"
            className="input"
          />
        </div>

        <div>
          <input
            {...register("password")}
            placeholder="Parol"
            type="password"
            className="input"
          />
        </div>

        <button type="submit" className="submit-btn">
          Kirish
        </button>
      </form>
    </div>
  );
};
