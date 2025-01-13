import { useState } from "react";
import styles from "./sideBar.module.css";

import filterIcon from "../assets/SideBar_Icons/filter-list.svg";

const SideBar = (props) => {
  const { category, setSearch, setCategoryList } = props;
  const [showList, setShowList] = useState(false)

  // page body
  const bodyStyle = document.querySelector("body");

  if(showList) {
    bodyStyle.style.overflow = "hidden";
  } 

  const clickHandler =(event)=>{
    const {tagName} = event.target;
    if(tagName === "LI") {
      setShowList(false)
      document.querySelector("body").style.overflow = "auto";
    }
  }

  const closeIconHandler =()=> {
    setShowList(false);
    bodyStyle.style.overflow = "auto"
  }

  return (
    <aside onClick={clickHandler}  className={ showList ? styles.asideActive : styles.aside}>
      <div onClick={()=> setShowList(true)} className={ showList ? "hidden" : styles.filterIcon_wrapper}>
        <div className={styles.image_container} >

        <img
          className={`${styles.filterIcon} `}
          src={filterIcon}
          alt=""
          width={30}
          />
          </div>
      </div>

      <section className={`${ showList ? styles.aside__Active : styles.asideContent}`}>
        <div onClick={closeIconHandler} className={`${showList ? "absolute top-8 left-8 text-[1.6rem] cursor-pointer" : "hidden"}`}>
          X
        </div>
        <h4 className="mb-4 text-[1.1rem] font-bold">دسته ها</h4>

        <ul className={styles.list}>
          <li onClick={() => setCategoryList("all")}>همه</li>
          {category.data.map((list) => (
            <li
              onClick={() => {
                setSearch(list._id);
                setCategoryList(false);
              }}
              className="flex gap-2 w-full"
              key={list._id}
            >
              <img src={`../../public/${list.icon}.svg`} alt="" width={25} />
              {list.name}
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default SideBar;
