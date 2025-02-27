import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { deleteCategory, getCategories } from "../services/admin";

import styles from "./CategoryList.module.css";

const CategoryList = () => {
  const [id, setId] = useState("");
  const { data } = useQuery({queryKey: ["get-category"], queryFn:getCategories});
  const categoryLists = data?.data.find(item=> item._id === id)
  const deleteCategoryItem = categoryLists?._id;

  const queryClient= useQueryClient();

  const onSuccess = ()=>{
    queryClient.invalidateQueries("get-category")
  }
  const {mutate} = useMutation(deleteCategory, {onSuccess} )

  console.log(id)

  const submitHandler = (e)=>{
    e.preventDefault();
    mutate(deleteCategoryItem)
  }

  return (
    <form onSubmit={submitHandler} >
      <section className="flex justify-center flex-col gap-4 my-8">
        {data?.data.map((category) => (
          <section className={`${styles.categoryList}`} key={category._id}>
            <div className="flex gap-2">

            <img src={`../../public/${category.icon}.svg`} alt="" width={25}/>
            <p>{category.name}</p>
            
            </div>

            <div className="flex gap-4 items-center">
                <button className={styles.delete_category} type="submit"  onClick={()=> setId(category._id)}>
                    پاک کردن
                </button>
                <p>اسلاگ: {category.slug}</p>

            </div>

          </section>
        ))}
      </section>
    </form>
  );
};

export default CategoryList;
