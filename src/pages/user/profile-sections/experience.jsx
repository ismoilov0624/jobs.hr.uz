"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useExperiences,
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "../../../hooks/useUser";
import { formatValue, formatDate } from "../../../utils/formatters";
import { Briefcase, Plus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import "./profile-sections.scss";

export const Experience = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data: experiences = [], isLoading, error } = useExperiences();
  const createExperienceMutation = useCreateExperience();
  const updateExperienceMutation = useUpdateExperience();
  const deleteExperienceMutation = useDeleteExperience();

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
      await createExperienceMutation.mutateAsync({
        organization: data.organization,
        position: data.position,
        responsibilities: data.responsibilities,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
        isPresent: data.isPresent,
      });

      toast.success("Ish tajribasi muvaffaqiyatli qo'shildi!");
      setIsAdding(false);
      reset();
    } catch (error) {
      toast.error("Ish tajribasini qo'shishda xatolik yuz berdi");
    }
  };

  const onEdit = async (data) => {
    try {
      await updateExperienceMutation.mutateAsync({
        experienceId: editingId,
        data: {
          organization: data.organization,
          position: data.position,
          responsibilities: data.responsibilities,
          startDate: new Date(data.startDate).toISOString(),
          endDate: data.isPresent ? null : new Date(data.endDate).toISOString(),
          isPresent: data.isPresent,
        },
      });

      toast.success("Ish tajribasi yangilandi!");
      setEditingId(null);
      resetEdit();
    } catch (error) {
      toast.error("Ish tajribasini yangilashda xatolik yuz berdi");
    }
  };

  const handleEdit = (experience) => {
    setEditingId(experience.id);
    setValueEdit("organization", experience.organization);
    setValueEdit("position", experience.position);
    setValueEdit("responsibilities", experience.responsibilities);
    setValueEdit(
      "startDate",
      experience.startDate ? experience.startDate.split("T")[0] : ""
    );
    setValueEdit(
      "endDate",
      experience.endDate ? experience.endDate.split("T")[0] : ""
    );
    setValueEdit("isPresent", experience.isPresent);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haqiqatan ham bu ish tajribasini o'chirmoqchimisiz?")) {
      try {
        await deleteExperienceMutation.mutateAsync(id);
        toast.success("Ish tajribasi o'chirildi!");
      } catch (error) {
        toast.error("Ish tajribasini o'chirishda xatolik yuz berdi");
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
          <p>Ish tajribasi yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-section-container">
        <div className="error-state">
          <p>Ish tajribasini yuklashda xatolik yuz berdi</p>
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
        <span className="breadcrumb-item active">Ish tajribasi</span>
      </div>

      <div className="section-header">
        <div className="header-left">
          <Briefcase size={24} />
          <h1>Ish tajribasi</h1>
        </div>
        {!isAdding && !editingId && (
          <button className="edit-button" onClick={() => setIsAdding(true)}>
            <Plus size={20} />
            Ish tajribasi qo'shish
          </button>
        )}
      </div>

      <div className="profile-form-container">
        {/* Add new experience form */}
        {isAdding && (
          <div className="form-section">
            <h3>Yangi ish tajribasi qo'shish</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="experience-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Tashkilot nomi *</label>
                  <input
                    type="text"
                    {...register("organization", {
                      required: "Tashkilot nomi majburiy",
                    })}
                    placeholder="Tech Solutions LLC"
                  />
                  {errors.organization && (
                    <span className="error">{errors.organization.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Lavozim *</label>
                  <input
                    type="text"
                    {...register("position", { required: "Lavozim majburiy" })}
                    placeholder="Dasturchi"
                  />
                  {errors.position && (
                    <span className="error">{errors.position.message}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Mas'uliyatlar *</label>
                  <textarea
                    {...register("responsibilities", {
                      required: "Mas'uliyatlar majburiy",
                    })}
                    placeholder="React va Node.js yordamida veb-ilovalar ishlab chiqish..."
                    rows={4}
                  />
                  {errors.responsibilities && (
                    <span className="error">
                      {errors.responsibilities.message}
                    </span>
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
                    Hozir ishlayapman
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
                  disabled={createExperienceMutation.isPending}
                >
                  <Save size={20} />
                  {createExperienceMutation.isPending
                    ? "Saqlanmoqda..."
                    : "Saqlash"}
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
                      {editingId === experience.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("organization", {
                                required: "Tashkilot nomi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("position", {
                                required: "Lavozim majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <textarea
                              {...registerEdit("responsibilities", {
                                required: "Mas'uliyatlar majburiy",
                              })}
                              className="table-textarea"
                              rows={2}
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
                                disabled={updateExperienceMutation.isPending}
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
                                onClick={() => handleEdit(experience)}
                              >
                                Tahrirlash
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDelete(experience.id)}
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
              <Briefcase size={48} />
              <p>Hali ish tajribasi ma'lumotlari qo'shilmagan</p>
              <button
                className="add-first-button"
                onClick={() => setIsAdding(true)}
              >
                <Plus size={20} />
                Birinchi ish tajribasini qo'shish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
