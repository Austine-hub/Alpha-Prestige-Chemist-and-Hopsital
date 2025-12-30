"use client";

import { useState, useCallback, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient"; // adjust path
import styles from "./Login.module.css";

interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: { id: number; email: string; name?: string };
  error?: string;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export default function LoginPage() {
  const router = useRouter();
  const logo = "/logo.png"; // Loads from /public/logo.png
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // INPUT CHANGE
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name as keyof FormErrors];
          return updated;
        });
      }
    },
    [errors]
  );

  // VALIDATION
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email or phone number is required";
    } else if (!EMAIL_REGEX.test(formData.email) && !/^\d{10,}$/.test(formData.email)) {
      newErrors.email = "Enter a valid email or phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < MIN_PASSWORD_LENGTH) {
      newErrors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // SUBMIT
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;
    setLoading(true);

    try {
      const { data } = await axiosClient.post<LoginResponse>("/auth/login", formData);

      if (!data.success) {
        setMessage(data.error || data.message || "Invalid credentials");
        return;
      }

      setMessage("Login successful!");

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (rememberMe && data.user) {
          localStorage.setItem("rememberedEmail", data.user.email);
        }
      }

      setTimeout(() => router.push("/"), 1200);
    } catch (error: any) {
      setMessage(error?.response?.data?.error || "Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const isSuccess = message.toLowerCase().includes("successful");

  return (
    <div className={styles.container}>
      <main className={styles.loginCard}>
                {/* LOGO */}
            <header className={styles.logoSection}>
            <div className={styles.logoPlaceholder}>
                <Image
                src={logo}                   // ✔ Now using public path
                alt="Company Logo"
                width={120}
                height={120}
                className={styles.logoImage}
                priority
                />
                <div className={styles.logoCircle} aria-hidden="true"></div>
            </div>
            </header>

        <h1 className={styles.title}>Hi, welcome back</h1>
        <p className={styles.subtitle}>Please fill in your details to log in</p>

        {message && (
          <div
            className={`${styles.serverMessage} ${
              isSuccess ? styles.successMsg : styles.errorMsg
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Phone Number / Email
            </label>

            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="Enter email or phone number"
              autoComplete="username"
              disabled={loading}
              aria-invalid={!!errors.email}
            />

            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>

            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                autoComplete="current-password"
                disabled={loading}
                aria-invalid={!!errors.password}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={styles.togglePassword}
                disabled={loading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
          </div>

          {/* Remember & Forgot */}
          <div className={styles.rememberRow}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>

            <Link href="/forgot-password" className={styles.forgotLink}>
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={styles.btnPrimary}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Signup */}
        <div className={styles.signupSection}>
          <p className={styles.signupText}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className={styles.signupLink}>
              Sign Up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} - Ajanja Softwares</p>
        </footer>
      </main>
    </div>
  );
}
