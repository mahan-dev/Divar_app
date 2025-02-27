import api from "../configs/api";

const getCategories = () => api.get("category");
const createCategories = (data) => api.post("category", data);
const deleteCategory = (id)=> api.delete(`category/${id}`)
export { getCategories, createCategories, deleteCategory };
