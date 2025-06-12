// Ma'lumotlarni formatlash uchun utility funksiyalar

export const formatValue = (value, defaultText = "Noma'lum") => {
  if (value === null || value === undefined || value === "") {
    return defaultText;
  }
  return value;
};

export const formatDate = (dateString, defaultText = "Noma'lum") => {
  if (!dateString) return defaultText;

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return defaultText;
  }
};

export const formatPhoneNumber = (phone, defaultText = "Noma'lum") => {
  if (!phone) return defaultText;

  // Telefon raqamini formatlash
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 12 && cleaned.startsWith("998")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(
      5,
      8
    )} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }
  return phone;
};

export const formatStatus = (status, defaultText = "Noma'lum") => {
  if (!status) return defaultText;

  const statusMap = {
    UNEMPLOYED: "Ishsiz",
    EMPLOYED: "Ishlamoqda",
    SEARCHING: "Ish izlamoqda",
    PENDING: "Kutilmoqda",
    APPROVED: "Qabul qilindi",
    REJECTED: "Rad etildi",
    ACTIVE: "Faol",
    INACTIVE: "Faol emas",
  };

  return statusMap[status] || status;
};

export const formatGender = (gender, defaultText = "Noma'lum") => {
  if (!gender) return defaultText;

  const genderMap = {
    MALE: "Erkak",
    FEMALE: "Ayol",
    BOTH: "Farqi yo'q",
  };

  return genderMap[gender] || gender;
};

export const formatJobType = (type, defaultText = "Noma'lum") => {
  if (!type) return defaultText;

  const typeMap = {
    FULL_TIME: "To'liq ish kuni",
    PART_TIME: "Yarim ish kuni",
    FREELANCE: "Frilanser",
    INTERNSHIP: "Amaliyot",
  };
  return typeMap[type] || type;
};

export const formatWorkLocation = (location, defaultText = "Noma'lum") => {
  if (!location) return defaultText;

  const locationMap = {
    OFFICE: "Ofis",
    REMOTE: "Masofaviy",
    HYBRID: "Aralash",
  };
  return locationMap[location] || location;
};

export const formatSalary = (salary, defaultText = "Kelishiladi") => {
  if (!salary) return defaultText;

  // Agar salary allaqachon string bo'lsa yoki raqam bo'lsa, stringga o'tkazamiz
  const salaryNumber = Number(salary);
  if (isNaN(salaryNumber)) return salary.toString();

  return new Intl.NumberFormat("uz-UZ").format(salaryNumber);
};

export const getAvatarUrl = (avatar) => {
  if (!avatar || avatar === "rasm" || avatar === null || avatar === undefined) {
    return null;
  }

  // Agar URL to'g'ri formatda bo'lsa
  if (avatar.startsWith("http://") || avatar.startsWith("https://")) {
    return avatar;
  }

  // Agar relative path bo'lsa, base URL qo'shish
  if (avatar.startsWith("/uploads/") || avatar.startsWith("uploads/")) {
    const fullUrl = avatar.startsWith("/")
      ? `https://api.sahifam.uz${avatar}`
      : `https://api.sahifam.uz/${avatar}`;
    return fullUrl;
  }

  // Agar faqat fayl nomi bo'lsa
  if (avatar && !avatar.includes("/")) {
    const fullUrl = `https://api.sahifam.uz/uploads/${avatar}`;
    return fullUrl;
  }

  return null;
};

// Experience formatter
export const formatExperience = (
  startDate,
  endDate,
  defaultText = "Noma'lum"
) => {
  if (!startDate) return defaultText;

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const startStr = start.toLocaleDateString("uz-UZ", {
    year: "numeric",
    month: "short",
  });
  const endStr = endDate
    ? end.toLocaleDateString("uz-UZ", { year: "numeric", month: "short" })
    : "Hozir";

  return `${startStr} - ${endStr}`;
};

// Education level formatter
export const formatEducationLevel = (level, defaultText = "Noma'lum") => {
  if (!level) return defaultText;

  const levelMap = {
    HIGH_SCHOOL: "O'rta maktab",
    COLLEGE: "Kollej",
    BACHELOR: "Bakalavr",
    MASTER: "Magistr",
    PHD: "PhD",
  };
  return levelMap[level] || level;
};

// Language level formatter
export const formatLanguageLevel = (level, defaultText = "Noma'lum") => {
  if (!level) return defaultText;

  const levelMap = {
    BEGINNER: "Boshlang'ich",
    ELEMENTARY: "Elementar",
    INTERMEDIATE: "O'rta",
    UPPER_INTERMEDIATE: "Yuqori o'rta",
    ADVANCED: "Ilg'or",
    NATIVE: "Ona tili",
  };
  return levelMap[level] || level;
};
