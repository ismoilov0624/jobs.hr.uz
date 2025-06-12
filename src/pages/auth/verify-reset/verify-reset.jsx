"use client";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyReset } from "./service/useVerifyReset";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import qrcodebot from "../../../assets/qrcodebot.jpg";
import "react-toastify/dist/ReactToastify.css";
import "./verify-reset.scss";

export const VerifyReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useVerifyReset();

  const onSubmit = (data) => {
    if (!phone) {
      toast.error(
        "Telefon raqam topilmadi. Iltimos, parolni tiklash jarayonini qaytadan boshlang."
      );
      navigate("/forgot-password");
      return;
    }

    mutate(
      { phone, code: data.code },
      {
        onSuccess: (res) => {
          const resetToken = res.data?.data?.resetToken;
          if (resetToken) {
            toast.success("Kod muvaffaqiyatli tasdiqlandi!");
            navigate("/reset-password", {
              state: { resetToken },
            });
          } else {
            toast.error("Xatolik yuz berdi. Qayta urinib ko'ring.");
          }
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message || "Xatolik yuz berdi!";
          toast.error(errorMessage);
        },
      }
    );
  };

  const telegramBotUrl = `https://t.me/jobs_hr_uz_bot`;

  return (
    <div className="verify-reset-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>
      <h2 className="title">Telefon raqamingizni tasdiqlang</h2>
      <p className="phone-display">
        Telefon raqam: <strong>{phone}</strong>
      </p>

      <a
        href={telegramBotUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-link"
      >
        <button className="telegram-btn">Telegram botga o'tish</button>
      </a>

      <a href={telegramBotUrl} target="_blank" rel="noopener noreferrer">
        <img
          className="qrcodebot"
          src={qrcodebot || "/placeholder.svg"}
          alt="Telegram bot QR code"
        />
      </a>

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
          className="code-input"
        />
        {errors.code && <p className="error">{errors.code.message}</p>}

        <button type="submit" className="verify-btn" disabled={isPending}>
          {isPending ? "Yuklanmoqda..." : "Kiritish"}
        </button>
      </form>
    </div>
  );
};
