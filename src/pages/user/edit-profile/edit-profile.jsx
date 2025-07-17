"use client";

import "./edit-profile.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  User,
  Languages,
  GraduationCap,
  Briefcase,
  Users,
  MapPin,
  Camera,
  Plus,
  Trash2,
  Save,
  Edit,
  X,
} from "lucide-react";
import {
  useUserProfile,
  useUpdateUserProfile,
  usePrivateInfo,
  useCreatePrivateInfo,
  useUpdatePrivateInfo,
  useDeletePrivateInfo,
  useEducations,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
  useLanguages,
  useCreateLanguage,
  useUpdateLanguage,
  useDeleteLanguage,
  useRelatives,
  useCreateRelative,
  useUpdateRelative,
  useDeleteRelative,
} from "../../../hooks/useUser";
import { regions } from "../../../utils/regions";
import {
  getAvatarUrl,
  formatValue,
  formatDate,
} from "../../../utils/formatters";

export const EditProfile = () => {
  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    profile: false,
    privateInfo: false,
    educations: false,
    experiences: false,
    languages: false,
    relatives: false,
  });

  // Edit states for tables
  const [editingStates, setEditingStates] = useState({
    education: null,
    experience: null,
    language: null,
    relative: null,
  });

  // Add states for new items
  const [addingStates, setAddingStates] = useState({
    education: false,
    experience: false,
    language: false,
    relative: false,
  });

  // Data hooks
  const { data: userProfile, refetch: refetchProfile } = useUserProfile();
  const { data: privateInfo, refetch: refetchPrivateInfo } = usePrivateInfo();
  const { data: educations = [], refetch: refetchEducations } = useEducations();
  const { data: experiences = [], refetch: refetchExperiences } =
    useExperiences();
  const { data: languages = [], refetch: refetchLanguages } = useLanguages();
  const { data: relatives = [], refetch: refetchRelatives } = useRelatives();

  // Mutation hooks
  const updateProfileMutation = useUpdateUserProfile();
  const createPrivateInfoMutation = useCreatePrivateInfo();
  const updatePrivateInfoMutation = useUpdatePrivateInfo();
  const deletePrivateInfoMutation = useDeletePrivateInfo();
  const createEducationMutation = useCreateEducation();
  const updateEducationMutation = useUpdateEducation();
  const deleteEducationMutation = useDeleteEducation();
  const createExperienceMutation = useCreateExperience();
  const updateExperienceMutation = useUpdateExperience();
  const deleteExperienceMutation = useDeleteExperience();
  const createLanguageMutation = useCreateLanguage();
  const updateLanguageMutation = useUpdateLanguage();
  const deleteLanguageMutation = useDeleteLanguage();
  const createRelativeMutation = useCreateRelative();
  const updateRelativeMutation = useUpdateRelative();
  const deleteRelativeMutation = useDeleteRelative();

  // Forms
  const profileForm = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      fatherName: "",
      status: "UNEMPLOYED",
      phoneNumber: "",
      secondaryPhoneNumber: "",
      telegramUsername: "",
      nationality: "",
      driverLicense: "",
      address: "",
      specialty: "",
    },
  });

  const privateInfoForm = useForm({
    defaultValues: {
      gender: "",
      region: "",
      district: "",
      citizenship: "",
      birthDate: "",
      birthPlace: "",
      hasCar: false,
    },
  });

  // Individual forms for adding/editing
  const educationForm = useForm();
  const experienceForm = useForm();
  const languageForm = useForm();
  const relativeForm = useForm();

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  const watchedRegion = privateInfoForm.watch("region");

  // Helper function to format phone number for backend (remove +)
  const formatPhoneNumberForBackend = (phone) => {
    if (!phone) return "";
    // Remove + and all non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    return cleaned;
  };

  // Helper function to format phone number for UI display (keep +)
  const formatPhoneNumberForUI = (phone) => {
    if (!phone) return "";
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");
    // Add + if not present
    if (cleaned.startsWith("998")) {
      return `+${cleaned}`;
    }
    return phone.startsWith("+") ? phone : `+${phone}`;
  };

  // Load data into forms
  useEffect(() => {
    if (userProfile) {
      profileForm.reset({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        fatherName: userProfile.fatherName || "",
        status: userProfile.status || "UNEMPLOYED",
        phoneNumber: formatPhoneNumberForUI(userProfile.phoneNumber) || "",
        secondaryPhoneNumber:
          formatPhoneNumberForUI(userProfile.secondaryPhoneNumber) || "",
        telegramUsername: userProfile.telegramUsername || "",
        nationality: userProfile.nationality || "",
        driverLicense: userProfile.driverLicense || "",
        address: userProfile.address || "",
        specialty: userProfile.specialty || "",
      });
    }
  }, [userProfile, profileForm]);

  useEffect(() => {
    if (privateInfo && privateInfo.id) {
      privateInfoForm.reset({
        gender: privateInfo.gender || "",
        region: privateInfo.region || "",
        district: privateInfo.district || "",
        citizenship: privateInfo.citizenship || "",
        birthDate: privateInfo.birthDate
          ? privateInfo.birthDate.split("T")[0]
          : "",
        birthPlace: privateInfo.birthPlace || "",
        hasCar: privateInfo.hasCar || false,
      });
      setSelectedRegion(privateInfo.region || "");
    }
  }, [privateInfo, privateInfoForm]);

  // Handle region change
  useEffect(() => {
    if (watchedRegion && watchedRegion !== selectedRegion) {
      setSelectedRegion(watchedRegion);
      privateInfoForm.setValue("district", "");
    }
  }, [watchedRegion, selectedRegion, privateInfoForm]);

  const setLoading = (section, isLoading) => {
    setLoadingStates((prev) => ({ ...prev, [section]: isLoading }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // File size tekshirish - mobil uchun kattaroq limit
      const maxSize = 15 * 1024 * 1024; // 15 MB (mobil rasmlar uchun)

      if (file.size > maxSize) {
        toast.error("Rasm hajmi 15 MB dan oshmasligi kerak!");
        e.target.value = "";
        return;
      }

      // Kengaytirilgan file type tekshirish - mobil formatlar uchun
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "image/heic", // iPhone rasmlar uchun
        "image/heif", // iPhone rasmlar uchun
      ];

      if (!allowedTypes.includes(file.type.toLowerCase())) {
        toast.error(
          "Faqat rasm fayllari (JPEG, PNG, GIF, WebP, HEIC) qabul qilinadi!"
        );
        e.target.value = "";
        return;
      }

      console.log("Selected file:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      setAvatarFile(file);

      // FileReader bilan preview yaratish
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        toast.success(
          "Rasm tanlandi! Saqlash uchun 'Saqlash' tugmasini bosing."
        );
      };
      reader.onerror = () => {
        toast.error("Rasmni o'qishda xatolik yuz berdi");
        setAvatarFile(null);
        setAvatarPreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Profile handlers
  const handleProfileSubmit = async (data) => {
    try {
      setLoading("profile", true);

      // Format phone numbers for backend (without +)
      const formattedData = {
        ...data,
        phoneNumber: formatPhoneNumberForBackend(data.phoneNumber),
        secondaryPhoneNumber: data.secondaryPhoneNumber
          ? formatPhoneNumberForBackend(data.secondaryPhoneNumber)
          : "",
      };

      if (avatarFile) {
        console.log("Uploading with avatar file:", avatarFile.name);

        const formData = new FormData();

        // Add all form fields
        Object.keys(formattedData).forEach((key) => {
          if (
            formattedData[key] !== null &&
            formattedData[key] !== undefined &&
            formattedData[key] !== ""
          ) {
            formData.append(key, formattedData[key]);
          }
        });

        // Add avatar file
        formData.append("avatar", avatarFile, avatarFile.name);

        // Log FormData contents for debugging
        console.log("FormData contents:");
        for (const [key, value] of formData.entries()) {
          console.log(key, value);
        }

        await updateProfileMutation.mutateAsync(formData);
      } else {
        console.log("Updating without avatar");
        await updateProfileMutation.mutateAsync(formattedData);
      }

      await refetchProfile();
      toast.success("Asosiy ma'lumotlar muvaffaqiyatli yangilandi!");
      setAvatarPreview(null);
      setAvatarFile(null);
    } catch (error) {
      console.error("Profile update error:", error);
      console.error("Error response:", error.response?.data);

      if (error.response?.status === 413) {
        toast.error("Rasm hajmi juda katta. Kichikroq rasm tanlang.");
      } else if (error.response?.status === 415) {
        toast.error("Rasm formati qo'llab-quvvatlanmaydi.");
      } else {
        toast.error("Asosiy ma'lumotlarni yangilashda xatolik yuz berdi");
      }
    } finally {
      setLoading("profile", false);
    }
  };

  // Private info handlers - replace the existing handlers
  const handlePrivateInfoSubmit = async (data) => {
    try {
      setLoading("privateInfo", true);

      if (hasPrivateInfo) {
        // Update existing private info
        await updatePrivateInfoMutation.mutateAsync(data);
        toast.success("Shaxsiy ma'lumotlar muvaffaqiyatli yangilandi!");
      } else {
        // Create new private info
        await createPrivateInfoMutation.mutateAsync(data);
        toast.success("Shaxsiy ma'lumotlar muvaffaqiyatli yaratildi!");
      }

      await refetchPrivateInfo();
    } catch (error) {
      console.error("Private info save error:", error);
      toast.error("Shaxsiy ma'lumotlarni saqlashda xatolik yuz berdi");
    } finally {
      setLoading("privateInfo", false);
    }
  };

  const handlePrivateInfoDelete = async () => {
    try {
      setLoading("privateInfo", true);
      await deletePrivateInfoMutation.mutateAsync();
      await refetchPrivateInfo();
      privateInfoForm.reset();
      setSelectedRegion("");
      toast.success("Shaxsiy ma'lumotlar muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Private info delete error:", error);
      toast.error("Shaxsiy ma'lumotlarni o'chirishda xatolik yuz berdi");
    } finally {
      setLoading("privateInfo", false);
    }
  };

  // Education handlers
  const handleEducationAdd = async (data) => {
    try {
      const eduData = {
        schoolName: data.schoolName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
        isPresent: data.isPresent,
      };

      await createEducationMutation.mutateAsync(eduData);
      await refetchEducations();
      setAddingStates((prev) => ({ ...prev, education: false }));
      educationForm.reset();
      toast.success("Ta'lim ma'lumoti muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Education add error:", error);
      toast.error("Ta'lim ma'lumotini qo'shishda xatolik yuz berdi");
    }
  };

  const handleEducationEdit = async (data) => {
    try {
      const eduData = {
        schoolName: data.schoolName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
        isPresent: data.isPresent,
      };

      await updateEducationMutation.mutateAsync({
        educationId: editingStates.education,
        data: eduData,
      });
      await refetchEducations();
      setEditingStates((prev) => ({ ...prev, education: null }));
      educationForm.reset();
      toast.success("Ta'lim ma'lumoti muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.error("Education edit error:", error);
      toast.error("Ta'lim ma'lumotini yangilashda xatolik yuz berdi");
    }
  };

  const handleEducationDelete = async (id) => {
    try {
      await deleteEducationMutation.mutateAsync(id);
      await refetchEducations();
      toast.success("Ta'lim ma'lumoti muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Education delete error:", error);
      toast.error("Ta'lim ma'lumotini o'chirishda xatolik yuz berdi");
    }
  };

  // Experience handlers
  const handleExperienceAdd = async (data) => {
    try {
      const expData = {
        organization: data.organization,
        position: data.position,
        responsibilities: data.responsibilities,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
        isPresent: data.isPresent,
      };

      await createExperienceMutation.mutateAsync(expData);
      await refetchExperiences();
      setAddingStates((prev) => ({ ...prev, experience: false }));
      experienceForm.reset();
      toast.success("Ish tajribasi muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Experience add error:", error);
      toast.error("Ish tajribasini qo'shishda xatolik yuz berdi");
    }
  };

  const handleExperienceEdit = async (data) => {
    try {
      const expData = {
        organization: data.organization,
        position: data.position,
        responsibilities: data.responsibilities,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
        isPresent: data.isPresent,
      };

      await updateExperienceMutation.mutateAsync({
        experienceId: editingStates.experience,
        data: expData,
      });
      await refetchExperiences();
      setEditingStates((prev) => ({ ...prev, experience: null }));
      experienceForm.reset();
      toast.success("Ish tajribasi muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.error("Experience edit error:", error);
      toast.error("Ish tajribasini yangilashda xatolik yuz berdi");
    }
  };

  // Also update the handleExperienceDelete function to use the correct endpoint
  const handleExperienceDelete = async (id) => {
    try {
      console.log("Deleting experience with ID:", id);
      // Try different endpoint format
      await deleteExperienceMutation.mutateAsync(id);
      await refetchExperiences();
      toast.success("Ish tajribasi muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Experience delete error:", error);
      console.error("Error details:", error.response?.data || error.message);

      // Show more specific error message
      if (error.response?.status === 404) {
        toast.error("Ish tajribasi topilmadi yoki allaqachon o'chirilgan");
      } else {
        toast.error("Ish tajribasini o'chirishda xatolik yuz berdi");
      }
    }
  };

  // Language handlers
  const handleLanguageAdd = async (data) => {
    try {
      const langData = {
        language: data.language,
        reading: Number.parseInt(data.reading),
        speaking: Number.parseInt(data.speaking),
        writing: Number.parseInt(data.writing),
        listening: Number.parseInt(data.listening),
      };

      await createLanguageMutation.mutateAsync(langData);
      await refetchLanguages();
      setAddingStates((prev) => ({ ...prev, language: false }));
      languageForm.reset();
      toast.success("Til ma'lumoti muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Language add error:", error);
      toast.error("Til ma'lumotini qo'shishda xatolik yuz berdi");
    }
  };

  const handleLanguageEdit = async (data) => {
    try {
      const langData = {
        language: data.language,
        reading: Number.parseInt(data.reading),
        speaking: Number.parseInt(data.speaking),
        writing: Number.parseInt(data.writing),
        listening: Number.parseInt(data.listening),
      };

      await updateLanguageMutation.mutateAsync({
        languageId: editingStates.language,
        data: langData,
      });
      await refetchLanguages();
      setEditingStates((prev) => ({ ...prev, language: null }));
      languageForm.reset();
      toast.success("Til ma'lumoti muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.error("Language edit error:", error);
      toast.error("Til ma'lumotini yangilashda xatolik yuz berdi");
    }
  };

  const handleLanguageDelete = async (id) => {
    try {
      await deleteLanguageMutation.mutateAsync(id);
      await refetchLanguages();
      toast.success("Til ma'lumoti muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Language delete error:", error);
      toast.error("Til ma'lumotini o'chirishda xatolik yuz berdi");
    }
  };

  // Relative handlers
  const handleRelativeAdd = async (data) => {
    try {
      const relData = {
        fullName: data.fullName,
        birthDate: new Date(data.birthDate).toISOString(),
        workPlace: data.workPlace,
        address: data.address,
        birthPlace: data.birthPlace,
        relativeType: data.relativeType,
      };

      await createRelativeMutation.mutateAsync(relData);
      await refetchRelatives();
      setAddingStates((prev) => ({ ...prev, relative: false }));
      relativeForm.reset();
      toast.success("Qarindosh ma'lumoti muvaffaqiyatli qo'shildi!");
    } catch (error) {
      console.error("Relative add error:", error);
      toast.error("Qarindosh ma'lumotini qo'shishda xatolik yuz berdi");
    }
  };

  const handleRelativeEdit = async (data) => {
    try {
      const relData = {
        fullName: data.fullName,
        birthDate: new Date(data.birthDate).toISOString(),
        workPlace: data.workPlace,
        address: data.address,
        birthPlace: data.birthPlace,
        relativeType: data.relativeType,
      };

      await updateRelativeMutation.mutateAsync({
        relativeId: editingStates.relative,
        data: relData,
      });
      await refetchRelatives();
      setEditingStates((prev) => ({ ...prev, relative: null }));
      relativeForm.reset();
      toast.success("Qarindosh ma'lumoti muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.error("Relative edit error:", error);
      toast.error("Qarindosh ma'lumotini yangilashda xatolik yuz berdi");
    }
  };

  const handleRelativeDelete = async (id) => {
    try {
      await deleteRelativeMutation.mutateAsync(id);
      await refetchRelatives();
      toast.success("Qarindosh ma'lumoti muvaffaqiyatli o'chirildi!");
    } catch (error) {
      console.error("Relative delete error:", error);
      toast.error("Qarindosh ma'lumotini o'chirishda xatolik yuz berdi");
    }
  };

  // Helper functions
  const startEditing = (type, item) => {
    setEditingStates((prev) => ({ ...prev, [type]: item.id }));

    if (type === "education") {
      educationForm.reset({
        schoolName: item.schoolName || "",
        degree: item.degree || "",
        fieldOfStudy: item.fieldOfStudy || "",
        startDate: item.startDate ? item.startDate.split("T")[0] : "",
        endDate: item.endDate ? item.endDate.split("T")[0] : "",
        isPresent: item.isPresent || false,
      });
    } else if (type === "experience") {
      experienceForm.reset({
        organization: item.organization || "",
        position: item.position || "",
        responsibilities: item.responsibilities || "",
        startDate: item.startDate ? item.startDate.split("T")[0] : "",
        endDate: item.endDate ? item.endDate.split("T")[0] : "",
        isPresent: item.isPresent || false,
      });
    } else if (type === "language") {
      languageForm.reset({
        language: item.language || "",
        reading: item.reading || 1,
        speaking: item.speaking || 1,
        writing: item.writing || 1,
        listening: item.listening || 1,
      });
    } else if (type === "relative") {
      relativeForm.reset({
        fullName: item.fullName || "",
        birthDate: item.birthDate ? item.birthDate.split("T")[0] : "",
        workPlace: item.workPlace || "",
        address: item.address || "",
        birthPlace: item.birthPlace || "",
        relativeType: item.relativeType || "",
      });
    }
  };

  const cancelEditing = (type) => {
    setEditingStates((prev) => ({ ...prev, [type]: null }));
    setAddingStates((prev) => ({ ...prev, [type]: false }));

    if (type === "education") educationForm.reset();
    else if (type === "experience") experienceForm.reset();
    else if (type === "language") languageForm.reset();
    else if (type === "relative") relativeForm.reset();
  };

  const relativeTypes = [
    "Ota",
    "Ona",
    "Aka",
    "Uka",
    "Opa",
    "Singil",
    "Er",
    "Xotin",
    "O'g'il",
    "Qiz",
    "Boshqa",
  ];
  const avatarUrl = getAvatarUrl(userProfile?.avatar);
  const hasPrivateInfo = privateInfo && privateInfo.id !== undefined;

  return (
    <div className="edit-profile-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Bosh sahifa</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">Profil</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Profilni tahrirlash</span>
      </div>

      <h1 className="page-title">Profilni tahrirlash</h1>

      {/* Profile Information Section */}
      <div className="form-section">
        <div className="section-header">
          <User size={24} />
          <h2>Asosiy ma'lumotlar</h2>
        </div>

        <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
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
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,image/heic,image/heif"
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>Ism *</label>
              <input
                type="text"
                {...profileForm.register("firstName", {
                  required: "Ism majburiy",
                })}
                placeholder="Ismingizni kiriting"
              />
              {profileForm.formState.errors.firstName && (
                <span className="error">
                  {profileForm.formState.errors.firstName.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Familiya *</label>
              <input
                type="text"
                {...profileForm.register("lastName", {
                  required: "Familiya majburiy",
                })}
                placeholder="Familiyangizni kiriting"
              />
              {profileForm.formState.errors.lastName && (
                <span className="error">
                  {profileForm.formState.errors.lastName.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Otasining ismi</label>
              <input
                type="text"
                {...profileForm.register("fatherName")}
                placeholder="Otangizning ismini kiriting"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select {...profileForm.register("status")}>
                <option value="UNEMPLOYED">Ishsiz</option>
                <option value="EMPLOYED">Ishlamoqda</option>
                <option value="SEARCHING">Ish izlamoqda</option>
              </select>
            </div>

            <div className="form-group">
              <label>Telefon raqam *</label>
              <input
                type="tel"
                {...profileForm.register("phoneNumber", {
                  required: "Telefon raqam majburiy",
                })}
                placeholder="+998901234567"
              />
              {profileForm.formState.errors.phoneNumber && (
                <span className="error">
                  {profileForm.formState.errors.phoneNumber.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Qo'shimcha telefon</label>
              <input
                type="tel"
                {...profileForm.register("secondaryPhoneNumber")}
                placeholder="+998901234567"
              />
            </div>

            <div className="form-group">
              <label>Telegram username</label>
              <input
                type="text"
                {...profileForm.register("telegramUsername")}
                placeholder="@username"
              />
            </div>

            <div className="form-group">
              <label>Millati</label>
              <input
                type="text"
                {...profileForm.register("nationality")}
                placeholder="O'zbek"
              />
            </div>

            <div className="form-group">
              <label>Haydovchilik guvohnomasi</label>
              <input
                type="text"
                {...profileForm.register("driverLicense")}
                placeholder="ABC123456"
              />
            </div>

            <div className="form-group">
              <label>Mutaxassislik</label>
              <input
                type="text"
                {...profileForm.register("specialty")}
                placeholder="Dasturchi"
              />
            </div>

            <div className="form-group full-width">
              <label>Manzil</label>
              <textarea
                {...profileForm.register("address")}
                placeholder="To'liq manzilingizni kiriting"
                rows={3}
              />
            </div>
          </div>

          <div className="section-actions">
            <button
              type="submit"
              className="save-button"
              disabled={loadingStates.profile}
            >
              <Save size={20} />
              {loadingStates.profile
                ? "Saqlanmoqda..."
                : "Asosiy ma'lumotlarni saqlash"}
            </button>
          </div>
        </form>
      </div>

      {/* Private Information Section */}
      <div className="form-section">
        <div className="section-header">
          <MapPin size={24} />
          <h2>Shaxsiy ma'lumotlar</h2>
        </div>

        <form onSubmit={privateInfoForm.handleSubmit(handlePrivateInfoSubmit)}>
          <div className="form-grid">
            <div className="form-group">
              <label>Jinsi *</label>
              <select
                {...privateInfoForm.register("gender", {
                  required: "Jinsni tanlang",
                })}
              >
                <option value="">Jinsni tanlang</option>
                <option value="MALE">Erkak</option>
                <option value="FEMALE">Ayol</option>
              </select>
              {privateInfoForm.formState.errors.gender && (
                <span className="error">
                  {privateInfoForm.formState.errors.gender.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Fuqarolik *</label>
              <input
                type="text"
                {...privateInfoForm.register("citizenship", {
                  required: "Fuqarolikni kiriting",
                })}
                placeholder="Fuqarolik"
              />
              {privateInfoForm.formState.errors.citizenship && (
                <span className="error">
                  {privateInfoForm.formState.errors.citizenship.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Viloyat/Shahar/Respublika *</label>
              <select
                {...privateInfoForm.register("region", {
                  required: "Viloyatni tanlang",
                })}
              >
                <option value="">Viloyatni tanlang</option>
                {Object.keys(regions).map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {privateInfoForm.formState.errors.region && (
                <span className="error">
                  {privateInfoForm.formState.errors.region.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Tuman/Shahar *</label>
              <select
                {...privateInfoForm.register("district", {
                  required: "Tumanni tanlang",
                })}
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
              {privateInfoForm.formState.errors.district && (
                <span className="error">
                  {privateInfoForm.formState.errors.district.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Tug'ilgan sana *</label>
              <input
                type="date"
                {...privateInfoForm.register("birthDate", {
                  required: "Tug'ilgan sanani kiriting",
                })}
              />
              {privateInfoForm.formState.errors.birthDate && (
                <span className="error">
                  {privateInfoForm.formState.errors.birthDate.message}
                </span>
              )}
            </div>

            <div className="form-group">
              <label>Tug'ilgan joy *</label>
              <input
                type="text"
                {...privateInfoForm.register("birthPlace", {
                  required: "Tug'ilgan joyni kiriting",
                })}
                placeholder="Tug'ilgan joy"
              />
              {privateInfoForm.formState.errors.birthPlace && (
                <span className="error">
                  {privateInfoForm.formState.errors.birthPlace.message}
                </span>
              )}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...privateInfoForm.register("hasCar")}
                />
                Avtomobilim bor
              </label>
            </div>
          </div>

          <div className="section-actions">
            <button
              type="submit"
              className="save-button"
              disabled={loadingStates.privateInfo}
            >
              <Save size={20} />
              {loadingStates.privateInfo
                ? "Saqlanmoqda..."
                : "Shaxsiy ma'lumotlarni saqlash"}
            </button>

            {hasPrivateInfo && (
              <button
                type="button"
                className="delete-button"
                disabled={loadingStates.privateInfo}
                onClick={handlePrivateInfoDelete}
                style={{ marginLeft: "10px" }}
              >
                <Trash2 size={20} />
                {loadingStates.privateInfo ? "O'chirilmoqda..." : "O'chirish"}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Education Section */}
      <div className="form-section">
        <div className="section-header">
          <GraduationCap size={24} />
          <h2>Ta'lim</h2>
          <button
            type="button"
            className="add-button"
            onClick={() => {
              setAddingStates((prev) => ({ ...prev, education: true }));
              educationForm.reset();
            }}
          >
            <Plus size={20} />
            Qo'shish
          </button>
        </div>

        {/* Add new education form */}
        {addingStates.education && (
          <div className="add-form">
            <h4>Yangi ta'lim ma'lumoti qo'shish</h4>
            <form onSubmit={educationForm.handleSubmit(handleEducationAdd)}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Ta'lim muassasasi nomi *</label>
                  <input
                    type="text"
                    {...educationForm.register("schoolName", {
                      required: "Ta'lim muassasasi nomi majburiy",
                    })}
                    placeholder="Toshkent Davlat Universiteti"
                  />
                </div>
                <div className="form-group">
                  <label>Daraja *</label>
                  <input
                    type="text"
                    {...educationForm.register("degree", {
                      required: "Daraja majburiy",
                    })}
                    placeholder="Bakalavr"
                  />
                </div>
                <div className="form-group">
                  <label>Yo'nalish *</label>
                  <input
                    type="text"
                    {...educationForm.register("fieldOfStudy", {
                      required: "Yo'nalish majburiy",
                    })}
                    placeholder="Kompyuter fanlari"
                  />
                </div>
                <div className="form-group">
                  <label>Boshlanish sanasi *</label>
                  <input
                    type="date"
                    {...educationForm.register("startDate", {
                      required: "Boshlanish sanasi majburiy",
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Tugash sanasi</label>
                  <input type="date" {...educationForm.register("endDate")} />
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...educationForm.register("isPresent")}
                    />
                    Hozir o'qiyapman
                  </label>
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => cancelEditing("education")}
                >
                  <X size={20} />
                  Bekor qilish
                </button>
                <button type="submit" className="save-button">
                  <Save size={20} />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Education table */}
        <div className="table-section">
          {educations.length > 0 ? (
            <div className="modern-table">
              <table>
                <thead>
                  <tr>
                    <th>Ta'lim muassasasi</th>
                    <th>Daraja</th>
                    <th>Yo'nalish</th>
                    <th>Boshlanish</th>
                    <th>Tugash</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {educations.map((education) => (
                    <tr key={education.id}>
                      {editingStates.education === education.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...educationForm.register("schoolName", {
                                required: "Ta'lim muassasasi nomi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...educationForm.register("degree", {
                                required: "Daraja majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...educationForm.register("fieldOfStudy", {
                                required: "Yo'nalish majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...educationForm.register("startDate", {
                                required: "Boshlanish sanasi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...educationForm.register("endDate")}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn save"
                                onClick={educationForm.handleSubmit(
                                  handleEducationEdit
                                )}
                              >
                                Saqlash
                              </button>
                              <button
                                className="action-btn cancel"
                                onClick={() => cancelEditing("education")}
                              >
                                Bekor qilish
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="primary-cell">
                            {formatValue(education.schoolName)}
                          </td>
                          <td>{formatValue(education.degree)}</td>
                          <td>{formatValue(education.fieldOfStudy)}</td>
                          <td>{formatDate(education.startDate)}</td>
                          <td>
                            {education.isPresent
                              ? "Hozir"
                              : formatDate(education.endDate)}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn edit"
                                onClick={() =>
                                  startEditing("education", education)
                                }
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() =>
                                  handleEducationDelete(education.id)
                                }
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              <GraduationCap size={48} />
              <p>Hali ta'lim ma'lumotlari qo'shilmagan</p>
            </div>
          )}
        </div>
      </div>

      {/* Experience Section */}
      <div className="form-section">
        <div className="section-header">
          <Briefcase size={24} />
          <h2>Ish tajribasi</h2>
          <button
            type="button"
            className="add-button"
            onClick={() => {
              setAddingStates((prev) => ({ ...prev, experience: true }));
              experienceForm.reset();
            }}
          >
            <Plus size={20} />
            Qo'shish
          </button>
        </div>

        {/* Add new experience form */}
        {addingStates.experience && (
          <div className="add-form">
            <h4>Yangi ish tajribasi qo'shish</h4>
            <form onSubmit={experienceForm.handleSubmit(handleExperienceAdd)}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tashkilot nomi *</label>
                  <input
                    type="text"
                    {...experienceForm.register("organization", {
                      required: "Tashkilot nomi majburiy",
                    })}
                    placeholder="Tech Solutions LLC"
                  />
                </div>
                <div className="form-group">
                  <label>Lavozim *</label>
                  <input
                    type="text"
                    {...experienceForm.register("position", {
                      required: "Lavozim majburiy",
                    })}
                    placeholder="Dasturchi"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Mas'uliyatlar *</label>
                  <textarea
                    {...experienceForm.register("responsibilities", {
                      required: "Mas'uliyatlar majburiy",
                    })}
                    placeholder="React va Node.js yordamida veb-ilovalar ishlab chiqish..."
                    rows={4}
                  />
                </div>
                <div className="form-group">
                  <label>Boshlanish sanasi *</label>
                  <input
                    type="date"
                    {...experienceForm.register("startDate", {
                      required: "Boshlanish sanasi majburiy",
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Tugash sanasi</label>
                  <input type="date" {...experienceForm.register("endDate")} />
                </div>
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      {...experienceForm.register("isPresent")}
                    />
                    Hozir ishlayapman
                  </label>
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => cancelEditing("experience")}
                >
                  <X size={20} />
                  Bekor qilish
                </button>
                <button type="submit" className="save-button">
                  <Save size={20} />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Experience table */}
        <div className="table-section">
          {experiences.length > 0 ? (
            <div className="modern-table">
              <table>
                <thead>
                  <tr>
                    <th>Tashkilot</th>
                    <th>Lavozim</th>
                    <th>Mas'uliyatlar</th>
                    <th>Boshlanish</th>
                    <th>Tugash</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.map((experience) => (
                    <tr key={experience.id}>
                      {editingStates.experience === experience.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...experienceForm.register("organization", {
                                required: "Tashkilot nomi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...experienceForm.register("position", {
                                required: "Lavozim majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <textarea
                              {...experienceForm.register("responsibilities", {
                                required: "Mas'uliyatlar majburiy",
                              })}
                              className="table-textarea"
                              rows={2}
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...experienceForm.register("startDate", {
                                required: "Boshlanish sanasi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...experienceForm.register("endDate")}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn save"
                                onClick={experienceForm.handleSubmit(
                                  handleExperienceEdit
                                )}
                              >
                                Saqlash
                              </button>
                              <button
                                className="action-btn cancel"
                                onClick={() => cancelEditing("experience")}
                              >
                                Bekor qilish
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="primary-cell">
                            {formatValue(experience.organization)}
                          </td>
                          <td>{formatValue(experience.position)}</td>
                          <td className="description-cell">
                            {formatValue(experience.responsibilities)}
                          </td>
                          <td>{formatDate(experience.startDate)}</td>
                          <td>
                            {experience.isPresent
                              ? "Hozir"
                              : formatDate(experience.endDate)}
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn edit"
                                onClick={() =>
                                  startEditing("experience", experience)
                                }
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() =>
                                  handleExperienceDelete(experience.id)
                                }
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              <Briefcase size={48} />
              <p>Hali ish tajribasi ma'lumotlari qo'shilmagan</p>
            </div>
          )}
        </div>
      </div>

      {/* Languages Section */}
      <div className="form-section">
        <div className="section-header">
          <Languages size={24} />
          <h2>Tillar</h2>
          <button
            type="button"
            className="add-button"
            onClick={() => {
              setAddingStates((prev) => ({ ...prev, language: true }));
              languageForm.reset();
            }}
          >
            <Plus size={20} />
            Qo'shish
          </button>
        </div>

        {/* Add new language form */}
        {addingStates.language && (
          <div className="add-form">
            <h4>Yangi til qo'shish</h4>
            <form onSubmit={languageForm.handleSubmit(handleLanguageAdd)}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Til nomi *</label>
                  <input
                    type="text"
                    {...languageForm.register("language", {
                      required: "Til nomi majburiy",
                    })}
                    placeholder="Ingliz tili"
                  />
                </div>
                <div className="form-group">
                  <label>O'qish (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...languageForm.register("reading", {
                      required: "O'qish darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="8"
                  />
                </div>
                <div className="form-group">
                  <label>Gapirish (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...languageForm.register("speaking", {
                      required: "Gapirish darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="7"
                  />
                </div>
                <div className="form-group">
                  <label>Yozish (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...languageForm.register("writing", {
                      required: "Yozish darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="6"
                  />
                </div>
                <div className="form-group">
                  <label>Tinglash (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...languageForm.register("listening", {
                      required: "Tinglash darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="9"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => cancelEditing("language")}
                >
                  <X size={20} />
                  Bekor qilish
                </button>
                <button type="submit" className="save-button">
                  <Save size={20} />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Languages table */}
        <div className="table-section">
          {languages.length > 0 ? (
            <div className="modern-table">
              <table>
                <thead>
                  <tr>
                    <th>Til</th>
                    <th>O'qish</th>
                    <th>Gapirish</th>
                    <th>Yozish</th>
                    <th>Tinglash</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {languages.map((language) => (
                    <tr key={language.id}>
                      {editingStates.language === language.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...languageForm.register("language", {
                                required: "Til nomi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              {...languageForm.register("reading", {
                                required: "O'qish darajasi majburiy",
                                min: 1,
                                max: 10,
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              {...languageForm.register("speaking", {
                                required: "Gapirish darajasi majburiy",
                                min: 1,
                                max: 10,
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              {...languageForm.register("writing", {
                                required: "Yozish darajasi majburiy",
                                min: 1,
                                max: 10,
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              {...languageForm.register("listening", {
                                required: "Tinglash darajasi majburiy",
                                min: 1,
                                max: 10,
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn save"
                                onClick={languageForm.handleSubmit(
                                  handleLanguageEdit
                                )}
                              >
                                Saqlash
                              </button>
                              <button
                                className="action-btn cancel"
                                onClick={() => cancelEditing("language")}
                              >
                                Bekor qilish
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="primary-cell">{language.language}</td>
                          <td>
                            <div className="skill-display">
                              <div className="skill-bar">
                                <div
                                  className="skill-progress"
                                  style={{
                                    width: `${(language.reading / 10) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span>{language.reading}/10</span>
                            </div>
                          </td>
                          <td>
                            <div className="skill-display">
                              <div className="skill-bar">
                                <div
                                  className="skill-progress"
                                  style={{
                                    width: `${(language.speaking / 10) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span>{language.speaking}/10</span>
                            </div>
                          </td>
                          <td>
                            <div className="skill-display">
                              <div className="skill-bar">
                                <div
                                  className="skill-progress"
                                  style={{
                                    width: `${(language.writing / 10) * 100}%`,
                                  }}
                                ></div>
                              </div>
                              <span>{language.writing}/10</span>
                            </div>
                          </td>
                          <td>
                            <div className="skill-display">
                              <div className="skill-bar">
                                <div
                                  className="skill-progress"
                                  style={{
                                    width: `${
                                      (language.listening / 10) * 100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                              <span>{language.listening}/10</span>
                            </div>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn edit"
                                onClick={() =>
                                  startEditing("language", language)
                                }
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() =>
                                  handleLanguageDelete(language.id)
                                }
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              <Languages size={48} />
              <p>Hali til ma'lumotlari qo'shilmagan</p>
            </div>
          )}
        </div>
      </div>

      {/* Relatives Section */}
      <div className="form-section">
        <div className="section-header">
          <Users size={24} />
          <h2>Qarindoshlar</h2>
          <button
            type="button"
            className="add-button"
            onClick={() => {
              setAddingStates((prev) => ({ ...prev, relative: true }));
              relativeForm.reset();
            }}
          >
            <Plus size={20} />
            Qo'shish
          </button>
        </div>

        {/* Add new relative form */}
        {addingStates.relative && (
          <div className="add-form">
            <h4>Yangi qarindosh ma'lumoti qo'shish</h4>
            <form onSubmit={relativeForm.handleSubmit(handleRelativeAdd)}>
              <div className="form-grid">
                <div className="form-group">
                  <label>To'liq ismi *</label>
                  <input
                    type="text"
                    {...relativeForm.register("fullName", {
                      required: "To'liq ism majburiy",
                    })}
                    placeholder="Ahmadov Ahmad Ahmadovich"
                  />
                </div>
                <div className="form-group">
                  <label>Qarindoshlik turi *</label>
                  <select
                    {...relativeForm.register("relativeType", {
                      required: "Qarindoshlik turi majburiy",
                    })}
                  >
                    <option value="">Tanlang</option>
                    {relativeTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Tug'ilgan sanasi *</label>
                  <input
                    type="date"
                    {...relativeForm.register("birthDate", {
                      required: "Tug'ilgan sana majburiy",
                    })}
                  />
                </div>
                <div className="form-group">
                  <label>Tug'ilgan joyi *</label>
                  <input
                    type="text"
                    {...relativeForm.register("birthPlace", {
                      required: "Tug'ilgan joy majburiy",
                    })}
                    placeholder="Toshkent, O'zbekiston"
                  />
                </div>
                <div className="form-group">
                  <label>Ish joyi *</label>
                  <input
                    type="text"
                    {...relativeForm.register("workPlace", {
                      required: "Ish joyi majburiy",
                    })}
                    placeholder="Toshkent Davlat Universiteti"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Manzil *</label>
                  <textarea
                    {...relativeForm.register("address", {
                      required: "Manzil majburiy",
                    })}
                    placeholder="To'liq yashash manzili"
                    rows={3}
                  />
                </div>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => cancelEditing("relative")}
                >
                  <X size={20} />
                  Bekor qilish
                </button>
                <button type="submit" className="save-button">
                  <Save size={20} />
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Relatives table */}
        <div className="table-section">
          {relatives.length > 0 ? (
            <div className="modern-table">
              <table>
                <thead>
                  <tr>
                    <th>FIO</th>
                    <th>Tug'ilgan kuni</th>
                    <th>Ish joyi</th>
                    <th>Manzil</th>
                    <th>Tug'ilgan joyi</th>
                    <th>Qarindosh</th>
                    <th>Amallar</th>
                  </tr>
                </thead>
                <tbody>
                  {relatives.map((relative) => (
                    <tr key={relative.id}>
                      {editingStates.relative === relative.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...relativeForm.register("fullName", {
                                required: "To'liq ism majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...relativeForm.register("birthDate", {
                                required: "Tug'ilgan sana majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...relativeForm.register("workPlace", {
                                required: "Ish joyi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <textarea
                              {...relativeForm.register("address", {
                                required: "Manzil majburiy",
                              })}
                              className="table-textarea"
                              rows={2}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...relativeForm.register("birthPlace", {
                                required: "Tug'ilgan joy majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <select
                              {...relativeForm.register("relativeType", {
                                required: "Qarindoshlik turi majburiy",
                              })}
                              className="table-select"
                            >
                              <option value="">Tanlang</option>
                              {relativeTypes.map((type) => (
                                <option key={type} value={type}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn save"
                                onClick={relativeForm.handleSubmit(
                                  handleRelativeEdit
                                )}
                              >
                                Saqlash
                              </button>
                              <button
                                className="action-btn cancel"
                                onClick={() => cancelEditing("relative")}
                              >
                                Bekor qilish
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="primary-cell">
                            {formatValue(relative.fullName)}
                          </td>
                          <td>{formatDate(relative.birthDate)}</td>
                          <td>{formatValue(relative.workPlace)}</td>
                          <td className="description-cell">
                            {formatValue(relative.address)}
                          </td>
                          <td>{formatValue(relative.birthPlace)}</td>
                          <td>
                            <span className="relative-type-badge">
                              {relative.relativeType}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn edit"
                                onClick={() =>
                                  startEditing("relative", relative)
                                }
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() =>
                                  handleRelativeDelete(relative.id)
                                }
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              <Users size={48} />
              <p>Hali qarindosh ma'lumotlari qo'shilmagan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
