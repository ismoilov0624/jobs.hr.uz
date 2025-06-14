import { request } from "../../config/request";
import { getUserIdFromToken } from "../../utils/token";
import { loadState } from "../../config/storage";
import Cookies from "js-cookie";

// User ID olish helper funksiyasi - to'g'rilangan
const getCurrentUserId = () => {
  // 1. localStorage'dan
  const user = loadState("user");

  if (user && typeof user === "object") {
    // Agar user object bo'lsa, id ni olish
    if (
      user.id &&
      (typeof user.id === "string" || typeof user.id === "number")
    ) {
      return String(user.id);
    }
    // Nested structure uchun
    if (
      user.user &&
      user.user.id &&
      (typeof user.user.id === "string" || typeof user.user.id === "number")
    ) {
      return String(user.user.id);
    }
  }

  // 2. Token'dan
  const token = Cookies.get("user_token");

  if (token) {
    try {
      const userId = getUserIdFromToken(token);

      if (
        userId &&
        (typeof userId === "string" || typeof userId === "number")
      ) {
        return String(userId);
      }
    } catch (error) {
      console.error("Token'dan user ID olishda xatolik:", error);
    }
  }

  throw new Error("User ID topilmadi");
};

// Ma'lumotlarni formatlash helper funksiyasi
const formatDataForServer = (data) => {
  const formatted = {};

  Object.keys(data).forEach((key) => {
    const value = data[key];

    // Bo'sh string'larni null ga o'zgartirish
    if (value === "" || value === undefined) {
      formatted[key] = null;
    } else if (value === null) {
      formatted[key] = null;
    } else {
      formatted[key] = value;
    }
  });

  return formatted;
};

// Add this new function at the top of the file, after the helper functions
// Fetch complete user profile (all data in one request)
export const fetchCompleteUserProfile = async (userId) => {
  try {
    // Make request without authentication headers for public access
    const response = await request.get(`/users/profile/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data && response.data.data && response.data.data.user) {
      const userData = response.data.data.user;

      return {
        userProfile: userData,
        privateInfo: userData.UserPrivateInfo || null,
        educations: userData.UserEducation || [],
        experiences: userData.UserExperience || [],
        languages: userData.UserLanguage || [],
        relatives: userData.UserRelation || [],
      };
    }

    return {
      userProfile: null,
      privateInfo: null,
      educations: [],
      experiences: [],
      languages: [],
      relatives: [],
    };
  } catch (error) {
    console.error("Error fetching complete user profile:", error);
    return {
      userProfile: null,
      privateInfo: null,
      educations: [],
      experiences: [],
      languages: [],
      relatives: [],
    };
  }
};

// User Profile APIs - using /users/profile/userId endpoint
export const fetchUserProfile = async (userId) => {
  // userId ni tekshirish va to'g'rilash
  if (!userId) {
    throw new Error("User ID kerak");
  }

  // Agar userId object bo'lsa, xatolik
  if (typeof userId === "object") {
    throw new Error("User ID noto'g'ri formatda");
  }

  // String ga o'tkazish
  const cleanUserId = String(userId).trim();

  const response = await request.get(`/users/profile/${cleanUserId}`);
  return response.data.data.user;
};

export const fetchUserProfileById = async (userId) => {
  if (!userId) {
    throw new Error("User ID kerak");
  }

  if (typeof userId === "object") {
    throw new Error("User ID noto'g'ri formatda");
  }

  const cleanUserId = String(userId).trim();
  const response = await request.get(`/users/profile/${cleanUserId}`);
  return response.data.data.user;
};

export const updateUserProfile = async (data) => {
  if (data instanceof FormData) {
    const response = await request.put("/users/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data || response.data;
  } else {
    const formattedData = formatDataForServer(data);

    const response = await request.put("/users/profile", formattedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data || response.data;
  }
};

// Private Info APIs
export const fetchPrivateInfo = async () => {
  try {
    const response = await request.get("/users/private-info");

    // Response structure'ni tekshirish
    if (response.data.data && response.data.data.privateInfo) {
      return response.data.data.privateInfo;
    } else if (response.data.data) {
      return response.data.data;
    } else if (response.data.privateInfo) {
      return response.data.privateInfo;
    } else if (response.data) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Private info error:", error);
    if (error.response?.status === 404) {
      try {
        const userId = getCurrentUserId();
        const response = await request.get(`/users/private-info/${userId}`);
        return response.data.data || response.data;
      } catch (err) {
        return null;
      }
    }
    return null;
  }
};

export const createPrivateInfo = async (data) => {
  const formattedData = formatDataForServer(data);

  const response = await request.post("/users/private-info", formattedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data || response.data;
};

export const updatePrivateInfo = async (data) => {
  const formattedData = formatDataForServer(data);

  // Faqat null bo'lmagan qiymatlarni yuborish
  const cleanedData = {};
  Object.keys(formattedData).forEach((key) => {
    if (formattedData[key] !== null && formattedData[key] !== undefined) {
      cleanedData[key] = formattedData[key];
    }
  });

  const response = await request.put("/users/private-info", cleanedData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data.data || response.data;
};

export const deletePrivateInfo = async () => {
  try {
    const response = await request.delete("/users/private-info", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Delete private info error:", error);
    console.error("Error response:", error.response?.data);

    if (error.response?.status === 401) {
      throw new Error("Avtorizatsiya xatoligi. Iltimos, qayta kiring.");
    } else if (error.response?.status === 404) {
      throw new Error("O'chirish uchun ma'lumot topilmadi.");
    } else if (error.response?.status === 500) {
      const serverError =
        error.response?.data?.message || error.response?.data?.error?.message;
      throw new Error(
        serverError || "Server xatoligi. Iltimos, keyinroq urinib ko'ring."
      );
    }
    throw error;
  }
};

// Education APIs
export const fetchEducations = async () => {
  try {
    const response = await request.get("/users/educations");

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.educations) {
      return response.data.data.educations;
    } else if (response.data.educations) {
      return response.data.educations;
    }
    return [];
  } catch (error) {
    console.error("Educations error:", error);
    return [];
  }
};

export const fetchEducation = async (educationId) => {
  const response = await request.get(`/users/educations/${educationId}`);
  return response.data.data || response.data;
};

export const createEducation = async (data) => {
  const formattedData = formatDataForServer(data);
  const response = await request.post("/users/educations", formattedData);
  return response.data.data || response.data;
};

export const updateEducation = async (educationId, data) => {
  const formattedData = formatDataForServer(data);
  const response = await request.put(
    `/users/educations/${educationId}`,
    formattedData
  );
  return response.data.data || response.data;
};

export const deleteEducation = async (educationId) => {
  try {
    const response = await request.delete(`/users/educations/${educationId}`);
    return response.data;
  } catch (error) {
    console.error("Delete education error:", error);
    if (error.response?.status === 404) {
      throw new Error("Ta'lim ma'lumoti topilmadi");
    }
    throw error;
  }
};

// Experience APIs
export const fetchExperiences = async () => {
  try {
    const response = await request.get("/users/experiences");

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.experiences) {
      return response.data.data.experiences;
    } else if (response.data.experiences) {
      return response.data.experiences;
    }
    return [];
  } catch (error) {
    console.error("Experiences error:", error);
    return [];
  }
};

export const fetchExperience = async (experienceId) => {
  const response = await request.get(`/users/experiences/${experienceId}`);
  return response.data.data || response.data;
};

export const createExperience = async (data) => {
  const formattedData = formatDataForServer(data);
  const response = await request.post("/users/experiences", formattedData);
  return response.data.data || response.data;
};

export const updateExperience = async (experienceId, data) => {
  const formattedData = formatDataForServer(data);
  const response = await request.put(
    `/users/experiences/${experienceId}`,
    formattedData
  );
  return response.data.data || response.data;
};

export const deleteExperience = async (experienceId) => {
  try {
    const response = await request.delete(`/users/experience/${experienceId}`);
    return response.data;
  } catch (error) {
    console.error("Delete experience error:", error);
    if (error.response?.status === 404) {
      throw new Error("Ish tajribasi ma'lumoti topilmadi");
    }
    throw error;
  }
};

// Language APIs
export const fetchLanguages = async () => {
  try {
    const response = await request.get("/users/languages");

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.languages) {
      return response.data.data.languages;
    } else if (response.data.languages) {
      return response.data.languages;
    }
    return [];
  } catch (error) {
    console.error("Languages error:", error);
    return [];
  }
};

export const fetchLanguage = async (languageId) => {
  const response = await request.get(`/users/languages/${languageId}`);
  return response.data.data || response.data;
};

export const createLanguage = async (data) => {
  const response = await request.post("/users/languages", data);
  return response.data.data || response.data;
};

export const updateLanguage = async (languageId, data) => {
  const response = await request.put(`/users/languages/${languageId}`, data);
  return response.data.data || response.data;
};

export const deleteLanguage = async (languageId) => {
  try {
    const response = await request.delete(`/users/languages/${languageId}`);
    return response.data;
  } catch (error) {
    console.error("Delete language error:", error);
    if (error.response?.status === 404) {
      throw new Error("Til ma'lumoti topilmadi");
    }
    throw error;
  }
};

// Relatives APIs
export const fetchRelatives = async () => {
  try {
    const response = await request.get("/users/relatives");

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.relatives) {
      return response.data.data.relatives;
    } else if (response.data.relatives) {
      return response.data.relatives;
    }
    return [];
  } catch (error) {
    console.error("Relatives error:", error);
    return [];
  }
};

export const fetchRelative = async (relativeId) => {
  const response = await request.get(`/users/relatives/${relativeId}`);
  return response.data.data || response.data;
};

export const createRelative = async (data) => {
  const formattedData = formatDataForServer(data);
  const response = await request.post("/users/relatives", formattedData);
  return response.data.data || response.data;
};

export const updateRelative = async (relativeId, data) => {
  const formattedData = formatDataForServer(data);
  const response = await request.put(
    `/users/relatives/${relativeId}`,
    formattedData
  );
  return response.data.data || response.data;
};

export const deleteRelative = async (relativeId) => {
  try {
    const response = await request.delete(`/users/relatives/${relativeId}`);
    return response.data;
  } catch (error) {
    console.error("Delete relative error:", error);
    if (error.response?.status === 404) {
      throw new Error("Qarindosh ma'lumoti topilmadi");
    }
    throw error;
  }
};

// API functions for fetching data by specific user ID
export const fetchPrivateInfoById = async (userId) => {
  try {
    if (!userId) return null;

    const response = await request.get(`/users/private-info`);

    if (response.data.data && response.data.data.privateInfo) {
      return response.data.data.privateInfo;
    } else if (response.data.data) {
      return response.data.data;
    } else if (response.data.privateInfo) {
      return response.data.privateInfo;
    }
    return response.data;
  } catch (error) {
    console.error("Private info by ID error:", error);
    return null;
  }
};

export const fetchEducationsById = async (userId) => {
  try {
    if (!userId) return [];

    const response = await request.get(`/users/educations`);

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.educations) {
      return response.data.data.educations;
    }
    return [];
  } catch (error) {
    console.error("Educations by ID error:", error);
    return [];
  }
};

export const fetchExperiencesById = async (userId) => {
  try {
    if (!userId) return [];

    const response = await request.get(`/users/experiences`);

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.experiences) {
      return response.data.data.experiences;
    }
    return [];
  } catch (error) {
    console.error("Experiences by ID error:", error);
    return [];
  }
};

export const fetchLanguagesById = async (userId) => {
  try {
    if (!userId) return [];

    const response = await request.get(`/users/languages`);

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.languages) {
      return response.data.data.languages;
    }
    return [];
  } catch (error) {
    console.error("Languages by ID error:", error);
    return [];
  }
};

export const fetchRelativesById = async (userId) => {
  try {
    if (!userId) return [];

    const response = await request.get(`/users/relatives`);

    if (response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data.data && response.data.data.relatives) {
      return response.data.data.relatives;
    }
    return [];
  } catch (error) {
    console.error("Relatives by ID error:", error);
    return [];
  }
};
