import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchJobs,
  fetchJobById,
  applyForJob,
  fetchUserApplications,
} from "../services/api/jobs";

// Hook to get all jobs with filters and pagination
export const useJobs = (params = {}) => {
  return useQuery({
    queryKey: ["jobs", params],
    queryFn: () => fetchJobs(params),
    keepPreviousData: true,
  });
};

// Hook to get a single job by ID
export const useJob = (jobId) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => fetchJobById(jobId),
    enabled: !!jobId,
  });
};

// Hook to apply for a job
export const useApplyForJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applyForJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["userApplications"]);
    },
  });
};

// Hook to get user applications
export const useUserApplications = () => {
  return useQuery({
    queryKey: ["userApplications"],
    queryFn: fetchUserApplications,
    retry: false,
  });
};
