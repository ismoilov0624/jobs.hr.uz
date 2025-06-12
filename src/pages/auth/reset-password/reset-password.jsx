"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "./service/useResetPassword";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./reset-password.scss";

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending } = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Location state'dan resetToken va phone olish
  const resetToken = location.state?.resetToken;
  const phone = location.state?.phone;

  // Agar token yo'q bo'lsa, forgot-password sahifasiga yo'naltirish
  if (!resetToken) {
    navigate("/forgot-password");
    return null;
  }

  const submit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Parollar mos kelmayapti", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    mutate(
      {
        newPassword: data.newPassword,
        resetToken,
      },
      {
        onSuccess: () => {
          toast.success("Parol muvaffaqiyatli o'zgartirildi", {
            position: "top-right",
            autoClose: 5000,
          });

          // Login sahifasiga yo'naltirish
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        },
        onError: (error) => {
          console.error("Error:", error);
          const errorMessage =
            error?.response?.data?.message || "Xatolik yuz berdi";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
          });
        },
      }
    );

    reset();
  };

  return (
    <div className="reset-password-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>

      <form onSubmit={handleSubmit(submit)} className="reset-password-form">
        <h2 className="title">Yangi parol o'rnatish</h2>

        {phone && (
          <p className="phone-info">
            Telefon raqam: <strong>{phone}</strong>
          </p>
        )}

        <div className="password-input-wrapper">
          <input
            {...register("newPassword", {
              required: "Parol majburiy",
              minLength: {
                value: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
              },
            })}
            placeholder="Yangi parol"
            type={showPassword ? "text" : "password"}
            className="input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle-btn"
            aria-label={
              showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"
            }
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
          {errors.newPassword && (
            <p className="error">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="password-input-wrapper">
          <input
            {...register("confirmPassword", {
              required: "Parolni tasdiqlash majburiy",
              validate: (value) =>
                value === watch("newPassword") || "Parollar mos kelmayapti",
            })}
            placeholder="Parolni tasdiqlang"
            type={showConfirmPassword ? "text" : "password"}
            className="input"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="password-toggle-btn"
            aria-label={
              showConfirmPassword ? "Parolni yashirish" : "Parolni ko'rsatish"
            }
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </button>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? "Yuklanmoqda..." : "Parolni o'zgartirish"}
        </button>

        <p className="login-link">
          Parolingizni eslaysizmi? <Link to="/login">Kirish</Link>
        </p>
      </form>
    </div>
  );
};
