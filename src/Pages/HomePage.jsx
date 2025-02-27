import React, { useState } from "react";
import SideBar from "../Templates/SideBar";
import Main from "../Templates/Main";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/admin";
import { getAllPosts } from "../services/user";
import Loader from "../Loader/Loader";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [categoryList, setCategoryList] = useState("all");

  const { data: category, isLoading: categoryLoading } = useQuery({

    queryKey :["get-category"],
    queryFn : getCategories
  }
  );


  const { data: posts, isLoading: postsLoading } = useQuery({
   queryKey: ["all-posts"],
    queryFn :getAllPosts
  });
  console.log(posts)
 
  return (
    <section className="my-8 font-medium">
      {categoryLoading || postsLoading ? (
        <Loader />
      ) : (
        <section className="flex gap-8 max-sm:block">
          <SideBar category={category} search={search} setSearch={setSearch} setCategoryList={setCategoryList} />
          <Main posts={posts} search={search} setSearch={setSearch} categoryList={categoryList} />
        </section>
      )}
    </section>
  );
};

export default HomePage;
