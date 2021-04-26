import axios from "axios";

/**
 * Easily fetch items with the user token in header
 *
 * @param token - should be a JWT token, passable to `authorization`
 *
 * @template T - the type of the returned data
 *
 * @returns data object from the AxiosResponse object
 *
 */
const fetcher = async <T>(url: string, token: string) => {
  const { data } = await axios.get<T>(url, { headers: { authorization: "bearer " + token } });
  return data;
};

export default fetcher;
