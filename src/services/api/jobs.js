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

    // Filter out jobs with endDate up to June 30, 2025
    const filterDate = new Date("2025-06-30T23:59:59");

    let filteredData = response.data;

    // Handle different response structures and filter jobs
    if (response.data?.data?.jobs && Array.isArray(response.data.data.jobs)) {
      const filteredJobs = response.data.data.jobs.filter((job) => {
        if (!job.endDate) return true; // Keep jobs without endDate
        const jobEndDate = new Date(job.endDate);
        return jobEndDate > filterDate; // Keep jobs with endDate after June 30, 2025
      });

      filteredData = {
        ...response.data,
        data: {
          ...response.data.data,
          jobs: filteredJobs,
          meta: {
            ...response.data.data.meta,
            totalCount: filteredJobs.length,
          },
        },
      };
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      const filteredJobs = response.data.data.filter((job) => {
        if (!job.endDate) return true;
        const jobEndDate = new Date(job.endDate);
        return jobEndDate > filterDate;
      });

      filteredData = {
        ...response.data,
        data: filteredJobs,
        meta: {
          ...response.data.meta,
          totalCount: filteredJobs.length,
        },
      };
    } else if (Array.isArray(response.data.jobs)) {
      const filteredJobs = response.data.jobs.filter((job) => {
        if (!job.endDate) return true;
        const jobEndDate = new Date(job.endDate);
        return jobEndDate > filterDate;
      });

      filteredData = {
        ...response.data,
        jobs: filteredJobs,
        meta: {
          ...response.data.meta,
          totalCount: filteredJobs.length,
        },
      };
    } else if (Array.isArray(response.data)) {
      filteredData = response.data.filter((job) => {
        if (!job.endDate) return true;
        const jobEndDate = new Date(job.endDate);
        return jobEndDate > filterDate;
      });
    }

    return filteredData;
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
