"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useLanguages,
  useCreateLanguage,
  useUpdateLanguage,
  useDeleteLanguage,
} from "../../../hooks/useUser";
import { LanguagesIcon, Plus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import "./profile-sections.scss";

export const Languages = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data: languages = [], isLoading, error } = useLanguages();
  const createLanguageMutation = useCreateLanguage();
  const updateLanguageMutation = useUpdateLanguage();
  const deleteLanguageMutation = useDeleteLanguage();

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
      await createLanguageMutation.mutateAsync({
        language: data.language,
        reading: Number.parseInt(data.reading),
        speaking: Number.parseInt(data.speaking),
        writing: Number.parseInt(data.writing),
        listening: Number.parseInt(data.listening),
      });

      toast.success("Til muvaffaqiyatli qo'shildi!");
      setIsAdding(false);
      reset();
    } catch (error) {
      toast.error("Tilni qo'shishda xatolik yuz berdi");
    }
  };

  const onEdit = async (data) => {
    try {
      await updateLanguageMutation.mutateAsync({
        languageId: editingId,
        data: {
          language: data.language,
          reading: Number.parseInt(data.reading),
          speaking: Number.parseInt(data.speaking),
          writing: Number.parseInt(data.writing),
          listening: Number.parseInt(data.listening),
        },
      });

      toast.success("Til ma'lumotlari yangilandi!");
      setEditingId(null);
      resetEdit();
    } catch (error) {
      toast.error("Tilni yangilashda xatolik yuz berdi");
    }
  };

  const handleEdit = (language) => {
    setEditingId(language.id);
    setValueEdit("language", language.language);
    setValueEdit("reading", language.reading);
    setValueEdit("speaking", language.speaking);
    setValueEdit("writing", language.writing);
    setValueEdit("listening", language.listening);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLanguageMutation.mutateAsync(id);
      toast.success("Til o'chirildi!");
    } catch (error) {
      toast.error("Tilni o'chirishda xatolik yuz berdi");
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
          <p>Tillar yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-section-container">
        <div className="error-state">
          <p>Tillarni yuklashda xatolik yuz berdi</p>
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
        <span className="breadcrumb-item active">Tillar</span>
      </div>

      <div className="section-header">
        <div className="header-left">
          <LanguagesIcon size={24} />
          <h1>Tillar</h1>
        </div>
        {!isAdding && !editingId && (
          <button className="edit-button" onClick={() => setIsAdding(true)}>
            <Plus size={20} />
            Til qo'shish
          </button>
        )}
      </div>

      <div className="profile-form-container">
        {/* Add new language form */}
        {isAdding && (
          <div className="form-section">
            <h3>Yangi til qo'shish</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="language-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Til nomi *</label>
                  <input
                    type="text"
                    {...register("language", { required: "Til nomi majburiy" })}
                    placeholder="Ingliz tili"
                  />
                  {errors.language && (
                    <span className="error">{errors.language.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>O'qish (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...register("reading", {
                      required: "O'qish darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="8"
                  />
                  {errors.reading && (
                    <span className="error">{errors.reading.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Gapirish (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...register("speaking", {
                      required: "Gapirish darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="7"
                  />
                  {errors.speaking && (
                    <span className="error">{errors.speaking.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Yozish (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...register("writing", {
                      required: "Yozish darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="6"
                  />
                  {errors.writing && (
                    <span className="error">{errors.writing.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Tinglash (1-10) *</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...register("listening", {
                      required: "Tinglash darajasi majburiy",
                      min: 1,
                      max: 10,
                    })}
                    placeholder="9"
                  />
                  {errors.listening && (
                    <span className="error">{errors.listening.message}</span>
                  )}
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
                  disabled={createLanguageMutation.isPending}
                >
                  <Save size={20} />
                  {createLanguageMutation.isPending
                    ? "Saqlanmoqda..."
                    : "Saqlash"}
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
                      {editingId === language.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("language", {
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
                              {...registerEdit("reading", {
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
                              {...registerEdit("speaking", {
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
                              {...registerEdit("writing", {
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
                              {...registerEdit("listening", {
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
                                onClick={handleSubmitEdit(onEdit)}
                                disabled={updateLanguageMutation.isPending}
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
                                onClick={() => handleEdit(language)}
                              >
                                Tahrirlash
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDelete(language.id)}
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
              <LanguagesIcon size={48} />
              <p>Hali til ma'lumotlari qo'shilmagan</p>
              <button
                className="add-first-button"
                onClick={() => setIsAdding(true)}
              >
                <Plus size={20} />
                Birinchi tilni qo'shish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
