"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserProfile, useUpdateUserProfile } from "../../../hooks/useUser";
import {
  formatValue,
  formatPhoneNumber,
  formatStatus,
  getAvatarUrl,
} from "../../../utils/formatters";
import { User, Camera, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import "./profile-sections.scss";

export const ProfileInfo = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    data: userProfile,
    isLoading: profileLoading,
    error: profileError,
  } = useUserProfile();
  const updateProfileMutation = useUpdateUserProfile();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm();

  // userProfile endi to'g'ridan-to'g'ri user object
  const profile = userProfile;

  useEffect(() => {
    if (profile) {
      resetProfile({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        fatherName: profile.fatherName || "",
        status: profile.status || "UNEMPLOYED",
        phoneNumber: profile.phoneNumber || "",
        secondaryPhoneNumber: profile.secondaryPhoneNumber || "",
        telegramUsername: profile.telegramUsername || "",
        nationality: profile.nationality || "",
        driverLicense: profile.driverLicense || "",
        address: profile.address || "",
        specialty: profile.specialty || "",
      });
    }
  }, [profile, resetProfile]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size tekshirish (10 MB = 10 * 1024 * 1024 bytes)
      const maxSize = 10 * 1024 * 1024; // 10 MB

      if (file.size > maxSize) {
        toast.error("Rasm hajmi 10 MB dan oshmasligi kerak!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        // Input ni tozalash
        e.target.value = "";
        return;
      }

      // File type tekshirish
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Faqat rasm fayllari (JPEG, PNG, GIF, WebP) qabul qilinadi!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        e.target.value = "";
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      toast.success(
        "Rasm tanlandi! Saqlash uchun 'Saqlash' tugmasini bosing.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  const onSubmitProfile = async (data) => {
    try {
      // Faqat o'zgargan ma'lumotlarni aniqlash
      const changedData = {};
      Object.keys(data).forEach((key) => {
        if (
          data[key] !== profile?.[key] &&
          data[key] !== null &&
          data[key] !== undefined &&
          data[key] !== ""
        ) {
          changedData[key] = data[key];
        }
      });

      console.log("Changed data:", changedData);

      // Agar avatar fayli bor bo'lsa, FormData ishlatish
      if (avatarFile) {
        const formData = new FormData();

        // Faqat o'zgargan ma'lumotlarni qo'shish
        Object.keys(changedData).forEach((key) => {
          formData.append(key, changedData[key]);
        });

        formData.append("avatar", avatarFile);

        console.log("FormData with avatar being sent");
        await updateProfileMutation.mutateAsync(formData);
      } else {
        // Faqat JSON ma'lumotlarni yuborish
        if (Object.keys(changedData).length > 0) {
          await updateProfileMutation.mutateAsync(changedData);
        } else {
          toast.info("Hech qanday o'zgarish kiritilmagan");
          return;
        }
      }

      toast.success("Profil muvaffaqiyatli yangilandi!");
      setIsEditingProfile(false);
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch (error) {
      toast.error("Profilni yangilashda xatolik yuz berdi");
      console.error("Update error:", error);
    }
  };

  const handleCancelProfile = () => {
    setIsEditingProfile(false);
    setAvatarPreview(null);
    setAvatarFile(null);
    resetProfile();
  };

  if (profileLoading) {
    return (
      <div className="profile-section-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="profile-section-container">
        <div className="error-state">
          <p>Profil ma'lumotlarini yuklashda xatolik yuz berdi</p>
        </div>
      </div>
    );
  }

  const avatarUrl = getAvatarUrl(profile?.avatar);

  return (
    <div className="profile-section-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Bosh sahifa</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">Profil</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">Profilni tahrirlash</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Ma'lumotlar</span>
      </div>

      {/* Profil ma'lumotlari */}
      <div className="info-section">
        <div className="section-header">
          <div className="header-left">
            <User size={24} />
            <h1>Profil ma'lumotlari</h1>
          </div>
          {!isEditingProfile && (
            <button
              className="edit-button"
              onClick={() => setIsEditingProfile(true)}
            >
              Tahrirlash
            </button>
          )}
        </div>

        <div className="profile-form-container">
          {isEditingProfile ? (
            <form
              onSubmit={handleSubmitProfile(onSubmitProfile)}
              className="profile-form"
            >
              {/* Avatar section */}
              <div className="avatar-section">
                <div className="avatar-container">
                  <div className="avatar-wrapper">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview || "/placeholder.svg"}
                        alt="Profil rasmi preview"
                        className="avatar-image"
                      />
                    ) : avatarUrl ? (
                      <img
                        src={avatarUrl || "/placeholder.svg"}
                        alt="Profil rasmi"
                        className="avatar-image"
                        onError={(e) => {
                          console.log("Avatar yuklashda xatolik:", e);
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : (
                      <div className="avatar-placeholder">
                        <User size={48} />
                      </div>
                    )}
                    <label className="avatar-upload-button">
                      <Camera size={20} />
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                        onChange={handleAvatarChange}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div className="form-grid">
                <div className="form-group">
                  <label>Ism</label>
                  <input
                    type="text"
                    {...registerProfile("firstName")}
                    placeholder="Ismingizni kiriting"
                  />
                </div>

                <div className="form-group">
                  <label>Familiya</label>
                  <input
                    type="text"
                    {...registerProfile("lastName")}
                    placeholder="Familiyangizni kiriting"
                  />
                </div>

                <div className="form-group">
                  <label>Otasining ismi</label>
                  <input
                    type="text"
                    {...registerProfile("fatherName")}
                    placeholder="Otangizning ismini kiriting"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select {...registerProfile("status")}>
                    <option value="UNEMPLOYED">Ishsiz</option>
                    <option value="EMPLOYED">Ishlamoqda</option>
                    <option value="SEARCHING">Ish izlamoqda</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Telefon raqam</label>
                  <input
                    type="tel"
                    {...registerProfile("phoneNumber")}
                    placeholder="+998901234567"
                  />
                </div>

                <div className="form-group">
                  <label>Qo'shimcha telefon</label>
                  <input
                    type="tel"
                    {...registerProfile("secondaryPhoneNumber")}
                    placeholder="+998901234567"
                  />
                </div>

                <div className="form-group">
                  <label>Telegram username</label>
                  <input
                    type="text"
                    {...registerProfile("telegramUsername")}
                    placeholder="@username"
                  />
                </div>

                <div className="form-group">
                  <label>Millati</label>
                  <input
                    type="text"
                    {...registerProfile("nationality")}
                    placeholder="O'zbek"
                  />
                </div>

                <div className="form-group">
                  <label>Haydovchilik guvohnomasi</label>
                  <input
                    type="text"
                    {...registerProfile("driverLicense")}
                    placeholder="ABC123456"
                  />
                </div>

                <div className="form-group">
                  <label>Mutaxassislik</label>
                  <input
                    type="text"
                    {...registerProfile("specialty")}
                    placeholder="Dasturchi"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Manzil</label>
                  <textarea
                    {...registerProfile("address")}
                    placeholder="To'liq manzilingizni kiriting"
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelProfile}
                >
                  <X size={20} />
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="save-button"
                  disabled={updateProfileMutation.isPending}
                >
                  <Save size={20} />
                  {updateProfileMutation.isPending
                    ? "Saqlanmoqda..."
                    : "Saqlash"}
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-view">
              <div className="avatar-section">
                <div className="avatar-container">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl || "/placeholder.svg"}
                      alt="Profil rasmi"
                      className="avatar-image"
                      onError={(e) => {
                        console.log("Avatar display xatolik:", e);
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="avatar-placeholder"
                    style={{ display: avatarUrl ? "none" : "flex" }}
                  >
                    <User size={48} />
                  </div>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <label>Ism:</label>
                  <span>{formatValue(profile?.firstName)}</span>
                </div>
                <div className="info-item">
                  <label>Familiya:</label>
                  <span>{formatValue(profile?.lastName)}</span>
                </div>
                <div className="info-item">
                  <label>Otasining ismi:</label>
                  <span>{formatValue(profile?.fatherName)}</span>
                </div>
                <div className="info-item">
                  <label>Status:</label>
                  <span>{formatStatus(profile?.status)}</span>
                </div>
                <div className="info-item">
                  <label>Telefon raqam:</label>
                  <span>{formatPhoneNumber(profile?.phoneNumber)}</span>
                </div>
                <div className="info-item">
                  <label>Qo'shimcha telefon:</label>
                  <span>
                    {formatPhoneNumber(profile?.secondaryPhoneNumber)}
                  </span>
                </div>
                <div className="info-item">
                  <label>Telegram username:</label>
                  <span>{formatValue(profile?.telegramUsername)}</span>
                </div>
                <div className="info-item">
                  <label>Millati:</label>
                  <span>{formatValue(profile?.nationality)}</span>
                </div>
                <div className="info-item">
                  <label>Haydovchilik guvohnomasi:</label>
                  <span>{formatValue(profile?.driverLicense)}</span>
                </div>
                <div className="info-item">
                  <label>Mutaxassislik:</label>
                  <span>{formatValue(profile?.specialty)}</span>
                </div>
                <div className="info-item full-width">
                  <label>Manzil:</label>
                  <span>{formatValue(profile?.address)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
