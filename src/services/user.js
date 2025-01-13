import api from "../configs/api";
import { getUserCookie } from "../utils/getUsersCookie";
// const token = getUserCookie("accessToken");
// getUserCookie("accessToken")
const getUserAccount = () => api.get("user/whoami").then((res)=> res || false);
const getAllPosts = () => api.get("/");

const myPosts = ()=> api.get("/post/my")

// {headers: {Authorization: `bearer ${token}`}} 
// console.log(getUserCookie("accessToken")) 

export { getUserAccount, getAllPosts, myPosts };
