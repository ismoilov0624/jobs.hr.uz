import React from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../signup/service/mutation/useSignup";
import { saveState } from "../../../config/storage.js";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./signup.scss";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();

  const submit = (data) => {
    mutate(data, {
      onSuccess: (res) => {
        // Set user token and save user data in local storage
        Cookies.set("user_token", res.accessToken, { expires: 1 });
        saveState("user", res.user);

        // Show success toast
        toast.success("Registration successful! Welcome!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate to login page
        navigate("/login", { replace: true });
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.message ||
          "Registration failed! Please try again.";

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
    <div className="signup-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>

      <form onSubmit={handleSubmit(submit)} className="signup-form">
        <h2 className="title">Ro'yxatdan o'tish</h2>

        <div>
          <input
            {...register("firstName")}
            placeholder="Ism"
            className="input"
          />
        </div>

        <div>
          <input
            {...register("lastName")}
            placeholder="Familiya"
            className="input"
          />
        </div>

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
          {errors?.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" className="submit-btn">
          Ro'yxatdan o'tish
        </button>
      </form>
    </div>
  );
};
