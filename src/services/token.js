// import api from "../configs/api";
// import { getUserCookie } from "../utils/getUsersCookie";

import api from "../configs/api";
import { getUserCookie } from "../utils/getUsersCookie";

const newToken = async () => {
  const refreshToken = getUserCookie("refreshToken");
  if (!refreshToken) return;
  try {
    const response = await api.post("auth/check-refresh-token", {refreshToken});
    return { response };
  } catch (error) {
    return { error };
  }
};

export {newToken}

// const newToken = async () => {
//   const refreshToken = getUserCookie("refreshToken");
//   if (!refreshToken) return;
//   try {
//     const response = await api.post("auth/check-refresh-token", {
//       refreshToken,
//     });
//     return { response };
//   } catch (error) {
//     return { error };
//   }
// };

// export { newToken };
