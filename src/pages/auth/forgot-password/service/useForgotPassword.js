import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data) => {
      return request.post("/auth/forgot-password", data);
    },
  });
};
