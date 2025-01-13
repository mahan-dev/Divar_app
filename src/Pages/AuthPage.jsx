import React, { useState } from "react";
import styles from "./auth.module.css";
import SendOtp from "../Templates/SendOtp";
import CheckOtp from "../Templates/CheckOtp";

const AuthPage = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  return (
    <section className={styles.auth_container}>
        
      {step === 1 && (
        <SendOtp
          step={step}
          setStep={setStep}
          setMobile={setMobile}
          mobile={mobile}
        />
      )}

      {step === 2 && (
        <CheckOtp
          setStep={setStep}
          mobile={mobile}
          setCode={setCode}
          code={code}
          setMobile={setMobile}
        />
      )}

    </section>
  );
};

export default AuthPage;
