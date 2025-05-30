import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLogin } from "./service/useLogin.js";
import { saveState } from "../../../config/storage.js";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  const [phone, setPhone] = useState("+");
  const [showPassword, setShowPassword] = useState(false); // showPassword holati

  const submit = (data) => {
    const cleanPhone = phone.replace(/^\+/, "");

    mutate(
      { phone: cleanPhone, password: data.password },
      {
        onSuccess: (res) => {
          Cookies.set("user_token", res.data.accessToken, { expires: 1 });
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
      }
    );

    reset();
    setPhone("+");
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
            value={phone}
            onChange={(e) => {
              const raw = e.target.value;
              if (/^\+?\d*$/.test(raw)) {
                setPhone(raw);
              }
            }}
            placeholder="Telefon raqam"
            className="input"
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

        <div
          className="password-input-wrapper"
          style={{ position: "relative" }}
        >
          <input
            {...register("password", { required: "Parol majburiy" })}
            placeholder="Parol"
            type={showPassword ? "text" : "password"}
            className="input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle-btn"
            aria-label={
              showPassword ? "Parolni yashirish" : "Parolni ko‘rsatish"
            }
            style={{
              position: "absolute",
              top: "50%",
              right: "1rem",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? "Yuklanmoqda..." : "Kirish"}
        </button>

        <p className="signup-link">
          Ro'yxatdan o'tmaganmisiz? <Link to="/signup">Ro'yxatdan o'tish</Link>
        </p>
      </form>
    </div>
  );
};
