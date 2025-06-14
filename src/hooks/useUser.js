import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserProfile,
  fetchUserProfileById,
  updateUserProfile,
  fetchPrivateInfo,
  fetchPrivateInfoById,
  createPrivateInfo,
  updatePrivateInfo,
  deletePrivateInfo,
  fetchEducations,
  fetchEducationsById,
  fetchEducation,
  createEducation,
  updateEducation,
  deleteEducation,
  fetchExperiences,
  fetchExperiencesById,
  fetchExperience,
  createExperience,
  updateExperience,
  deleteExperience,
  fetchLanguages,
  fetchLanguagesById,
  fetchLanguage,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  fetchRelatives,
  fetchRelativesById,
  fetchRelative,
  createRelative,
  updateRelative,
  deleteRelative,
} from "../services/api/user";
import { saveState } from "../config/storage";
import Cookies from "js-cookie";
import { getUserIdFromToken } from "../utils/token";

// Logout funksiyasi
export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    // Token va user ma'lumotlarini tozalash
    Cookies.remove("user_token");
    localStorage.removeItem("user");

    // Query cache'ni tozalash
    queryClient.clear();

    // Login sahifasiga yo'naltirish
    window.location.href = "/login";
  };
};

// Xavfsiz User ID olish funksiyasi - to'liq qayta yozilgan
const safeGetUserId = () => {
  try {
    // 1. Token'dan user ID olish (eng ishonchli usul)
    const token = Cookies.get("user_token");

    if (token && typeof token === "string" && token.trim() !== "") {
      try {
        const userId = getUserIdFromToken(token);

        // Primitive type'larni tekshirish
        if (
          userId &&
          (typeof userId === "string" || typeof userId === "number")
        ) {
          const cleanId = String(userId).trim();
          if (
            cleanId &&
            cleanId !== "undefined" &&
            cleanId !== "null" &&
            cleanId !== "0"
          ) {
            return cleanId;
          }
        }
      } catch (tokenError) {}
    }

    // 2. localStorage'dan user ma'lumotlarini olish
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
      try {
        const user = JSON.parse(storedUser);

        // React Query object'ini aniqlash va rad etish
        if (user && typeof user === "object") {
          if (user.client || user.queryKey || user.meta || user.queries) {
            localStorage.removeItem("user");
            return null;
          }

          // User ID'ni turli yo'llar bilan olish
          const possibleIds = [
            user.id,
            user.userId,
            user.user?.id,
            user.user?.userId,
            user.data?.id,
            user.data?.userId,
          ];

          for (const id of possibleIds) {
            if (id && (typeof id === "string" || typeof id === "number")) {
              const cleanId = String(id).trim();
              if (
                cleanId &&
                cleanId !== "undefined" &&
                cleanId !== "null" &&
                cleanId !== "0"
              ) {
                return cleanId;
              }
            }
          }
        }
      } catch (parseError) {
        localStorage.removeItem("user");
      }
    }

    return null;
  } catch (error) {
    return null;
  }
};

// User Profile Hook - /users/profile/userId endpoint'ini ishlatish
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const userId = safeGetUserId();

      if (!userId) {
        throw new Error(
          "Foydalanuvchi ID topilmadi. Iltimos, qayta login qiling."
        );
      }

      // Oxirgi tekshiruv - userId object emasligini ta'minlash
      if (typeof userId === "object") {
        throw new Error("User ID noto'g'ri formatda");
      }

      const userProfile = await fetchUserProfile(userId);

      // Muvaffaqiyatli ma'lumot olinganda localStorage'ga saqlash
      if (
        userProfile &&
        typeof userProfile === "object" &&
        !userProfile.client
      ) {
        saveState("user", userProfile);
      }

      return userProfile;
    },
    retry: (failureCount, error) => {
      // Faqat network xatoliklarda retry qilish
      if (
        error?.message?.includes("User ID") ||
        error?.message?.includes("formatda")
      ) {
        return false;
      }
      return failureCount < 2;
    },
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 daqiqa
    cacheTime: 10 * 60 * 1000, // 10 daqiqa
  });
};

export const useUserProfileById = (userId) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("User ID kerak");
      }

      if (typeof userId === "object") {
        throw new Error("User ID noto'g'ri formatda");
      }

      return fetchUserProfileById(String(userId));
    },
    enabled: !!userId && typeof userId !== "object",
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userProfile"]);
      // Yangi ma'lumotlarni localStorage'ga saqlash
      if (data && typeof data === "object" && !data.client) {
        saveState("user", data);
      }
    },
  });
};

// Private Info Hooks
export const usePrivateInfo = () => {
  return useQuery({
    queryKey: ["privateInfo"],
    queryFn: fetchPrivateInfo,
    retry: false,
  });
};

export const useCreatePrivateInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPrivateInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["privateInfo"]);
    },
  });
};

export const useUpdatePrivateInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePrivateInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["privateInfo"]);
    },
  });
};

export const useDeletePrivateInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePrivateInfo,
    onSuccess: () => {
      queryClient.invalidateQueries(["privateInfo"]);
    },
  });
};

// Education Hooks
export const useEducations = () => {
  return useQuery({
    queryKey: ["educations"],
    queryFn: fetchEducations,
    retry: false,
  });
};

export const useEducation = (educationId) => {
  return useQuery({
    queryKey: ["education", educationId],
    queryFn: () => fetchEducation(educationId),
    enabled: !!educationId,
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEducation,
    onSuccess: () => {
      queryClient.invalidateQueries(["educations"]);
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ educationId, data }) => updateEducation(educationId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["educations"]);
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteEducation,
    onSuccess: () => {
      queryClient.invalidateQueries(["educations"]);
    },
  });
};

// Experience Hooks
export const useExperiences = () => {
  return useQuery({
    queryKey: ["experiences"],
    queryFn: fetchExperiences,
    retry: false,
  });
};

export const useExperience = (experienceId) => {
  return useQuery({
    queryKey: ["experience", experienceId],
    queryFn: () => fetchExperience(experienceId),
    enabled: !!experienceId,
  });
};

export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]);
    },
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ experienceId, data }) =>
      updateExperience(experienceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]);
    },
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]);
    },
  });
};

// Language Hooks
export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
    retry: false,
  });
};

export const useLanguage = (languageId) => {
  return useQuery({
    queryKey: ["language", languageId],
    queryFn: () => fetchLanguage(languageId),
    enabled: !!languageId,
  });
};

export const useCreateLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries(["languages"]);
    },
  });
};

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ languageId, data }) => updateLanguage(languageId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["languages"]);
    },
  });
};

export const useDeleteLanguage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries(["languages"]);
    },
  });
};

// Relatives Hooks
export const useRelatives = () => {
  return useQuery({
    queryKey: ["relatives"],
    queryFn: fetchRelatives,
    retry: false,
  });
};

export const useRelative = (relativeId) => {
  return useQuery({
    queryKey: ["relative", relativeId],
    queryFn: () => fetchRelative(relativeId),
    enabled: !!relativeId,
  });
};

export const useCreateRelative = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRelative,
    onSuccess: () => {
      queryClient.invalidateQueries(["relatives"]);
    },
  });
};

export const useUpdateRelative = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ relativeId, data }) => updateRelative(relativeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["relatives"]);
    },
  });
};

export const useDeleteRelative = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRelative,
    onSuccess: () => {
      queryClient.invalidateQueries(["relatives"]);
    },
  });
};

// Hooks for fetching data by specific user ID
export const usePrivateInfoById = (userId) => {
  return useQuery({
    queryKey: ["privateInfo", userId],
    queryFn: async () => {
      if (!userId) {
        // Agar userId yo'q bo'lsa, current user uchun
        return fetchPrivateInfo();
      }
      return fetchPrivateInfoById(userId);
    },
    enabled: true,
    retry: false,
  });
};

export const useEducationsById = (userId) => {
  return useQuery({
    queryKey: ["educations", userId],
    queryFn: async () => {
      if (!userId) {
        // Agar userId yo'q bo'lsa, current user uchun
        return fetchEducations();
      }
      return fetchEducationsById(userId);
    },
    retry: false,
  });
};

export const useExperiencesById = (userId) => {
  return useQuery({
    queryKey: ["experiences", userId],
    queryFn: async () => {
      if (!userId) {
        // Agar userId yo'q bo'lsa, current user uchun
        return fetchExperiences();
      }
      return fetchExperiencesById(userId);
    },
    retry: false,
  });
};

export const useLanguagesById = (userId) => {
  return useQuery({
    queryKey: ["languages", userId],
    queryFn: async () => {
      if (!userId) {
        // Agar userId yo'q bo'lsa, current user uchun
        return fetchLanguages();
      }
      return fetchLanguagesById(userId);
    },
    retry: false,
  });
};

export const useRelativesById = (userId) => {
  return useQuery({
    queryKey: ["relatives", userId],
    queryFn: async () => {
      if (!userId) {
        // Agar userId yo'q bo'lsa, current user uchun
        return fetchRelatives();
      }
      return fetchRelativesById(userId);
    },
    retry: false,
  });
};
