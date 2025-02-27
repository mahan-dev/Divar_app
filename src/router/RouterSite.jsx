import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import NotFoundPage from "../Pages/404";
import AuthPage from "../Pages/AuthPage";
import { useQuery } from "@tanstack/react-query";
import { getUserAccount } from "../services/user";
import Dashboard from "../Pages/Dashboard";
import AdminPage from "../Pages/AdminPage";
import Loader from "../Loader/Loader";

const RouterSite = () => {

  const { data, isLoading} = useQuery({queryKey: ["userProfile"],queryFn: getUserAccount});
  console.log(data)
  if(isLoading) return <Loader /> ;

  const isAdmin = data?.data?.role=== "ADMIN";

  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={ data ? <Dashboard /> : <Navigate to={"/auth"} />  }/>
        <Route path="/admin" element={ isAdmin ? <AdminPage /> : <Navigate to={"/auth"} />  }/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
  );
};

export default RouterSite;
