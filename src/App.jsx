import React from "react";
import RouterSite from "./router/RouterSite";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout/Layout";
import { defaultOptions } from "./configs/reactQuery";
import { BrowserRouter as Router } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const queryClient = new QueryClient({ defaultOptions });
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <RouterSite />  
          <ToastContainer />
        </Layout>
      </Router> 
    </QueryClientProvider>
  );
};

export default App;
