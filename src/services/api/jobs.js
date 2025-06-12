import { request } from "../../config/request";
import Cookies from "js-cookie";

// Fetch all jobs with optional filters and pagination
export const fetchJobs = async (params = {}) => {
  try {
    console.log("fetchJobs called with params:", params);

    // Clean up params - remove empty values
    const cleanParams = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        cleanParams[key] = value;
      }
    });

    console.log("Clean params:", cleanParams);

    const response = await request.get("/jobs", { params: cleanParams });
    console.log("Jobs API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Fetch a single job by ID
export const fetchJobById = async (jobId) => {
  try {
    console.log("Fetching job with ID:", jobId);
    const response = await request.get(`/jobs/${jobId}`);
    console.log("Job detail API response:", response.data);

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
    console.error(`Error fetching job ${jobId}:`, error);
    throw error;
  }
};

// Apply for a job
export const applyForJob = async (jobId) => {
  try {
    console.log("🎯 Applying for job:", jobId);

    // Check if user is authenticated using the same token retrieval logic as request.js
    const token =
      Cookies.get("user_token") ||
      localStorage.getItem("token") ||
      localStorage.getItem("user_token");

    if (!token) {
      console.error("❌ No authentication token found");
      throw new Error("Authentication required");
    }

    console.log("🔑 Token found, proceeding with application");

    const response = await request.post(`/applications/jobs/${jobId}`);
    console.log("✅ Apply job response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error applying for job:", error);

    if (error.response?.status === 401) {
      console.error("🚫 Unauthorized - Token may be invalid or expired");
      throw new Error("Authentication failed. Please login again.");
    }

    if (error.response?.status === 400) {
      console.error("⚠️ Bad request - May have already applied");
      throw new Error("You may have already applied for this job.");
    }

    throw error;
  }
};

// Fetch user applications
export const fetchUserApplications = async () => {
  try {
    console.log("Fetching user applications...");
    const response = await request.get("/applications/user");
    console.log("User applications API response:", response);
    console.log("User applications data:", response.data);

    // Return the raw response data for better debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching user applications:", error);
    // Don't return empty array, let the error propagate for better debugging
    throw error;
  }
};
