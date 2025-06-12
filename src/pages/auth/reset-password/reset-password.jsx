"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPassword } from "./service/useResetPassword";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./reset-password.scss";

export const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resetToken = location.state?.resetToken;
  const phone = location.state?.phone;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useResetPassword();

  const onSubmit = (data) => {
    if (!resetToken) {
      toast.error(
        "Tasdiqlash tokeni topilmadi. Iltimos, parolni tiklash jarayonini qaytadan boshlang."
      );
      navigate("/forgot-password");
      return;
    }

    mutate(
      { newPassword: data.password, resetToken },
      {
        onSuccess: () => {
          toast.success("Parol muvaffaqiyatli o'zgartirildi!");
          navigate("/login");
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message || "Xatolik yuz berdi!";
          toast.error(errorMessage);
        },
      }
    );
  };

  if (!resetToken) {
    return (
      <div className="reset-password-container">
        <div className="error-message">
          <h2>Xatolik</h2>
          <p>
            Tasdiqlash tokeni topilmadi. Iltimos, parolni tiklash jarayonini
            qaytadan boshlang.
          </p>
          <Link to="/forgot-password" className="back-link">
            Parolni tiklashga qaytish
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>

      <div className="reset-password-form">
        <h2 className="title">Yangi parol o'rnatish</h2>
        <p className="description">
          {phone
            ? `${phone} raqami uchun yangi parol o'rnating`
            : "Yangi parolingizni kiriting"}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="password-field">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Yangi parol"
                {...register("password", {
                  required: "Parol majburiy",
                  minLength: {
                    value: 6,
                    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
                  },
                })}
                className="input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? "Yashirish" : "Ko'rsatish"}
              </button>
            </div>
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <div className="password-field">
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Parolni tasdiqlang"
                {...register("confirmPassword", {
                  required: "Parolni tasdiqlash majburiy",
                  validate: (value) =>
                    value === watch("password") || "Parollar mos kelmadi",
                })}
                className="input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="toggle-password"
              >
                {showConfirmPassword ? "Yashirish" : "Ko'rsatish"}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button type="submit" className="submit-btn" disabled={isPending}>
            {isPending ? "Yuklanmoqda..." : "Parolni o'zgartirish"}
          </button>
        </form>

        <p className="login-link">
          Parolingizni eslaysizmi? <Link to="/login">Kirish</Link>
        </p>
      </div>
    </div>
  );
};
