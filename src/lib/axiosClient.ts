"use client";

import axios, { AxiosError, AxiosResponse } from "axios";

/**
 * NOTE:
 * - In Next.js, `import.meta.env` does NOT work.
 * - All public browser environment variables MUST start with: NEXT_PUBLIC_
 * - Example: NEXT_PUBLIC_API_URL="https://api.example.com"
 */

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Response interceptor:
 * - Normalizes errors
 * - Logs useful info (without exposing server internals)
 * - Guarantees typed rejection
 */
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "Unknown API error";

    // Structured log (client-side only)
    if (typeof window !== "undefined") {
      console.error("❌ API Request Failed:", { status, message });
    }

    return Promise.reject({
      status,
      message,
      raw: error,
    });
  }
);

export default axiosClient;
