import React, { useRef } from "react";
import { sendOtp } from "../services/auth";
import styles from "./sendOtp.module.css";
import { toast } from "react-toastify";

const SendOtp = (props) => {
    const inputNumber = useRef(null);
    const {setMobile, mobile, setStep} = props;

    // toastify Styles
    const position = "top-center";
    const rtl=true;
    

    // ! 22222222222

    const submitHandler = async (event)=>{
        event.preventDefault();
        const {response, error } = await sendOtp(mobile)
        if(mobile.length !== 11 && !isNaN(mobile)){
          toast.error(" کاراکتر کمتر از 11 است  ", {position, rtl})
            return ;
        }
        if(mobile.length !== 11 || isNaN(mobile)) {
          toast.error(" لطفا عدد وارد کنید ", {position})
          return ;
        }
        if(response) {
          toast.success(" با موفقیت ارسال شد ")
          setTimeout(()=> {
            setStep(2);
            
          }, 500)
            return ;
        }
        if (error) {
          console.log("error")
        }
    }

  return (
    <form onSubmit={submitHandler} className={`${styles.form} flex font-medium h-screen justify-center items-center`}>

      <section className="flex items-center flex-col">

      <p className="text-[1.2rem]">ورود به حساب کاربری</p>
      <p>
        برای استفاده از امکانات دیوار شماره موبایل خود را وارد کنید. کد تایید به
        این شماره ارسال خواهد شد
      </p>
      <label htmlFor="number">شماره موبایل خود را وارد کنید : </label>
      <input ref={inputNumber} value={mobile} title="لطفا فقط شماره وارد کنید" onChange={e=> setMobile(e.target.value)} type="text" name="number" id="number" placeholder="شماره موبایل" />

      <button type="submit">ارسال کد تایید</button>
      </section>
    </form>
  );
};

export default SendOtp;
