import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { request } from "../../../config/request";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verify.scss";

export const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(phone, data.code);
      const res = await request.post("/auth/verify", {
        phone,
        code: data.code,
      });

      toast.success("Telefon raqam muvaffaqiyatli tasdiqlandi!");
      navigate("/login", { replace: true });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Xatolik yuz berdi!";
      toast.error(errorMessage);
    }
  };

  const telegramBotUrl = `https://t.me/jobs_hr_uz_bot`;

  return (
    <div className="verify-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>
      <h2 className="title">Telefon raqamingizni tasdiqlang</h2>
      <p>
        Telefon raqam: <strong>+{phone}</strong>
      </p>

      <a
        href={telegramBotUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-link"
      >
        <button className="telegram-btn">Telegram botga o‘tish</button>
      </a>

      <img className="qrcodebot" src="/src/assets/qrcodebot.jpg" alt="" />

      <a
        target="_blank"
        rel="noopener noreferrer"
        className="bot-link"
        href={telegramBotUrl}
      >
        @jobs_hr_uz_bot
      </a>

      <form onSubmit={handleSubmit(onSubmit)} className="verify-form">
        <input
          type="text"
          placeholder="Tasdiqlash kodi"
          {...register("code", { required: "Kod majburiy" })}
          className="input"
        />
        {errors.code && <p className="error">{errors.code.message}</p>}

        <button type="submit" className="submit-btn">
          Kiritish
        </button>
      </form>
    </div>
  );
};
