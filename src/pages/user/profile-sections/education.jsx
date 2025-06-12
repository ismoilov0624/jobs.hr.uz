"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEducations,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
} from "../../../hooks/useUser";
import { formatValue, formatDate } from "../../../utils/formatters";
import { GraduationCap, Plus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import "./profile-sections.scss";

export const Education = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data: educations = [], isLoading, error } = useEducations();
  const createEducationMutation = useCreateEducation();
  const updateEducationMutation = useUpdateEducation();
  const deleteEducationMutation = useDeleteEducation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setValueEdit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await createEducationMutation.mutateAsync({
        schoolName: data.schoolName,
        degree: data.degree,
        fieldOfStudy: data.fieldOfStudy,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
        isPresent: data.isPresent,
      });

      toast.success("Ta'lim ma'lumoti muvaffaqiyatli qo'shildi!");
      setIsAdding(false);
      reset();
    } catch (error) {
      toast.error("Ta'lim ma'lumotini qo'shishda xatolik yuz berdi");
    }
  };

  const onEdit = async (data) => {
    try {
      await updateEducationMutation.mutateAsync({
        educationId: editingId,
        data: {
          schoolName: data.schoolName,
          degree: data.degree,
          fieldOfStudy: data.fieldOfStudy,
          startDate: new Date(data.startDate).toISOString(),
          endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
          isPresent: data.isPresent,
        },
      });

      toast.success("Ta'lim ma'lumoti yangilandi!");
      setEditingId(null);
      resetEdit();
    } catch (error) {
      toast.error("Ta'lim ma'lumotini yangilashda xatolik yuz berdi");
    }
  };

  const handleEdit = (education) => {
    setEditingId(education.id);
    setValueEdit("schoolName", education.schoolName);
    setValueEdit("degree", education.degree);
    setValueEdit("fieldOfStudy", education.fieldOfStudy);
    setValueEdit(
      "startDate",
      education.startDate ? education.startDate.split("T")[0] : ""
    );
    setValueEdit(
      "endDate",
      education.endDate ? education.endDate.split("T")[0] : ""
    );
    setValueEdit("isPresent", education.isPresent);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Haqiqatan ham bu ta'lim ma'lumotini o'chirmoqchimisiz?")
    ) {
      try {
        await deleteEducationMutation.mutateAsync(id);
        toast.success("Ta'lim ma'lumoti o'chirildi!");
      } catch (error) {
        toast.error("Ta'lim ma'lumotini o'chirishda xatolik yuz berdi");
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    reset();
    resetEdit();
  };

  if (isLoading) {
    return (
      <div className="profile-section-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Ta'lim ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-section-container">
        <div className="error-state">
          <p>Ta'lim ma'lumotlarini yuklashda xatolik yuz berdi</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-section-container">
      <div className="breadcrumb">
        <span className="breadcrumb-item">Bosh sahifa</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">Profil</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item">Profilni tahrirlash</span>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-item active">Ta'lim</span>
      </div>

      <div className="section-header">
        <div className="header-left">
          <GraduationCap size={24} />
          <h1>Ta'lim</h1>
        </div>
        {!isAdding && !editingId && (
          <button className="edit-button" onClick={() => setIsAdding(true)}>
            <Plus size={20} />
            Ta'lim qo'shish
          </button>
        )}
      </div>

      <div className="profile-form-container">
        {/* Add new education form */}
        {isAdding && (
          <div className="form-section">
            <h3>Yangi ta'lim ma'lumoti qo'shish</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="education-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Ta'lim muassasasi nomi *</label>
                  <input
                    type="text"
                    {...register("schoolName", {
                      required: "Ta'lim muassasasi nomi majburiy",
                    })}
                    placeholder="Toshkent Davlat Universiteti"
                  />
                  {errors.schoolName && (
                    <span className="error">{errors.schoolName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Daraja *</label>
                  <input
                    type="text"
                    {...register("degree", { required: "Daraja majburiy" })}
                    placeholder="Bakalavr"
                  />
                  {errors.degree && (
                    <span className="error">{errors.degree.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Yo'nalish *</label>
                  <input
                    type="text"
                    {...register("fieldOfStudy", {
                      required: "Yo'nalish majburiy",
                    })}
                    placeholder="Kompyuter fanlari"
                  />
                  {errors.fieldOfStudy && (
                    <span className="error">{errors.fieldOfStudy.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Boshlanish sanasi *</label>
                  <input
                    type="date"
                    {...register("startDate", {
                      required: "Boshlanish sanasi majburiy",
                    })}
                  />
                  {errors.startDate && (
                    <span className="error">{errors.startDate.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Tugash sanasi</label>
                  <input type="date" {...register("endDate")} />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input type="checkbox" {...register("isPresent")} />
                    <span className="checkmark"></span>
                    Hozir o'qiyapman
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  <X size={20} />
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="save-button"
                  disabled={createEducationMutation.isPending}
                >
                  <Save size={20} />
                  {createEducationMutation.isPending
                    ? "Saqlanmoqda..."
                    : "Saqlash"}
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
                      {editingId === education.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("schoolName", {
                                required: "Ta'lim muassasasi nomi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("degree", {
                                required: "Daraja majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("fieldOfStudy", {
                                required: "Yo'nalish majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...registerEdit("startDate", {
                                required: "Boshlanish sanasi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...registerEdit("endDate")}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn save"
                                onClick={handleSubmitEdit(onEdit)}
                                disabled={updateEducationMutation.isPending}
                              >
                                Saqlash
                              </button>
                              <button
                                className="action-btn cancel"
                                onClick={handleCancel}
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
                                onClick={() => handleEdit(education)}
                              >
                                Tahrirlash
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDelete(education.id)}
                              >
                                O'chirish
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
              <button
                className="add-first-button"
                onClick={() => setIsAdding(true)}
              >
                <Plus size={20} />
                Birinchi ta'lim ma'lumotini qo'shish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
