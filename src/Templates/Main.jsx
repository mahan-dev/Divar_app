import { useEffect, useState } from "react";
import { formatDigits } from "../helper/function";
import styles from "./main.module.css";

const Main = ({ posts, search, categoryList }) => {
  const [allPost, setAllPost] = useState("all");

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //! showing Data Based on Category!
  const productToRender =
    categoryList === "all"
      ? posts?.data.posts
      : posts?.data.posts.filter((post) => post.category === search);

  //! showing Data Based on Category!

  const CheckSearch = () => {
    if (search) {
      setAllPost(search);
    }
  };

  useEffect(() => {
    CheckSearch();
  }, [search, allPost]);



  return (
    <main
      className={styles.main}
    >
      {
        productToRender.map(post => (
          <section
            className={styles.postCard_container}
            key={post._id}
          >
            <div>
              <img
                className="rounded-lg w-[140px] h-full"
                src={`${BASE_URL}/${post.images}`}
                alt=""
              />
            </div>
            <section className="flex h-full flex-col justify-between -order-1">
              <p> {post.options.title} </p>

              <div className=" text-[#828282]">
                <p className="w-fit overflow-hidden max-w-[130px]">
                  {" "}
                  {formatDigits(post.amount)} تومان
                </p>
                <p> {post.options.city} </p>
              </div>
            </section>
          </section>
        ))
       }
    </main>
  );
};

export default Main;
