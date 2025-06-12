"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useRelatives,
  useCreateRelative,
  useUpdateRelative,
  useDeleteRelative,
} from "../../../hooks/useUser";
import { formatValue, formatDate } from "../../../utils/formatters";
import { Users, Plus, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import "./profile-sections.scss";

export const Relatives = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { data: relatives = [], isLoading, error } = useRelatives();
  const createRelativeMutation = useCreateRelative();
  const updateRelativeMutation = useUpdateRelative();
  const deleteRelativeMutation = useDeleteRelative();

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

  const onSubmit = async (data) => {
    try {
      await createRelativeMutation.mutateAsync({
        fullName: data.fullName,
        birthDate: new Date(data.birthDate).toISOString(),
        workPlace: data.workPlace,
        address: data.address,
        birthPlace: data.birthPlace,
        relativeType: data.relativeType,
      });

      toast.success("Qarindosh ma'lumoti muvaffaqiyatli qo'shildi!");
      setIsAdding(false);
      reset();
    } catch (error) {
      toast.error("Qarindosh ma'lumotini qo'shishda xatolik yuz berdi");
    }
  };

  const onEdit = async (data) => {
    try {
      await updateRelativeMutation.mutateAsync({
        relativeId: editingId,
        data: {
          fullName: data.fullName,
          birthDate: new Date(data.birthDate).toISOString(),
          workPlace: data.workPlace,
          address: data.address,
          birthPlace: data.birthPlace,
          relativeType: data.relativeType,
        },
      });

      toast.success("Qarindosh ma'lumoti yangilandi!");
      setEditingId(null);
      resetEdit();
    } catch (error) {
      toast.error("Qarindosh ma'lumotini yangilashda xatolik yuz berdi");
    }
  };

  const handleEdit = (relative) => {
    setEditingId(relative.id);
    setValueEdit("fullName", relative.fullName);
    setValueEdit(
      "birthDate",
      relative.birthDate ? relative.birthDate.split("T")[0] : ""
    );
    setValueEdit("workPlace", relative.workPlace);
    setValueEdit("address", relative.address);
    setValueEdit("birthPlace", relative.birthPlace);
    setValueEdit("relativeType", relative.relativeType);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Haqiqatan ham bu qarindosh ma'lumotini o'chirmoqchimisiz?"
      )
    ) {
      try {
        await deleteRelativeMutation.mutateAsync(id);
        toast.success("Qarindosh ma'lumoti o'chirildi!");
      } catch (error) {
        toast.error("Qarindosh ma'lumotini o'chirishda xatolik yuz berdi");
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
          <p>Qarindoshlar ma'lumotlari yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-section-container">
        <div className="error-state">
          <p>Qarindoshlar ma'lumotlarini yuklashda xatolik yuz berdi</p>
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
        <span className="breadcrumb-item active">Qarindoshlar</span>
      </div>

      <div className="section-header">
        <div className="header-left">
          <Users size={24} />
          <h1>Qarindoshlar</h1>
        </div>
        {!isAdding && !editingId && (
          <button className="edit-button" onClick={() => setIsAdding(true)}>
            <Plus size={20} />
            Qarindosh qo'shish
          </button>
        )}
      </div>

      <div className="profile-form-container">
        {/* Add new relative form */}
        {isAdding && (
          <div className="form-section">
            <h3>Yangi qarindosh ma'lumoti qo'shish</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="relative-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>To'liq ismi *</label>
                  <input
                    type="text"
                    {...register("fullName", {
                      required: "To'liq ism majburiy",
                    })}
                    placeholder="Ahmadov Ahmad Ahmadovich"
                  />
                  {errors.fullName && (
                    <span className="error">{errors.fullName.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Qarindoshlik turi *</label>
                  <select
                    {...register("relativeType", {
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
                  {errors.relativeType && (
                    <span className="error">{errors.relativeType.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Tug'ilgan sanasi *</label>
                  <input
                    type="date"
                    {...register("birthDate", {
                      required: "Tug'ilgan sana majburiy",
                    })}
                  />
                  {errors.birthDate && (
                    <span className="error">{errors.birthDate.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Tug'ilgan joyi *</label>
                  <input
                    type="text"
                    {...register("birthPlace", {
                      required: "Tug'ilgan joy majburiy",
                    })}
                    placeholder="Toshkent, O'zbekiston"
                  />
                  {errors.birthPlace && (
                    <span className="error">{errors.birthPlace.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Ish joyi *</label>
                  <input
                    type="text"
                    {...register("workPlace", {
                      required: "Ish joyi majburiy",
                    })}
                    placeholder="Toshkent Davlat Universiteti"
                  />
                  {errors.workPlace && (
                    <span className="error">{errors.workPlace.message}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label>Manzil *</label>
                  <textarea
                    {...register("address", { required: "Manzil majburiy" })}
                    placeholder="To'liq yashash manzili"
                    rows={3}
                  />
                  {errors.address && (
                    <span className="error">{errors.address.message}</span>
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
                  disabled={createRelativeMutation.isPending}
                >
                  <Save size={20} />
                  {createRelativeMutation.isPending
                    ? "Saqlanmoqda..."
                    : "Saqlash"}
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
                      {editingId === relative.id ? (
                        <>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("fullName", {
                                required: "To'liq ism majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="date"
                              {...registerEdit("birthDate", {
                                required: "Tug'ilgan sana majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("workPlace", {
                                required: "Ish joyi majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <textarea
                              {...registerEdit("address", {
                                required: "Manzil majburiy",
                              })}
                              className="table-textarea"
                              rows={2}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              {...registerEdit("birthPlace", {
                                required: "Tug'ilgan joy majburiy",
                              })}
                              className="table-input"
                            />
                          </td>
                          <td>
                            <select
                              {...registerEdit("relativeType", {
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
                                onClick={handleSubmitEdit(onEdit)}
                                disabled={updateRelativeMutation.isPending}
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
                              {formatValue(relative.relativeType)}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="action-btn edit"
                                onClick={() => handleEdit(relative)}
                              >
                                Tahrirlash
                              </button>
                              <button
                                className="action-btn delete"
                                onClick={() => handleDelete(relative.id)}
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
              <Users size={48} />
              <p>Hali qarindoshlar ma'lumotlari qo'shilmagan</p>
              <button
                className="add-first-button"
                onClick={() => setIsAdding(true)}
              >
                <Plus size={20} />
                Birinchi qarindosh ma'lumotini qo'shish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
