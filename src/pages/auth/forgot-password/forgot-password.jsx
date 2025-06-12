"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "./service/useForgotPassword";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./forgot-password.scss";

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useForgotPassword();
  const [phone, setPhone] = useState("+");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const submit = () => {
    const cleanPhone = phone.replace(/^\+/, "");

    if (!cleanPhone || cleanPhone.length < 9) {
      toast.error("Telefon raqamni to'g'ri kiriting", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    mutate(
      { phone: cleanPhone },
      {
        onSuccess: (res) => {
          console.log("Success:", res);
          setIsCodeSent(true);
          toast.success("Tasdiqlash kodi Telegram botga yuborildi", {
            position: "top-right",
            autoClose: 5000,
          });
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
    <div className="forgot-password-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>

      <div className="forgot-password-form">
        <h2 className="title">Parolni tiklash</h2>

        {!isCodeSent ? (
          <>
            <p className="description">
              Telefon raqamingizni kiriting. Tasdiqlash kodi Telegram botga
              yuboriladi.
            </p>

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

            <button
              type="button"
              onClick={submit}
              className="submit-btn"
              disabled={isPending}
            >
              {isPending ? "Yuklanmoqda..." : "Kodni yuborish"}
            </button>
          </>
        ) : (
          <>
            <div className="success-message">
              <p>
                Tasdiqlash kodi Telegram botga yuborildi. Iltimos, kodni
                tekshiring va tasdiqlash sahifasiga o'ting.
              </p>
              <Link to="/verify-reset" className="verify-link">
                Kodni tasdiqlash
              </Link>
            </div>
          </>
        )}

        <p className="login-link">
          Parolingizni eslaysizmi? <Link to="/login">Kirish</Link>
        </p>
      </div>
    </div>
  );
};
