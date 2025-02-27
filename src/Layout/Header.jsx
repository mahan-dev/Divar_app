import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";
import {  useQueryClient, useQuery } from "@tanstack/react-query";
import { getUserAccount } from "../services/user";

import styles from "./header.module.css";
import styled from "styled-components";

import profileIcon from "../../public/profile.svg";
import locationIcon from "../../public/location.svg";
import divarIcon from "../../public/divar.svg";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const ListDropDown = styled.ul`
display: ${(props)=> props.open? "flex" : "none"};
flex-direction: column;
background-color: #fbfbfb;
transition: all 0.5s ease;
position: absolute;
top: 100%;
margin-top: 0.5rem;
box-shadow: rgba(0,0,0,0.1) 0px 4px 12px;
width: 140px;
flex-wrap: wrap;
margin-left: 1rem;
border-radius: 0.5rem;

@media only screen and (max-width : 641px) {
left : -15px;
}

`

const Header = () => {
  
  const [activeDropdown, setActiveDropdown] = useState(false)
  
  const dropDown_ref = useRef(null);
  const listDropdown_ref = useRef(null);
  const {data, isLoading, error } = useQuery({queryKey: ["userProfile"], queryFn :getUserAccount})
  const useQueryInvalidate = useQueryClient();


  const clickOutSideHandler = (dropDown_ref, setActiveDropdown)=>{
    const clickHandler = (event)=>{
      if(dropDown_ref?.current && !dropDown_ref.current.contains(event.target) ){
        setActiveDropdown(false);
      }

    }
    window.addEventListener("click", clickHandler);
    return ()=>{
      window.removeEventListener("click", clickHandler)
    }
  }

  useEffect(()=> {
    clickOutSideHandler();
    const cleanFunction = clickOutSideHandler(dropDown_ref ,setActiveDropdown )

    return()=>{
      cleanFunction()
    }

  }, [])
  console.log({data, isLoading, error})

  if(isLoading) return <Loader />

  if(data?.data) {
    console.log('data')
  } else {
    console.log("not data")
  }


  const isAdmin = data?.data?.role === "ADMIN";

  

  

  const deleteCookie = (name, path) => {
    document.cookie = `${name}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  };

  const ExitHandler = ()=>{

    if(document.cookie) {
      deleteCookie("accessToken", "/");
      deleteCookie("refreshToken", "/");
      useQueryInvalidate.invalidateQueries("userProfile")
      toast.success("با موفقیت خارج شدید ", {position:"top-center"})
    } 
    else {
      toast.error("کاربری وجود ندارد",{position:"top-center"})
    }
  
  }

 


  return (
    <header className={`${styles.header}`}>
      <div className="flex items-center gap-8">
        <Link to="/">
        <img src={divarIcon} alt="" width={50} />
        </Link>
        <div className={styles.header_location_wrapper}>

        <img src={locationIcon} alt="" width={30} />
        <p className="text-[#828282]">تهران</p>
        </div>


      </div>

      <div className="flex items-center gap-9">

        <div ref={dropDown_ref} onClick={()=> setActiveDropdown(!activeDropdown)} className={styles.header_profileButton}>
          <img src={profileIcon} width={25} alt="" />
          <p className="text-[#828282]">دیوار من</p>
          <ListDropDown className={styles.header.list_dropDown} ref={listDropdown_ref} open={activeDropdown} >
            <ul className={styles.siteUser}>
              <li>کاربر دیوار</li>
            </ul>
            <ul className={styles.dropDown_details}>
            {/* <li></li> */}
            <li>

              <Link to={data?.data ? "/dashboard" : "/auth" }>آگهی های من</Link>
            </li>
            {
              isAdmin ? 
              (
                <li> 
                  <Link to={"/admin"}>
                  پنل ادمین 
                  </Link>
                  </li> 
              ) : ""
            }
            {/* <li>آگهی های من</li>
            <li>آگهی های من</li> */}
            </ul>
            
            
            <li className={styles.exit_account} onClick={ExitHandler}>
              خروج
            </li>
            
          </ListDropDown>
        </div>
        <Link to={data?.data ? "/dashboard"  : "/auth" } >
        <span className={styles.registerButton} >ثبت آگهی</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
