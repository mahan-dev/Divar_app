import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <section className="px-6 max-sm:p-2">
      <Header />
      {children}
      <Footer />
    </section>
  );
};

export default Layout;
