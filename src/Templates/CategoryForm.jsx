import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCategories } from "../services/admin";
import styles from "./CategoryForm.module.css";

const CategoryForm = () => {
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });
  const queryClient = useQueryClient();

  const toastMessage = () => {
    toast.success("دسته بندی ایجاد شد", { position: "top-center" });
  };

  const { response, data, mutate, isLoading } = useMutation(createCategories, {
    onSuccess: () => {
      toastMessage(), queryClient.invalidateQueries("get-category");
    },
  });
  console.log({ response, data });

  const position = "top-center";
  const submitHandler = (e) => {
    e.preventDefault();
    if (!form.name || !form.slug || !form.icon) {
      toast.error(" لطفا فیلد هارا پرکنید ", { position });
      console.log(form);
    } else {
      mutate(form);
    }
  };

  const changeHandler = (event) => {
    const { name } = event.target;
    setForm({ ...form, [name]: event.target.value });
  };

  return (
    <form
      className={`${styles.form} flex flex-col`}
      onSubmit={submitHandler}
      onChange={changeHandler}
    >
      <h3>دسته بندی جدید</h3>

      <label htmlFor="name">اسم دسته بندی</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="دسته بندی را وارد کنید"
      />

      <label htmlFor="slug">اسلاگ</label>
      <input
        type="text"
        name="slug"
        id="slug"
        placeholder="اسلاگ را وارد کنید"
      />

      <label htmlFor="icon" name="icon" id="icon">
        آیکون
      </label>
      <input
        type="text"
        name="icon"
        id="icon"
        placeholder="نام آیکون را وارد کنید"
      />

      <button type="submit" disabled={isLoading}>
        ایجاد
      </button>
    </form>
  );
};

export default CategoryForm;
