import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../config/request";

export const useGetInfos = () => {
  return useQuery({
    queryKey: ["infos"],
    queryFn: () => request.get("/auth/protected").then((res) => res.data),
  });
};
