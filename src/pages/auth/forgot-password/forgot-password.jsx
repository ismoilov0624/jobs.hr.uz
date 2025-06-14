"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "./service/useForgotPassword";
import { useVerifyReset } from "../verify-reset/service/useVerifyReset";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import qrcodebot from "../../../assets/qrcodebot.jpg";
import "react-toastify/dist/ReactToastify.css";
import "./forgot-password.scss";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate: forgotPasswordMutate, isPending: isForgotPasswordPending } =
    useForgotPassword();
  const { mutate: verifyResetMutate, isPending: isVerifyResetPending } =
    useVerifyReset();

  const [phone, setPhone] = useState("+");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const submitPhone = () => {
    const cleanPhone = phone.replace(/^\+/, "");

    if (!cleanPhone || cleanPhone.length < 9) {
      toast.error("Telefon raqamni to'g'ri kiriting", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    forgotPasswordMutate(
      { phone: cleanPhone },
      {
        onSuccess: (res) => {
          setIsCodeSent(true);
          toast.success("Tasdiqlash kodi Telegram botga yuborildi", {
            position: "top-right",
            autoClose: 5000,
          });
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message || "Xatolik yuz berdi";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
          });
        },
      }
    );
  };

  const verifyCode = () => {
    const cleanPhone = phone.replace(/^\+/, "");

    if (!verificationCode || verificationCode.trim() === "") {
      toast.error("Tasdiqlash kodini kiriting", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    verifyResetMutate(
      { phone: cleanPhone, code: verificationCode },
      {
        onSuccess: (res) => {
          const resetToken = res?.data?.data?.resetToken;

          if (resetToken) {
            toast.success("Kod muvaffaqiyatli tasdiqlandi!", {
              position: "top-right",
              autoClose: 5000,
            });

            // Navigate to reset password page with the token
            navigate("/reset-password", {
              state: {
                resetToken,
                phone: cleanPhone,
              },
            });
          } else {
            toast.error("Tasdiqlash tokeni topilmadi", {
              position: "top-right",
              autoClose: 5000,
            });
          }
        },
        onError: (error) => {
          const errorMessage =
            error?.response?.data?.message || "Noto'g'ri kod kiritildi";
          toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
          });
        },
      }
    );
  };

  const telegramBotUrl = `https://t.me/jobs_hr_uz_bot`;

  return (
    <div className="forgot-password-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>

      <h2 className="title">Telefon raqamingizni tasdiqlang</h2>

      {!isCodeSent ? (
        <div className="phone-input-section">
          <p className="phone-label">Telefon raqam:</p>
          <div className="phone-input-wrapper">
            <input
              value={phone}
              onChange={(e) => {
                const raw = e.target.value;
                if (/^\+?\d*$/.test(raw)) {
                  setPhone(raw);
                }
              }}
              placeholder="Telefon raqam"
              className="phone-input"
            />
          </div>
          {errors.phone && <p className="error">{errors.phone.message}</p>}

          <button
            type="button"
            onClick={submitPhone}
            className="submit-btn"
            disabled={isForgotPasswordPending}
          >
            {isForgotPasswordPending ? "Yuklanmoqda..." : "Kodni yuborish"}
          </button>
        </div>
      ) : (
        <div className="verification-section">
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

          <div className="verify-form">
            <input
              type="text"
              placeholder="Tasdiqlash kodi"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="code-input"
            />

            <button
              type="button"
              onClick={verifyCode}
              className="verify-btn"
              disabled={isVerifyResetPending}
            >
              {isVerifyResetPending ? "Yuklanmoqda..." : "Kiritish"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
