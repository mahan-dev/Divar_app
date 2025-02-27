import { useQuery } from "@tanstack/react-query";
import { myPosts } from "../services/user";
import { formatDigits } from "../helper/function";

import styles from "./postLists.module.css";

const PostLists = () => {
  const { data } = useQuery({queryKey: ["my-posts"],queryFn: myPosts});
  

  console.log(data);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  return (
    <section className={`${styles.post_container} flex  gap-3 flex-col`}>
        <h3>آگهی های شما</h3>
      {data?.data.posts?.map((post) => (
        <section key={post._id} className="flex items-center justify-between">
          <div className={styles.image_content}>
            <img src={`${BASE_URL}/${post.images[0]}`} alt="post_image" width={100} />
            <div>
                <p>{post.options.title}</p>
                <p> {post.options.city} </p>
            </div>
          </div>
          <div className="flex gap-3 items-center flex-col">
            <p> {new Date(post.createdAt).toLocaleDateString("fa-IR")} </p>
            <p>{formatDigits(post.amount)} تومان</p>
          </div>
        </section>
      ))}
    </section>
  );
};

export default PostLists;
