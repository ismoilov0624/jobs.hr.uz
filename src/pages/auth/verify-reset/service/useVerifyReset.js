import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useVerifyReset = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/auth/verify-reset", data).then((res) => res.data),
  });
};
