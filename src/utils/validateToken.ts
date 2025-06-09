import { jwtDecode } from "jwt-decode";

const validateTokenHandler = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    const isNotExpired =
      Number(Date.now() / 1000) < Number(decodedToken.exp as number);
    console.log("is not expired :", isNotExpired);
    if (isNotExpired) {
      return Number((decodedToken.exp as number) * 1000) - Number(Date.now());
    } else {
      return false;
    }
  } catch (e) {
    console.log("its not a token");
    return false;
  }
};

export { validateTokenHandler };
