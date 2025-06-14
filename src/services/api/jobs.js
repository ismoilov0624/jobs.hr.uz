import { request } from "../../config/request";
import Cookies from "js-cookie";

// Fetch all jobs with optional filters and pagination
export const fetchJobs = async (params = {}) => {
  try {
    // Clean up params - remove empty values
    const cleanParams = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        cleanParams[key] = value;
      }
    });

    const response = await request.get("/jobs", { params: cleanParams });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single job by ID
export const fetchJobById = async (jobId) => {
  try {
    const response = await request.get(`/jobs/${jobId}`);

    // Handle different response structures
    if (response.data?.data?.job) {
      return response.data.data.job;
    } else if (response.data?.data) {
      return response.data.data;
    } else if (response.data) {
      return response.data;
    }

    throw new Error("Invalid job data structure");
  } catch (error) {
    throw error;
  }
};

// Apply for a job
export const applyForJob = async (jobId) => {
  try {
    // Check if user is authenticated using the same token retrieval logic as request.js
    const token =
      Cookies.get("user_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("user_token");

    if (!token) {
      throw new Error("Authentication required");
    }

    const response = await request.post(`/applications/jobs/${jobId}`);

    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please login again.");
    }

    if (error.response?.status === 400) {
      throw new Error("You may have already applied for this job.");
    }

    throw error;
  }
};

// Fetch user applications
export const fetchUserApplications = async () => {
  try {
    const response = await request.get("/applications/user");

    // Return the raw response data for better debugging
    return response.data;
  } catch (error) {
    // Don't return empty array, let the error propagate for better debugging
    throw error;
  }
};
