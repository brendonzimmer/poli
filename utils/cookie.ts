import { GetServerSidePropsContext, NextApiResponse } from "next";
import moment from "moment";

function getExpiration() {
  return moment().add(7, "d").format("ddd, DD MMM YYYY, hh:mm:ss");
}

export const setCookie = (res: AnyNextResponse, token: string) => {
  res.setHeader("Set-Cookie", `jwt=${token}; Path=/; Secure; HttpOnly; Expires=${getExpiration()}; SameSite=Strict`);
};

export const removeCookie = (res: AnyNextResponse) => {
  res.setHeader("Set-Cookie", "jwt=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT");
};

type AnyNextResponse = NextApiResponse | GetServerSidePropsContext["res"];
