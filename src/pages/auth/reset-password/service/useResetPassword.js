import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/auth/reset-password", data).then((res) => res.data),
  });
};
