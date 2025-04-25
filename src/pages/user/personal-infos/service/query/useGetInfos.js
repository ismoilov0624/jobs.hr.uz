import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["infos"],
    queryFn: () => request.get("/infos").then((res) => res.data),
  });
};
