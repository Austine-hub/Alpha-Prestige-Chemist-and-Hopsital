"use client";

import axios, { AxiosError } from "axios";
import axiosClient from "./axiosClient";

/* ============================================================
 * 📦 Type Definitions (Aligned with Backend)
 * ============================================================ */

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  username: string;
  created_at?: string | Date;
}

export interface BackendErrorShape {
  error?: string;
  message?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: UserData;
  error?: string;
}

/* ============================================================
 * 🛠 Error Normalizer — Modern, Type-Safe
 * ============================================================ */

function handleApiError(error: unknown): AuthResponse {
  // Narrow using official Axios helper
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<BackendErrorShape>;

    const backendMessage =
      axiosErr.response?.data?.error ||
      axiosErr.response?.data?.message ||
      "Request failed.";

    return {
      success: false,
      message: backendMessage,
      error: backendMessage,
    };
  }

  // Non-Axios unexpected error
  return {
    success: false,
    message: "Unexpected error occurred.",
    error: String(error),
  };
}

/* ============================================================
 * 🔐 Auth API — Clean, Typed, Modern
 * ============================================================ */

export async function loginUser(
  payload: LoginPayload
): Promise<AuthResponse> {
  try {
    const { data } = await axiosClient.post<AuthResponse>(
      "/auth/login",
      payload
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthResponse> {
  try {
    const { data } = await axiosClient.post<AuthResponse>(
      "/auth/register",
      payload
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
}
