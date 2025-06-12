import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useVerifyReset = () => {
  return useMutation({
    mutationFn: (data) => {
      return request.post("/auth/verify-reset", data);
    },
  });
};
