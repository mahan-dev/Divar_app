const getUserCookie = (cookie) => {
  console.log(cookie)
  console.log(cookie)
    return document.cookie
    .split(";")
    .find((token)=> token.trim().split("=")[0] === cookie)
    ?.split("=")[1]
};

const SetCookie = (token) => {
  document.cookie = `accessToken=${token.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${token.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`;
  console.log(getUserCookie("accessToken" , " refreshToken")) 
};

export { getUserCookie, SetCookie };
