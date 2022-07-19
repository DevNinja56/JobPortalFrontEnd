import Cookie from "js-cookie";

export const validateAuthCookie = async (verifyForAdmin: boolean = false) => {
  const cookieKey = process.env.REACT_APP_AUTH_COOKIE;
  const authTokken = Cookie.get(cookieKey || "nothing");
  const APIURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : process.env.REACT_APP_API_URL;

  // console.log(authTokken)

  // console.log("cookie key ", cookieKey, authTokken)

  if (!authTokken) {
    return false;
  }

  const res = await fetch(
    `${APIURL}/api/verifyAuth${verifyForAdmin ? "Admin" : ""}`,
    {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authTokken }),
    }
  );

  const resObj = await res.json();

  // console.log(resObj)

  if (res.status !== 200) {
    throw new Error(resObj.error);
  }

  return true;
};
