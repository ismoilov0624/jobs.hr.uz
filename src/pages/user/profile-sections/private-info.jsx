"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { regions } from "../../../utils/regions";
import { usePrivateInfo } from "../../../hooks/useUser";
import {
  createPrivateInfo,
  updatePrivateInfo,
  deletePrivateInfo,
} from "../../../services/api/user";
import "./profile-sections.scss";

export const PrivateInfo = () => {
  const { data: privateInfo, isLoading, refetch } = usePrivateInfo();
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  const watchedRegion = watch("region");

  useEffect(() => {
    if (privateInfo && privateInfo.id) {
      setValue("gender", privateInfo.gender || "");
      setValue("region", privateInfo.region || "");
      setValue("district", privateInfo.district || "");
      setValue("citizenship", privateInfo.citizenship || "");
      setValue(
        "birthDate",
        privateInfo.birthDate ? privateInfo.birthDate.split("T")[0] : ""
      );
      setValue("birthPlace", privateInfo.birthPlace || "");
      setValue("hasCar", privateInfo.hasCar || false);

      setSelectedRegion(privateInfo.region || "");
      setSelectedDistrict(privateInfo.district || "");
    }
  }, [privateInfo, setValue]);

  useEffect(() => {
    if (watchedRegion && watchedRegion !== selectedRegion) {
      setSelectedRegion(watchedRegion);
      setSelectedDistrict("");
      setValue("district", "");
    }
  }, [watchedRegion, selectedRegion, setValue]);

  // Yangi ma'lumot yaratish uchun POST so'rov
  const handleCreate = async (data) => {
    try {
      setIsCreating(true);
      await createPrivateInfo(data);
      toast.success("Shaxsiy ma'lumotlar muvaffaqiyatli yaratildi!", {
        position: "top-right",
      });
      refetch(); // Ma'lumotlarni yangilash
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Yaratishda xatolik yuz berdi!",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsCreating(false);
    }
  };

  // Mavjud ma'lumotni tahrirlash uchun PUT so'rov
  const handleUpdate = async (data) => {
    try {
      setIsUpdating(true);
      await updatePrivateInfo(data);
      toast.success("Shaxsiy ma'lumotlar muvaffaqiyatli yangilandi!", {
        position: "top-right",
      });
      refetch(); // Ma'lumotlarni yangilash
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Tahrirlashda xatolik yuz berdi!",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Ma'lumotni o'chirish uchun DELETE so'rov
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deletePrivateInfo();
      toast.success("Shaxsiy ma'lumotlar muvaffaqiyatli o'chirildi!", {
        position: "top-right",
      });
      reset(); // Formni tozalash
      setSelectedRegion("");
      setSelectedDistrict("");
      refetch(); // Ma'lumotlarni yangilash
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "O'chirishda xatolik yuz berdi!",
        {
          position: "top-right",
        }
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="profile-section-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // Ma'lumot mavjudligini tekshirish - id mavjud bo'lsa ma'lumot bor
  const hasPrivateInfo = privateInfo && privateInfo.id !== undefined;

  return (
    <div className="profile-section-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Bosh sahifa</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">Profil</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Shaxsiy ma'lumotlar</span>
      </div>

      <h1 className="page-title">Shaxsiy ma'lumotlar</h1>

      <form className="private-info-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="gender">Jinsi</label>
            <select
              id="gender"
              {...register("gender", { required: "Jinsni tanlang" })}
              className="form-input"
            >
              <option value="">Jinsni tanlang</option>
              <option value="MALE">Erkak</option>
              <option value="FEMALE">Ayol</option>
            </select>
            {errors.gender && (
              <span className="error-message">{errors.gender.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="citizenship">Fuqarolik</label>
            <input
              id="citizenship"
              type="text"
              {...register("citizenship", { required: "Fuqarolikni kiriting" })}
              className="form-input"
              placeholder="Fuqarolik"
            />
            {errors.citizenship && (
              <span className="error-message">
                {errors.citizenship.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="region">Viloyat/Shahar/Respublika</label>
            <select
              id="region"
              {...register("region", { required: "Viloyatni tanlang" })}
              className="form-input"
            >
              <option value="">Viloyatni tanlang</option>
              {Object.keys(regions).map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            {errors.region && (
              <span className="error-message">{errors.region.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="district">Tuman/Shahar</label>
            <select
              id="district"
              {...register("district", { required: "Tumanni tanlang" })}
              className="form-input"
              disabled={!selectedRegion}
            >
              <option value="">Tumanni tanlang</option>
              {selectedRegion &&
                regions[selectedRegion]?.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
            </select>
            {errors.district && (
              <span className="error-message">{errors.district.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Tug'ilgan sana</label>
            <input
              id="birthDate"
              type="date"
              {...register("birthDate", {
                required: "Tug'ilgan sanani kiriting",
              })}
              className="form-input"
            />
            {errors.birthDate && (
              <span className="error-message">{errors.birthDate.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="birthPlace">Tug'ilgan joy</label>
            <input
              id="birthPlace"
              type="text"
              {...register("birthPlace", {
                required: "Tug'ilgan joyni kiriting",
              })}
              className="form-input"
              placeholder="Tug'ilgan joy"
            />
            {errors.birthPlace && (
              <span className="error-message">{errors.birthPlace.message}</span>
            )}
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                {...register("hasCar")}
                className="checkbox-input"
              />
              <span className="checkbox-text">Avtomobilim bor</span>
            </label>
          </div>
        </div>

        <div className="form-actions">
          <div className="button-container">
            <button
              type="button"
              className={`submit-btn create-btn ${
                hasPrivateInfo ? "disabled" : ""
              }`}
              disabled={isCreating || hasPrivateInfo}
              onClick={handleSubmit(handleCreate)}
              title={
                hasPrivateInfo
                  ? "Ma'lumot allaqachon mavjud"
                  : "Yangi ma'lumot yaratish"
              }
            >
              {isCreating ? "Yaratilmoqda..." : "Yaratish"}
            </button>

            <button
              type="button"
              className={`submit-btn update-btn ${
                !hasPrivateInfo ? "disabled" : ""
              }`}
              disabled={isUpdating || !hasPrivateInfo}
              onClick={handleSubmit(handleUpdate)}
              title={
                !hasPrivateInfo
                  ? "Tahrirlash uchun avval ma'lumot yarating"
                  : "Ma'lumotni tahrirlash"
              }
            >
              {isUpdating ? "Yangilanmoqda..." : "Tahrirlash"}
            </button>

            <button
              type="button"
              className={`submit-btn delete-btn ${
                !hasPrivateInfo ? "disabled" : ""
              }`}
              disabled={isDeleting || !hasPrivateInfo}
              onClick={handleDelete}
              title={
                !hasPrivateInfo
                  ? "O'chirish uchun avval ma'lumot yarating"
                  : "Ma'lumotni o'chirish"
              }
            >
              {isDeleting ? "O'chirilmoqda..." : "O'chirish"}
            </button>
          </div>

          <div className="info-message">
            {hasPrivateInfo ? (
              <p className="success-info">
                Shaxsiy ma'lumotlar mavjud. Tahrirlash yoki o'chirish mumkin.
              </p>
            ) : (
              <p className="warning-info">
                Shaxsiy ma'lumotlar mavjud emas. Avval yarating.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
