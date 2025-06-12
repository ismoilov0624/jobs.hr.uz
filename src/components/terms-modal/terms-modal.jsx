"use client";

import { X } from "lucide-react";
import "./terms-modal.scss";

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="terms-modal-overlay" onClick={onClose}>
      <div className="terms-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="terms-modal-header">
          <h2>OMMAVIY OFERTA SHARTLARI</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="terms-modal-body">
          <p className="terms-subtitle">
            (Shaxsga doir ma'lumotlarni yig'ish va ishlash bo'yicha rozilik)
          </p>

          <div className="terms-section">
            <h3>1. Umumiy qoidalar</h3>
            <p>
              1.1. Ushbu Oferta O'zbekiston Respublikasining "Shaxsga doir
              ma'lumotlar to'g'risida"gi Qonuni (2019 yil 2 iyuldagi,
              O'RQ-547-son) hamda amaldagi boshqa normativ hujjatlarga muvofiq
              ravishda tayyorlangan.
            </p>
            <p>
              1.2. Foydalanuvchi www.jobs-hr.uz saytida ro'yxatdan o'tish orqali
              ushbu Ofertaning barcha shartlariga o'z roziligini beradi.
            </p>
          </div>

          <div className="terms-section">
            <h3>2. Shaxsga doir ma'lumotlar tarkibi va maqsadi</h3>
            <p>(Asos: Qonun 3-modda, 12-modda, 13-modda)</p>
            <p>
              2.1. Foydalanuvchidan quyidagi shaxsga doir ma'lumotlar yig'iladi:
            </p>
            <ul>
              <li>To'liq ism-sharif</li>
              <li>Tug'ilgan sana</li>
              <li>Aloqa ma'lumotlari (telefon raqami, email)</li>
              <li>Ma'lumot darajasi va ish tajribasi</li>
              <li>Rezyume (CV)</li>
              <li>Profil rasmi (agar mavjud bo'lsa)</li>
            </ul>
            <p>2.2. Ushbu ma'lumotlar quyidagi maqsadlarda ishlatiladi:</p>
            <ul>
              <li>
                Ish beruvchilar tomonidan ishga qabul qilish uchun ko'rib
                chiqish
              </li>
              <li>Foydalanuvchiga mos ish o'rinlarini taklif qilish</li>
              <li>Statistika va analitika yuritish</li>
            </ul>
          </div>

          <div className="terms-section">
            <h3>3. Ma'lumotlarni uchinchi shaxslarga berish</h3>
            <p>(Asos: Qonun 14-modda, 17-modda)</p>
            <p>
              3.1. Foydalanuvchining shaxsiy ma'lumotlari sayt platformasi
              doirasida faqat tegishli ish beruvchilar uchun ochiladi.
            </p>
            <p>
              3.2. Foydalanuvchining ma'lumotlari uchinchi shaxslarga faqat
              ularning roziligi bilan beriladi.
            </p>
          </div>

          <div className="terms-section">
            <h3>4. Foydalanuvchining huquqlari</h3>
            <p>(Asos: Qonun 22-modda)</p>
            <p>4.1. Foydalanuvchi quyidagi huquqlarga ega:</p>
            <ul>
              <li>O'z shaxsiy ma'lumotlariga kirish huquqi</li>
              <li>
                O'z ma'lumotlarini o'zgartirish, yangilash yoki o'chirishni
                talab qilish huquqi
              </li>
              <li>
                Ma'lumotlarni yig'ish va ishlashga bergan roziligini istalgan
                vaqtda bekor qilish huquqi
              </li>
            </ul>
          </div>

          <div className="terms-section">
            <h3>5. Ma'lumotlarni saqlash muddati</h3>
            <p>(Asos: Qonun 11-modda)</p>
            <p>
              5.1. Foydalanuvchining shaxsiy ma'lumotlari rozilik muddati
              davomida saqlanadi yoki foydalanuvchi tomonidan rozilik bekor
              qilinmaguncha.
            </p>
            <p>
              5.2. Rozilik bekor qilinganda ma'lumotlar qonuniy asosda yo'q
              qilinadi.
            </p>
          </div>

          <div className="terms-section">
            <h3>6. Yakuniy qoidalar</h3>
            <p>
              6.1. Ushbu Oferta O'zbekiston Respublikasi fuqarolik qonunchiligi
              va shaxsga doir ma'lumotlarni himoya qilish bo'yicha qonunlariga
              muvofiq tuzilgan ommaviy taklif (oferta) hisoblanadi.
            </p>
            <p>
              6.2. Saytdan foydalanish orqali foydalanuvchi ushbu Ofertaning
              barcha shartlariga rozilik bildirgan hisoblanadi.
            </p>
          </div>
        </div>
        <div className="terms-modal-footer">
          <button className="accept-button" onClick={onClose}>
            Tushundim
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
