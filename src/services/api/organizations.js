import { request } from "../../config/request";

// Get all organizations
export const fetchOrganizations = async () => {
  const response = await request.get("/organizations");
  return response.data.data.organizations;
};

// Get organization by ID
export const fetchOrganizationById = async (id) => {
  const response = await request.get(`/organizations/${id}`);
  return response.data.data.organization;
};

// Get featured organizations (limited number for homepage)
export const fetchFeaturedOrganizations = async (limit = 3) => {
  const response = await request.get("/organizations");
  return response.data.data.organizations.slice(0, limit);
};
