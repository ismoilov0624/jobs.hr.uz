import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../signup/service/mutation/useSignup";
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
    watch,
  } = useForm();

  const { mutate, isPending } = useSignup();
  const navigate = useNavigate();
  const password = watch("password");

  const [phone, setPhone] = useState("+");

  const submit = (data) => {
    const cleanPhone = phone.replace(/^\+/, ""); // + belgisi olib tashlanadi

    if (!cleanPhone) {
      toast.error("Telefon raqam majburiy!", { position: "top-right" });
      return;
    }

    mutate(
      {
        phone: cleanPhone,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/verify", {
            state: { phone: cleanPhone },
          });

          toast.success("Kod yuborildi. Telegram orqali tasdiqlang!", {
            position: "top-right",
            autoClose: 5000,
          });

          reset();
          setPhone("+");
        },
        onError: (error) => {
          const rawMessage = error?.response?.data?.error?.message;
          const friendlyMessage = rawMessage?.includes("already exists")
            ? "Bu telefon raqam bilan foydalanuvchi allaqachon ro'yxatdan o'tgan!"
            : rawMessage || "Ro'yxatdan o'tishda xatolik yuz berdi!";

          toast.error(friendlyMessage, {
            position: "top-right",
            autoClose: 5000,
          });
        },
      }
    );
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

        <div>
          <input
            {...register("password", {
              required: "Parol majburiy",
              minLength: {
                value: 6,
                message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
              },
            })}
            placeholder="Parol"
            type="password"
            className="input"
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("repeatPassword", {
              required: "Parolni qayta kiriting",
              validate: (value) => value === password || "Parollar mos emas",
            })}
            placeholder="Parolni qayta kiriting"
            type="password"
            className="input"
          />
          {errors.repeatPassword && (
            <p className="error">{errors.repeatPassword.message}</p>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={isPending}>
          {isPending ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
        </button>

        {/* Kirish sahifasiga link */}
        <p className="redirect-text">
          Allaqachon ro'yxatdan o'tganmisiz?{" "}
          <Link to="/login" className="login-link">
            Kirish
          </Link>
        </p>
      </form>
    </div>
  );
};
