"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useVerifyReset } from "./service/useVerifyReset";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./verify-reset.scss";

export const VerifyReset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutate, isPending } = useVerifyReset();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("+");
  const [code, setCode] = useState("");

  const submit = () => {
    const cleanPhone = phone.replace(/^\+/, "");

    if (!cleanPhone || cleanPhone.length < 9) {
      toast.error("Telefon raqamni to'g'ri kiriting", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    if (!code || code.length < 4) {
      toast.error("Tasdiqlash kodini to'g'ri kiriting", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }

    mutate(
      { phone: cleanPhone, code },
      {
        onSuccess: (res) => {
          console.log("Success:", res);
          const resetToken = res.data?.resetToken;

          if (resetToken) {
            // Token bilan reset-password sahifasiga yo'naltirish
            navigate("/reset-password", {
              state: {
                resetToken,
                phone: cleanPhone,
              },
            });

            toast.success("Kod tasdiqlandi", {
              position: "top-right",
              autoClose: 5000,
            });
          } else {
            toast.error("Tasdiqlash tokeni topilmadi", {
              position: "top-right",
              autoClose: 5000,
            });
          }
        },
        onError: (error) => {
          console.error("Error:", error);
          const errorMessage =
            error?.response?.data?.message || "Noto'g'ri kod kiritildi";
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
    <div className="verify-reset-container">
      <Link to="/" className="home-link">
        Bosh sahifa
      </Link>

      <div className="verify-reset-form">
        <h2 className="title">Kodni tasdiqlash</h2>
        <p className="description">
          Telegram botga yuborilgan tasdiqlash kodini kiriting.
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
        </div>

        <div>
          <input
            value={code}
            onChange={(e) => {
              const raw = e.target.value;
              if (/^\d*$/.test(raw)) {
                setCode(raw);
              }
            }}
            placeholder="Tasdiqlash kodi"
            className="input"
            maxLength={5}
          />
        </div>

        <button
          type="button"
          onClick={submit}
          className="submit-btn"
          disabled={isPending}
        >
          {isPending ? "Yuklanmoqda..." : "Tasdiqlash"}
        </button>

        <div className="links">
          <Link to="/forgot-password" className="back-link">
            Qayta kod so'rash
          </Link>
          <Link to="/login" className="login-link">
            Kirish
          </Link>
        </div>
      </div>
    </div>
  );
};
