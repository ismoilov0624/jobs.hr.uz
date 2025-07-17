"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchCompleteUserProfile } from "../../../services/api/user";
import {
  useUserProfile,
  usePrivateInfo,
  useEducations,
  useExperiences,
  useLanguages,
  useRelatives,
} from "../../../hooks/useUser";
import {
  formatValue,
  formatDate,
  formatPhoneNumber,
  formatStatus,
  formatGender,
  getAvatarUrl,
} from "../../../utils/formatters";
import {
  User,
  MapPin,
  GraduationCap,
  Briefcase,
  Languages,
  Users,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  LocateIcon as LocationIcon,
} from "lucide-react";
import DownloadResumeButton from "../../../components/resume-pdf/download-resume-button";
import "./personal-infos.scss";

const PersonalInfos = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [isViewingOtherUser, setIsViewingOtherUser] = useState(false);

  // Current user hooks (when no userId parameter)
  const { data: currentUserProfile, isLoading: currentProfileLoading } =
    useUserProfile();
  const { data: currentPrivateInfo, isLoading: currentPrivateLoading } =
    usePrivateInfo();
  const { data: currentEducations, isLoading: currentEducationsLoading } =
    useEducations();
  const { data: currentExperiences, isLoading: currentExperiencesLoading } =
    useExperiences();
  const { data: currentLanguages, isLoading: currentLanguagesLoading } =
    useLanguages();
  const { data: currentRelatives, isLoading: currentRelativesLoading } =
    useRelatives();

  // Check if we're viewing another user's profile
  useEffect(() => {
    setIsViewingOtherUser(!!userId);
  }, [userId]);

  // Fetch other user's data when userId is present
  const {
    data: otherUserData,
    isLoading: otherUserLoading,
    error,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchCompleteUserProfile(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  // Handle back button click
  const handleBack = () => {
    navigate(-1);
  };

  // Determine which data to use
  const userData = isViewingOtherUser
    ? otherUserData?.userProfile
    : currentUserProfile;
  const privateInfo = isViewingOtherUser
    ? otherUserData?.privateInfo
    : currentPrivateInfo;
  const educations = isViewingOtherUser
    ? otherUserData?.educations
    : currentEducations;
  const experiences = isViewingOtherUser
    ? otherUserData?.experiences
    : currentExperiences;
  const languages = isViewingOtherUser
    ? otherUserData?.languages
    : currentLanguages;
  const relatives = isViewingOtherUser
    ? otherUserData?.relatives
    : currentRelatives;

  // Loading states
  const isLoading = isViewingOtherUser
    ? otherUserLoading
    : currentProfileLoading ||
      currentPrivateLoading ||
      currentEducationsLoading ||
      currentExperiencesLoading ||
      currentLanguagesLoading ||
      currentRelativesLoading;

  if (isLoading) {
    return (
      <div className="personal-infos-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Ma'lumotlar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (isViewingOtherUser && error) {
    return (
      <div className="personal-infos-container">
        <div className="error-state">
          <h3>Xatolik yuz berdi</h3>
          <p>{error.message || "Ma'lumotlarni yuklashda xatolik yuz berdi"}</p>
          <button onClick={handleBack} className="back-button">
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  if (isViewingOtherUser && !userData) {
    return (
      <div className="personal-infos-container">
        <div className="error-state">
          <h3>Foydalanuvchi topilmadi</h3>
          <p>So'ralgan foydalanuvchi ma'lumotlari mavjud emas</p>
          <button onClick={handleBack} className="back-button">
            Orqaga qaytish
          </button>
        </div>
      </div>
    );
  }

  const avatarUrl = getAvatarUrl(userData?.avatar);

  return (
    <div className="personal-infos-container">
      {isViewingOtherUser ? (
        // Admin view for other user
        <div className="admin-view">
          <div className="admin-header">
            <button onClick={handleBack} className="back-button">
              <ArrowLeft size={20} />
              <span>Orqaga qaytish</span>
            </button>
            <h1 className="page-title">Foydalanuvchi ma'lumotlari</h1>
          </div>

          {/* User Profile Card */}
          <div className="user-profile-card">
            <div className="profile-header">
              <div className="avatar-section">
                {avatarUrl ? (
                  <img
                    src={`https://api.sahifam.uz/uploads/${userData.avatar}`}
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="user-avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    <User size={48} />
                  </div>
                )}
                <div className="status-badge">
                  <span className={`status ${userData.status?.toLowerCase()}`}>
                    {formatStatus(userData.status)}
                  </span>
                </div>
              </div>
              <div className="profile-info">
                <h2 className="user-name">
                  {userData.lastName} {userData.firstName} {userData.fatherName}
                </h2>
                <p className="user-specialty">{userData.specialty}</p>
                <div className="contact-info">
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>{userData.phoneNumber}</span>
                  </div>
                  {userData.telegramUsername && (
                    <div className="contact-item">
                      <Mail size={16} />
                      <span>{userData.telegramUsername}</span>
                    </div>
                  )}
                  <div className="contact-item">
                    <LocationIcon size={16} />
                    <span>{userData.address}</span>
                  </div>
                </div>
              </div>
              <div className="actions-section">
                <DownloadResumeButton
                  userData={userData}
                  privateInfo={privateInfo}
                  educations={educations}
                  experiences={experiences}
                  languages={languages}
                  relatives={relatives}
                  isViewMode={true}
                />
              </div>
            </div>
          </div>

          {/* Information Sections */}
          <div className="info-sections">
            {/* Personal Information */}
            <div className="info-card">
              <div className="card-header">
                <MapPin size={20} />
                <h3>Shaxsiy ma'lumotlar</h3>
              </div>
              <div className="card-content">
                {privateInfo ? (
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="label">Jinsi</span>
                      <span className="value">
                        {formatGender(privateInfo.gender)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Viloyat</span>
                      <span className="value">{privateInfo.region}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Tuman</span>
                      <span className="value">{privateInfo.district}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Fuqaroligi</span>
                      <span className="value">{privateInfo.citizenship}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Tug'ilgan sana</span>
                      <span className="value">
                        {formatDate(privateInfo.birthDate)}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Tug'ilgan joy</span>
                      <span className="value">{privateInfo.birthPlace}</span>
                    </div>
                    <div className="info-item">
                      <span className="label">Avtomobil</span>
                      <span
                        className={`value ${
                          privateInfo.hasCar ? "has-car" : "no-car"
                        }`}
                      >
                        {privateInfo.hasCar ? "Bor" : "Yo'q"}
                      </span>
                    </div>
                    <div className="info-item">
                      <span className="label">Millati</span>
                      <span className="value">{userData.nationality}</span>
                    </div>
                  </div>
                ) : (
                  <p className="no-data">Shaxsiy ma'lumotlar mavjud emas</p>
                )}
              </div>
            </div>

            {/* Education */}
            <div className="info-card">
              <div className="card-header">
                <GraduationCap size={20} />
                <h3>Ta'lim</h3>
              </div>
              <div className="card-content">
                {educations && educations.length > 0 ? (
                  <div className="timeline">
                    {educations.map((edu) => (
                      <div key={edu.id} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>{edu.schoolName}</h4>
                          <p className="degree">
                            {edu.degree} - {edu.fieldOfStudy}
                          </p>
                          <p className="period">
                            <Calendar size={14} />
                            {formatDate(edu.startDate)} -{" "}
                            {edu.isPresent
                              ? "Hozirgi vaqtgacha"
                              : formatDate(edu.endDate)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">Ta'lim ma'lumotlari mavjud emas</p>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="info-card">
              <div className="card-header">
                <Briefcase size={20} />
                <h3>Ish tajribasi</h3>
              </div>
              <div className="card-content">
                {experiences && experiences.length > 0 ? (
                  <div className="timeline">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="timeline-item">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>{exp.position}</h4>
                          <p className="organization">{exp.organization}</p>
                          <p className="responsibilities">
                            {exp.responsibilities}
                          </p>
                          <p className="period">
                            <Calendar size={14} />
                            {formatDate(exp.startDate)} -{" "}
                            {exp.isPresent
                              ? "Hozirgi vaqtgacha"
                              : formatDate(exp.endDate)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">
                    Ish tajribasi ma'lumotlari mavjud emas
                  </p>
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="info-card">
              <div className="card-header">
                <Languages size={20} />
                <h3>Tillar</h3>
              </div>
              <div className="card-content">
                {languages && languages.length > 0 ? (
                  <div className="languages-grid">
                    {languages.map((lang) => (
                      <div key={lang.id} className="language-card">
                        <h4>{lang.language}</h4>
                        <div className="skills">
                          <div className="skill">
                            <span className="skill-name">O'qish</span>
                            <div className="skill-bar">
                              <div
                                className="skill-progress"
                                style={{
                                  width: `${(lang.reading / 10) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="skill-score">
                              {lang.reading}/10
                            </span>
                          </div>
                          <div className="skill">
                            <span className="skill-name">Yozish</span>
                            <div className="skill-bar">
                              <div
                                className="skill-progress"
                                style={{
                                  width: `${(lang.writing / 10) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="skill-score">
                              {lang.writing}/10
                            </span>
                          </div>
                          <div className="skill">
                            <span className="skill-name">Gapirish</span>
                            <div className="skill-bar">
                              <div
                                className="skill-progress"
                                style={{
                                  width: `${(lang.speaking / 10) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="skill-score">
                              {lang.speaking}/10
                            </span>
                          </div>
                          <div className="skill">
                            <span className="skill-name">Tinglash</span>
                            <div className="skill-bar">
                              <div
                                className="skill-progress"
                                style={{
                                  width: `${(lang.listening / 10) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="skill-score">
                              {lang.listening}/10
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">Til ma'lumotlari mavjud emas</p>
                )}
              </div>
            </div>

            {/* Relatives */}
            <div className="info-card">
              <div className="card-header">
                <Users size={20} />
                <h3>Qarindoshlar</h3>
              </div>
              <div className="card-content">
                {relatives && relatives.length > 0 ? (
                  <div className="relatives-grid">
                    {relatives.map((rel) => (
                      <div key={rel.id} className="relative-card">
                        <div className="relative-header">
                          <h4>{rel.fullName}</h4>
                          <span className="relationship-badge">
                            {rel.relativeType}
                          </span>
                        </div>
                        <div className="relative-info">
                          <p>
                            <strong>Tug'ilgan sana:</strong>{" "}
                            {formatDate(rel.birthDate)}
                          </p>
                          <p>
                            <strong>Tug'ilgan joy:</strong> {rel.birthPlace}
                          </p>
                          <p>
                            <strong>Ish joyi:</strong> {rel.workPlace}
                          </p>
                          <p>
                            <strong>Manzil:</strong> {rel.address}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">
                    Qarindoshlar ma'lumotlari mavjud emas
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Regular user view with all information displayed
        <div className="regular-view">
          <div className="breadcrumb">
            <span className="breadcrumb-item">Bosh sahifa</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item">Profil</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-item active">Shaxsiy ma'lumotlar</span>
          </div>

          <div className="page-header">
            <h1 className="page-title">Shaxsiy ma'lumotlar</h1>
            <DownloadResumeButton
              userProfile={userData}
              privateInfo={privateInfo}
              educations={educations}
              experiences={experiences}
              languages={languages}
              relatives={relatives}
            />
          </div>

          {/* Current user's complete profile */}
          <div className="current-user-sections">
            {/* Profil va shaxsiy ma'lumotlar */}
            <div className="info-section">
              <div className="section-header">
                <User size={24} />
                <h2>Profil va shaxsiy ma'lumotlar</h2>
              </div>
              <div className="profile-content">
                <div className="profile-avatar">
                  {avatarUrl ? (
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
                </div>
                <div className="profile-details">
                  <div className="two-column-tables">
                    <div className="table-column">
                      <h3 className="column-title">
                        <User size={18} /> Profil ma'lumotlari
                      </h3>
                      <div className="data-table">
                        <table>
                          <tbody>
                            {/* <tr>
                              <td className="label">ID:</td>
                              <td className="value">
                                {formatValue(userData?.id)}
                              </td>
                            </tr> */}
                            <tr>
                              <td className="label">Ism:</td>
                              <td className="value">
                                {formatValue(userData?.firstName)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Familiya:</td>
                              <td className="value">
                                {formatValue(userData?.lastName)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Otasining ismi:</td>
                              <td className="value">
                                {formatValue(userData?.fatherName)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Status:</td>
                              <td className="value">
                                {formatStatus(userData?.status)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Telefon raqam:</td>
                              <td className="value">
                                {formatPhoneNumber(userData?.phoneNumber)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Qo'shimcha telefon:</td>
                              <td className="value">
                                {formatPhoneNumber(
                                  userData?.secondaryPhoneNumber
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Telegram username:</td>
                              <td className="value">
                                {formatValue(userData?.telegramUsername)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Millati:</td>
                              <td className="value">
                                {formatValue(userData?.nationality)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">
                                Haydovchilik guvohnomasi:
                              </td>
                              <td className="value">
                                {formatValue(userData?.driverLicense)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Manzil:</td>
                              <td className="value">
                                {formatValue(userData?.address)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Mutaxassislik:</td>
                              <td className="value">
                                {formatValue(userData?.specialty)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="table-column">
                      <h3 className="column-title">
                        <MapPin size={18} /> Shaxsiy ma'lumotlar
                      </h3>
                      <div className="data-table">
                        <table>
                          <tbody>
                            <tr>
                              <td className="label">Jinsi:</td>
                              <td className="value">
                                {formatGender(privateInfo?.gender)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Viloyat:</td>
                              <td className="value">
                                {formatValue(privateInfo?.region)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Tuman:</td>
                              <td className="value">
                                {formatValue(privateInfo?.district)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Fuqarolik:</td>
                              <td className="value">
                                {formatValue(privateInfo?.citizenship)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Tug'ilgan sana:</td>
                              <td className="value">
                                {formatDate(privateInfo?.birthDate)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Tug'ilgan joy:</td>
                              <td className="value">
                                {formatValue(privateInfo?.birthPlace)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Avtomobil:</td>
                              <td className="value">
                                {privateInfo?.hasCar ? "Bor" : "Yo'q"}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Yaratilgan sana:</td>
                              <td className="value">
                                {formatDate(userData?.createdAt)}
                              </td>
                            </tr>
                            <tr>
                              <td className="label">Yangilangan sana:</td>
                              <td className="value">
                                {formatDate(userData?.updatedAt)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ta'lim */}
            <div className="info-section">
              <div className="section-header">
                <GraduationCap size={24} />
                <h2>Ta'lim</h2>
              </div>
              {educations && educations.length > 0 ? (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Ta'lim muassasasi</th>
                        <th>Daraja</th>
                        <th>Yo'nalish</th>
                        <th>Davr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {educations.map((education) => (
                        <tr key={education.id}>
                          <td>{formatValue(education.schoolName)}</td>
                          <td>{formatValue(education.degree)}</td>
                          <td>{formatValue(education.fieldOfStudy)}</td>
                          <td>
                            {formatDate(education.startDate)} -{" "}
                            {education.isPresent
                              ? "Hozir"
                              : formatDate(education.endDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">Ta'lim ma'lumotlari kiritilmagan</p>
              )}
            </div>

            {/* Ish tajribasi */}
            <div className="info-section">
              <div className="section-header">
                <Briefcase size={24} />
                <h2>Ish tajribasi</h2>
              </div>
              {experiences && experiences.length > 0 ? (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Tashkilot</th>
                        <th>Lavozim</th>
                        <th>Mas'uliyatlar</th>
                        <th>Davr</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experiences.map((experience) => (
                        <tr key={experience.id}>
                          <td>{formatValue(experience.organization)}</td>
                          <td>{formatValue(experience.position)}</td>
                          <td className="responsibilities">
                            {formatValue(experience.responsibilities)}
                          </td>
                          <td>
                            {formatDate(experience.startDate)} -{" "}
                            {experience.isPresent
                              ? "Hozir"
                              : formatDate(experience.endDate)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">
                  Ish tajribasi ma'lumotlari kiritilmagan
                </p>
              )}
            </div>

            {/* Tillar */}
            <div className="info-section">
              <div className="section-header">
                <Languages size={24} />
                <h2>Tillar</h2>
              </div>
              {languages && languages.length > 0 ? (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Til</th>
                        <th>O'qish</th>
                        <th>Gapirish</th>
                        <th>Yozish</th>
                        <th>Tinglash</th>
                      </tr>
                    </thead>
                    <tbody>
                      {languages.map((language) => (
                        <tr key={language.id}>
                          <td>{formatValue(language.language)}</td>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">Til ma'lumotlari kiritilmagan</p>
              )}
            </div>

            {/* Qarindoshlar */}
            <div className="info-section">
              <div className="section-header">
                <Users size={24} />
                <h2>Qarindoshlar</h2>
              </div>
              {relatives && relatives.length > 0 ? (
                <div className="data-table">
                  <table>
                    <thead>
                      <tr>
                        <th>To'liq ismi</th>
                        <th>Qarindoshlik turi</th>
                        <th>Tug'ilgan sana</th>
                        <th>Tug'ilgan joy</th>
                        <th>Ish joyi</th>
                        <th>Manzil</th>
                      </tr>
                    </thead>
                    <tbody>
                      {relatives.map((relative) => (
                        <tr key={relative.id}>
                          <td>{formatValue(relative.fullName)}</td>
                          <td>
                            <span className="relative-type-badge">
                              {formatValue(relative.relativeType)}
                            </span>
                          </td>
                          <td>{formatDate(relative.birthDate)}</td>
                          <td>{formatValue(relative.birthPlace)}</td>
                          <td>{formatValue(relative.workPlace)}</td>
                          <td className="address">
                            {formatValue(relative.address)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="no-data">
                  Qarindoshlar ma'lumotlari kiritilmagan
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfos;
