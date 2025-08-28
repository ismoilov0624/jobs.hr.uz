"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSignup } from "../signup/service/mutation/useSignup";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TermsModal from "../../../components/terms-modal/terms-modal";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);

  const submit = (data) => {
    const cleanPhone = phone.replace(/^\+/, "");

    if (!cleanPhone) {
      toast.error("Telefon raqam majburiy!", { position: "top-right" });
      return;
    }

    if (!acceptedTerms) {
      toast.error("Oferta shartlarini qabul qiling!", {
        position: "top-right",
      });
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

          toast.success("Telegram bot orqali tasdiqlang!", {
            position: "top-right",
            autoClose: 5000,
          });

          reset();
          setPhone("+");
          setSelectedRegion("");
          setSelectedDistrict("");
          setAcceptedTerms(false);
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
    <>
      <div className="signup-container">
        <Link to="/" className="home-link">
          Bosh sahifa
        </Link>

        <div className="signup-wrapper">
          {/* Chap taraf signup form */}
          <form onSubmit={handleSubmit(submit)} className="signup-form">
            <h2 className="title">Ro'yxatdan o'tish</h2>

            <div className="input-wrapper">
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

            <div className="input-wrapper">
              <input
                {...register("password", {
                  required: "Parol majburiy",
                  minLength: {
                    value: 6,
                    message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
                  },
                })}
                placeholder="Parol"
                type={showPassword ? "text" : "password"}
                className="input"
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="error">{errors.password.message}</p>
              )}
            </div>

            <div className="input-wrapper">
              <input
                {...register("repeatPassword", {
                  required: "Parolni qayta kiriting",
                  validate: (value) =>
                    value === password || "Parollar mos emas",
                })}
                placeholder="Parolni qayta kiriting"
                type={showRepeatPassword ? "text" : "password"}
                className="input"
              />
              <span
                className="toggle-password"
                onClick={() => setShowRepeatPassword((prev) => !prev)}
              >
                {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.repeatPassword && (
                <p className="error">{errors.repeatPassword.message}</p>
              )}
            </div>

            <div className="terms-wrapper">
              <label className="terms-label">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="terms-checkbox"
                />
                <span className="terms-text">
                  <button
                    type="button"
                    onClick={() => setShowTermsModal(true)}
                    className="terms-link"
                  >
                    Oferta shartlari
                  </button>{" "}
                  ni o'qidim va qabul qilaman
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isPending || !acceptedTerms}
            >
              {isPending ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
            </button>

            <p className="redirect-text">
              Allaqachon ro'yxatdan o'tganmisiz?{" "}
              <Link to="/login" className="login-link">
                Kirish
              </Link>
            </p>
          </form>

          {/* O‘ng tarafda qo‘llanma videolar */}
          <div className="signup-videos">
            <div className="video-card">
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/yRj3EBGOMUo?si=Sc2-xmzCzt_SYA1l"
                  title="Platformada tez va oson ro'yxatdan o'tish"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h4>Platformada tez va oson ro'yxatdan o'tish</h4>
            </div>

            <div className="video-card">
              <div className="video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/RWq35zSnL4o?si=fn5bDgjGdvqRlo8n"
                  title="Profilni to‘ldirish va ariza yuborish"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h4>Profilni to‘ldirish va ariza yuborish</h4>
            </div>
          </div>
        </div>
      </div>

      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </>
  );
};
