import React from "react";
import api from "../configs/api";
import { checkOtp } from "../services/auth";
import { getUserCookie, SetCookie } from "../utils/getUsersCookie";
import { useNavigate } from "react-router-dom";
import styles from "./checkOtp.module.css";
import { getUserAccount } from "../services/user";
import { useQuery } from "@tanstack/react-query";

const CheckOtp = (props) => {
  const { setStep, setCode, code, mobile } = props;
  const navigate = useNavigate();
  const {data, isLoading, error, refetch } = useQuery({queryKey: ["userProfile"], queryFn :getUserAccount})

  console.log(code);
  const submitHandler = async (event) => {
    event.preventDefault();
    const { response, error } = await checkOtp(mobile, code);

    if (response) {
      console.log("is true");
      console.log(response.data.accessToken);
      SetCookie(response.data);
      refetch();
      navigate("/");
      return;
    }
    if (error) {
      console.log("is not true");
      return;
    }

    // getUserCookie("accessToken");
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <section className="max-sm:w-[320px] max-sm:mx-4">
        <h6 className="font-bold text-[1.2rem]"> تایید کد </h6>
        <p className=""> کد ارسال شده را وارد کنید </p>
        <label htmlFor="number">کد تایید :</label>
        <input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          name="number"
          id="number"
        />

        <div className="flex justify-start gap-2">
          <button type="submit">تایید</button>
          <button onClick={() => setStep(1)}>تغییر شماره</button>
        </div>
      </section>
    </form>
  );
};

export default CheckOtp;
