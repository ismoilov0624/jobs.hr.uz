import React from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../signup/service/mutation/useSignup";
import { saveState } from "../../../config/storage.js";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
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
        Cookies.set("user_token", res.accessToken, { expires: 1 });
        saveState("user", res.user);
        navigate("/login", { replace: true });
      },
    });
    reset();
  };

  return (
    <div className="signup-container">
      <Link to="/" className="home-link">
        🏠 Bosh sahifa
      </Link>

      <form onSubmit={handleSubmit(submit)} className="signup-form">
        <h2 className="title"> Ro'yxatdan o'tish</h2>

        <div>
          <input
            {...register("firstName")}
            placeholder="Ism"
            className="input"
          />
        </div>

        <div>
          <input
            {...register("middleName")}
            placeholder="Otasining ismi"
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
            {...register("email")}
            placeholder="Elektron pochta"
            type="email"
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
