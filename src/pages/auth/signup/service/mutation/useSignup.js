import { request } from "../../../../../config/request";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data) => {
      try {
        request.post("/users/register", data).then((res) => {
          console.log(res);
        });
      } catch (error) {
        console.log(error.message.response.data.message);
      }
    },
  });
};
