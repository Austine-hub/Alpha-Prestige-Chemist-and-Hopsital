"use client";

import { useState, useCallback } from "react";
import styles from "./PrescriptionUpload.module.css";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  prescriptionDetails: string;
  doctorName?: string;
  file?: File | null;
}

export default function RequestPrescriptionPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    prescriptionDetails: "",
    doctorName: "",
    file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // unified update handler
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData(prev => ({ ...prev, file }));
  }, []);

  const clearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      doctorName: "",
      prescriptionDetails: "",
      file: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1800));

      setMessage("✔ Prescription request submitted successfully!");
      clearForm();
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.requestSection}>
      <div className={styles.container}>
        <h1 className={styles.title}>Request a Prescription</h1>

        <p className={styles.subtitle}>
          Fill out the form and our pharmacists will review your request and
          contact you as soon as possible.
        </p>

        <form
          onSubmit={handleSubmit}
          className={styles.form}
          aria-label="Request Prescription Form"
        >
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              required
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInput}
              autoComplete="name"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder="yourname@example.com"
                value={formData.email}
                onChange={handleInput}
                autoComplete="email"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input
                required
                id="phone"
                name="phone"
                type="tel"
                pattern="[0-9+\- ]{7,15}"
                placeholder="+1 555 123 4567"
                value={formData.phone}
                onChange={handleInput}
                autoComplete="tel"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="doctorName">Doctor’s Name (optional)</label>
            <input
              id="doctorName"
              name="doctorName"
              type="text"
              placeholder="Enter your doctor's name"
              value={formData.doctorName}
              onChange={handleInput}
              autoComplete="off"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="prescriptionDetails">Prescription Details</label>
            <textarea
              required
              rows={4}
              id="prescriptionDetails"
              name="prescriptionDetails"
              placeholder="Describe the medication or upload a file below"
              value={formData.prescriptionDetails}
              onChange={handleInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="file">Upload Prescription (PDF / Image)</label>
            <input
              id="file"
              name="file"
              type="file"
              accept=".pdf,image/*"
              aria-label="Upload prescription file"
              onChange={handleFile}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitBtn}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>

          {message && <p className={styles.successMsg}>{message}</p>}
        </form>
      </div>
    </section>
  );
}
