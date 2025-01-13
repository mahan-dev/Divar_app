// ?components
import CategoryList from "../Templates/CategoryList";
import CategoryForm from "../Templates/CategoryForm";
import Loader from "../Loader/Loader";
// ?components

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/admin";

const AdminPage = () => {
  const { isLoading } = useQuery({queryKey: ["get-category"], queryFn: getCategories});

  return (
    <section className="font-medium">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CategoryList />
          <CategoryForm />
        </>
      )}
    </section>
  );
};

export default AdminPage;
