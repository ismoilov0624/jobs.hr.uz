import { useQuery } from "@tanstack/react-query";
import {
  fetchOrganizations,
  fetchFeaturedOrganizations,
  fetchOrganizationById,
} from "../services/api/organizations";

// Hook to get all organizations
export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
  });
};

// Hook to get featured organizations (for homepage)
export const useFeaturedOrganizations = (limit = 3) => {
  return useQuery({
    queryKey: ["featuredOrganizations", limit],
    queryFn: () => fetchFeaturedOrganizations(limit),
  });
};

// Hook to get a single organization by ID
export const useOrganization = (id) => {
  return useQuery({
    queryKey: ["organization", id],
    queryFn: () => fetchOrganizationById(id),
    enabled: !!id, // Only run the query if we have an ID
  });
};
