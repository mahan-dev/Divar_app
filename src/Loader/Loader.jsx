import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#d14757"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </section>
  );
};

export default Loader;
