// src/pages/auth/signup/service/mutation/useSignup.ts
import { request } from "../../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await request.post("/auth/register", data);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
