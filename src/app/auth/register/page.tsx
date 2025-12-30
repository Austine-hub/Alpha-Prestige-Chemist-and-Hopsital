"use client";

import { useState, useCallback, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./SignUp.module.css";

interface FormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // === HANDLE CHANGE =======================================================
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error on change
    setErrors(prev => {
      if (prev[name]) {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      }
      return prev;
    });
  }, []);

  // === VALIDATION ===========================================================
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9+()\s-]{10,}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain lowercase, uppercase, and a number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // === SUBMIT ===============================================================
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Registration failed");
        setMessageType("error");
      } else {
        setMessage("Account created successfully! Redirecting...");
        setMessageType("success");

        setFormData({
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => router.push("/auth/login"), 2000);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // === TOGGLES ==============================================================
  const togglePasswordVisibility = useCallback(
    () => setShowPassword(prev => !prev),
    []
  );

  const toggleConfirmPasswordVisibility =
    useCallback(() => setShowConfirmPassword(prev => !prev), []);

  // =============================================================================

  return (
    <div className={styles.container}>
      <main className={styles.card}>

        {/* LOGO SECTION */}
        <div className={styles.logoSection}>
          <div className={styles.logoWrapper}>
            <Image
              src="/logo.png"
              alt="Yallah Pharmacy"
              width={120}
              height={120}
              className={styles.logoImage}
              priority
            />
            <h1 className={styles.logoText}>Yallah Pharmacy</h1>
            <p className={styles.logoTagline}>Caring Beyond Drugs</p>
          </div>
        </div>

        {/* HEADER */}
        <header className={styles.header}>
          <h2 className={styles.title}>Create Account</h2>
          <p className={styles.subtitle}>Join Yallah Clients Portal</p>
        </header>

        {/* SERVER MESSAGE */}
        {message && (
          <div
            className={`${styles.message} ${
              messageType === "success"
                ? styles.messageSuccess
                : styles.messageError
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Username */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              className={`${styles.input} ${
                errors.username ? styles.inputError : ""
              }`}
              id="username"
              name="username"
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              disabled={loading}
            />
            {errors.username && (
              <span className={styles.errorText}>{errors.username}</span>
            )}
          </div>

          {/* Email */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">
              Email Address
            </label>
            <input
              className={`${styles.input} ${
                errors.email ? styles.inputError : ""
              }`}
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              disabled={loading}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="phone">
              Phone Number
            </label>
            <input
              className={`${styles.input} ${
                errors.phone ? styles.inputError : ""
              }`}
              id="phone"
              name="phone"
              type="tel"
              placeholder="+254 700 000 000"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              disabled={loading}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>

            <div className={styles.passwordWrapper}>
              <input
                className={`${styles.input} ${
                  errors.password ? styles.inputError : ""
                }`}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirm Password
            </label>

            <div className={styles.passwordWrapper}>
              <input
                className={`${styles.input} ${
                  errors.confirmPassword ? styles.inputError : ""
                }`}
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                disabled={loading}
              />

              <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.confirmPassword && (
              <span className={styles.errorText}>
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerText}>or</span>
        </div>

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Already have an account?{" "}
            <a href="/auth/login" className={styles.link}>
              Sign in
            </a>
          </p>
        </footer>

      </main>
    </div>
  );
}
