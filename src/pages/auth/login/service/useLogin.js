import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/users/login", data).then((res) => res.data),
  });
};
