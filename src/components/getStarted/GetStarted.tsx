//src/components/getStarted/GetStarted.tsx

"use client";

import Link from "next/link";
import styles from "./GetStarted.module.css";

interface GetStartedProps {
  speakToDoctorPath?: string;
  uploadPrescriptionPath?: string;
}

export default function GetStarted({
  speakToDoctorPath = "/consultation",
  uploadPrescriptionPath = "/prescription",
}: GetStartedProps) {
  return (
    <section className={styles.container} aria-labelledby="get-started-heading">
      <h2 id="get-started-heading" className={styles.heading}>
        Get Started
      </h2>

      <div className={styles.buttonGroup} role="group">
        {/* Speak to a Doctor */}
        <Link
          href={speakToDoctorPath}
          className={`${styles.button} ${styles.buttonDark}`}
          aria-label="Speak to a doctor"
        >
          Speak to a Doctor
        </Link>

        {/* Upload Prescription */}
        <Link
          href={uploadPrescriptionPath}
          className={`${styles.button} ${styles.buttonGreen}`}
          aria-label="Upload a prescription"
        >
          Upload a Prescription
        </Link>
      </div>
    </section>
  );
}
