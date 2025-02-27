import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { getCategories } from "../services/admin";
import styles from "./addPost.module.css";
import { getUserCookie } from "../utils/getUsersCookie";
import axios from "axios";
import { toast } from "react-toastify";

const AddPost = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    city: "",
    category: "",
    images: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const inputNumbRef = useRef(null);

  


  console.log(form);

  const { data } = useQuery({queryKey: ["get-category"], queryFn: getCategories});

  const formData = new FormData();
  for (let item in form) {
    console.log(item)
    console.log(form)
    console.log(formData)
    console.log(form[item])
    formData.append(item, form[item]);
  }

  const fileRef = useRef(null);
  // request to create post

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("yes");
  };

  const changeHandler = (event) => {
    const { files, name, value } = event.target;

    if (name !== "images") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: files[0] });
    }
  };



  const queryClient= useQueryClient();

  const addHandler = () => {

    setIsLoading(true);

    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const token = getUserCookie("accessToken");


    if(isNaN(inputNumbRef.current.value)){
      toast.error("قیمت باید عدد باشد", {position:"top-center"})
      return ;
    } 

    if(!form.title || !form.description || !form.amount || !form.category  || !form.images) {
      toast.error("فیلد هارا خالی نگذارید", {position:"top-center"})
      setIsLoading(false)
      return ;
    }

    axios
      .post(`${BASE_URL}/post/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message, { position: "top-center" });
        setForm({
          title: "",
          description: "",
          amount: "",
          city: "",
          category: "",
          images: null,
        });
        queryClient.invalidateQueries("get-category");

        if(fileRef){
            fileRef.current.value="";
        }
      })
      .finally(()=> {
        setIsLoading(false)
      })
  };

  return (
    <form
      onSubmit={submitHandler}
      onChange={changeHandler}
      className={styles.form}
    >
      <h3> افزودن آگهی </h3>
      <label htmlFor="title">عنوان</label>
      <input type="text" name="title" id="title" value={form.title} />

      <label htmlFor="description">توضیحات</label>
      <input type="text" name="description" id="description" value={form.description} />

      <label htmlFor="amount">قیمت</label>
      <input ref={inputNumbRef} type="text" name="amount" id="amount" value={form.amount} />

      <label htmlFor="city">شهر</label>
      <input type="text" name="city" id="city" value={form.city} />

      <label htmlFor="category">دسته بندی</label>
      <select
        className="cursor-pointer"
        value={form.category}
        name="category"
        id="category"
      >
        <option value="" disabled>
          انتخاب کنید
        </option>
        {data?.data.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>

      <label htmlFor="images"> عکس </label>
      <input type="file" name="images" id="images" ref={fileRef} />

      <button type="submit" onClick={addHandler} disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
};

export default AddPost;
